/**
 * Land2Land data migration (idempotent, non-destructive).
 *
 * Renames the legacy collections to their land-marketplace names and backfills
 * a few field aliases. Safe to run multiple times — every step checks current
 * state first and skips work that is already done.
 *
 *   properties  -> listings   (field: builder -> seller, kept as alias too)
 *   developers  -> sellers
 *
 * Usage (env is NOT auto-loaded for Bash, so source it first):
 *   set -a && source /vercel/share/.env.project && set +a \
 *     && node scripts/migrate-to-land2land.mjs
 *
 * Flags:
 *   --dry-run   Print what would happen without writing anything.
 */
import { MongoClient } from "mongodb"

const DRY_RUN = process.argv.includes("--dry-run")
const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || "land2land"

if (!uri) {
  console.error("[migrate] MONGODB_URI is not set. Source your env file first.")
  process.exit(1)
}

const RENAMES = [
  { from: "properties", to: "listings" },
  { from: "developers", to: "sellers" },
]

async function main() {
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)
  console.log(`[migrate] connected to db "${dbName}"${DRY_RUN ? " (dry-run)" : ""}`)

  const existing = new Set((await db.listCollections().toArray()).map((c) => c.name))

  for (const { from, to } of RENAMES) {
    if (existing.has(to)) {
      console.log(`[migrate] "${to}" already exists — skipping rename of "${from}".`)
      continue
    }
    if (!existing.has(from)) {
      console.log(`[migrate] source "${from}" not found — nothing to rename.`)
      continue
    }
    if (DRY_RUN) {
      console.log(`[migrate] would rename "${from}" -> "${to}".`)
      continue
    }
    await db.collection(from).rename(to)
    console.log(`[migrate] renamed "${from}" -> "${to}".`)
  }

  // Backfill: ensure listings have a `seller` field mirroring legacy `builder`.
  const listingsName = existing.has("listings") || !existing.has("properties") ? "listings" : "properties"
  const listings = db.collection(listingsName)
  const needsSeller = await listings.countDocuments({
    builder: { $exists: true },
    seller: { $exists: false },
  })
  if (needsSeller > 0) {
    if (DRY_RUN) {
      console.log(`[migrate] would backfill "seller" on ${needsSeller} listing(s).`)
    } else {
      await listings.updateMany(
        { builder: { $exists: true }, seller: { $exists: false } },
        [{ $set: { seller: "$builder" } }],
      )
      console.log(`[migrate] backfilled "seller" on ${needsSeller} listing(s).`)
    }
  } else {
    console.log(`[migrate] no "seller" backfill needed.`)
  }

  await client.close()
  console.log("[migrate] done.")
}

main().catch((err) => {
  console.error("[migrate] failed:", err)
  process.exit(1)
})

import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

// Admin analytics aggregations for leads and listings.
// Never cache — always reflect live data.
export const dynamic = "force-dynamic"
export const revalidate = 0

const LEAD_STATUSES = ["new", "contacted", "qualified", "converted", "lost"] as const
const LEAD_SOURCES = [
  "property_enquiry",
  "contact_form",
  "phone_call",
  "whatsapp",
  "walk_in",
  "referral",
  "other",
] as const
const LEAD_PRIORITIES = ["low", "medium", "high", "urgent"] as const

const SOURCE_LABELS: Record<string, string> = {
  property_enquiry: "Property Enquiry",
  contact_form: "Contact Form",
  phone_call: "Phone Call",
  whatsapp: "WhatsApp",
  walk_in: "Walk In",
  referral: "Referral",
  other: "Other",
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const leads = db.collection("leads")
    const listings = db.collection("listings")

    // ---------- Lead funnel (counts by status) ----------
    const statusAgg = await leads
      .aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
      .toArray()
    const statusMap = Object.fromEntries(statusAgg.map((s) => [s._id, s.count]))
    const funnel = LEAD_STATUSES.map((status) => ({
      status,
      label: status.charAt(0).toUpperCase() + status.slice(1),
      count: statusMap[status] || 0,
    }))

    const totalLeads = funnel.reduce((sum, s) => sum + s.count, 0)
    const converted = statusMap["converted"] || 0
    const conversionRate = totalLeads > 0 ? Math.round((converted / totalLeads) * 1000) / 10 : 0

    // ---------- Leads by source ----------
    const sourceAgg = await leads
      .aggregate([{ $group: { _id: "$source", count: { $sum: 1 } } }])
      .toArray()
    const sourceMap = Object.fromEntries(sourceAgg.map((s) => [s._id, s.count]))
    const bySource = LEAD_SOURCES.map((source) => ({
      source,
      label: SOURCE_LABELS[source] || source,
      count: sourceMap[source] || 0,
    })).filter((s) => s.count > 0)

    // ---------- Leads by priority ----------
    const priorityAgg = await leads
      .aggregate([{ $group: { _id: "$priority", count: { $sum: 1 } } }])
      .toArray()
    const priorityMap = Object.fromEntries(priorityAgg.map((s) => [s._id, s.count]))
    const byPriority = LEAD_PRIORITIES.map((priority) => ({
      priority,
      label: priority.charAt(0).toUpperCase() + priority.slice(1),
      count: priorityMap[priority] || 0,
    }))

    // ---------- Leads over time (last 6 months) ----------
    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)
    const timeAgg = await leads
      .aggregate([
        { $match: { created_at: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: {
              year: { $year: "$created_at" },
              month: { $month: "$created_at" },
            },
            total: { $sum: 1 },
            converted: {
              $sum: { $cond: [{ $eq: ["$status", "converted"] }, 1, 0] },
            },
          },
        },
      ])
      .toArray()
    const timeMap = Object.fromEntries(
      timeAgg.map((t) => [
        `${t._id.year}-${String(t._id.month).padStart(2, "0")}`,
        { total: t.total, converted: t.converted },
      ]),
    )
    const overTime: { month: string; label: string; leads: number; converted: number }[] = []
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
      const key = monthKey(d)
      overTime.push({
        month: key,
        label: d.toLocaleString("en-US", { month: "short" }),
        leads: timeMap[key]?.total || 0,
        converted: timeMap[key]?.converted || 0,
      })
    }

    // ---------- Listings by property type ----------
    const typeAgg = await listings
      .aggregate([{ $group: { _id: "$property_type", count: { $sum: 1 } } }, { $sort: { count: -1 } }])
      .toArray()
    const byType = typeAgg
      .filter((t) => t._id)
      .map((t) => ({
        type: String(t._id),
        label: String(t._id).charAt(0).toUpperCase() + String(t._id).slice(1),
        count: t.count,
      }))

    // ---------- Listings by status ----------
    const listingStatusAgg = await listings
      .aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
      .toArray()
    const byListingStatus = listingStatusAgg
      .map((s) => ({
        status: s._id ? String(s._id) : "unknown",
        label: s._id
          ? String(s._id).charAt(0).toUpperCase() + String(s._id).slice(1)
          : "Unknown",
        count: s.count,
      }))
      .sort((a, b) => b.count - a.count)

    // ---------- Top cities by listing count ----------
    const cityAgg = await listings
      .aggregate([
        { $match: { city: { $exists: true, $ne: null } } },
        { $group: { _id: "$city", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ])
      .toArray()
    const topCities = cityAgg.map((c) => ({
      city: String(c._id),
      count: c.count,
    }))

    const totalListings = await listings.countDocuments({})

    return NextResponse.json({
      totals: {
        totalLeads,
        converted,
        conversionRate,
        newLeads: statusMap["new"] || 0,
        totalListings,
      },
      funnel,
      bySource,
      byPriority,
      overTime,
      listings: {
        byType,
        byStatus: byListingStatus,
        topCities,
      },
    })
  } catch (error) {
    console.error("[v0] Error building analytics:", error)
    return NextResponse.json({ error: "Failed to build analytics" }, { status: 500 })
  }
}

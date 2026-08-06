import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

// GET /api/admin/properties/review?status=pending
// Returns listings for the admin review queue, plus counts per review state.
// Each listing is joined with the submitting associate's name and email.
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const status = req.nextUrl.searchParams.get("status") || "pending"

    const matchStage =
      status === "all"
        ? { $match: { review_status: { $in: ["pending", "approved", "rejected"] } } }
        : { $match: { review_status: status } }

    // Join the `users` collection on the `associate` field to get the submitter's
    // name and email so the admin can see who submitted each listing.
    const properties = await db
      .collection("listings")
      .aggregate([
        matchStage,
        { $sort: { submitted_at: -1, created_at: -1 } },
        {
          $lookup: {
            from: "users",
            // `associate` may be stored as ObjectId or string — try both
            let: { assocId: { $toObjectId: { $ifNull: ["$associate", "$associate"] } } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$assocId"] },
                },
              },
              { $project: { name: 1, email: 1, phone: 1, user_type: 1 } },
            ],
            as: "_associateDoc",
          },
        },
        {
          $addFields: {
            associate_name: { $ifNull: [{ $arrayElemAt: ["$_associateDoc.name", 0] }, null] },
            associate_email: { $ifNull: [{ $arrayElemAt: ["$_associateDoc.email", 0] }, null] },
            associate_phone: { $ifNull: [{ $arrayElemAt: ["$_associateDoc.phone", 0] }, null] },
          },
        },
        { $project: { _associateDoc: 0 } },
      ])
      .toArray()

    // Counts for the queue tabs
    const [pending, approved, rejected] = await Promise.all([
      db.collection("listings").countDocuments({ review_status: "pending" }),
      db.collection("listings").countDocuments({ review_status: "approved" }),
      db.collection("listings").countDocuments({ review_status: "rejected" }),
    ])

    const serialized = properties.map((p) => ({
      ...p,
      _id: p._id.toString(),
      associate: p.associate?.toString?.() ?? p.associate,
    }))

    return NextResponse.json({
      properties: serialized,
      counts: { pending, approved, rejected },
    })
  } catch (error) {

    return NextResponse.json({ error: "Failed to fetch review queue" }, { status: 500 })
  }
}

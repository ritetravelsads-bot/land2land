import { connectToDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import type { HomepageSection } from "@/lib/schemas"

export async function GET() {
  try {

    const user = await getCurrentUser()

    if (!user || user.user_type !== "admin") {

      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    const sections = await db
      .collection<HomepageSection>("homepage_sections")
      .find({})
      .sort({ sort_order: 1 })
      .toArray()

    if (sections.length > 0) {
      console.log("[v0] First 3 sections:", sections.slice(0, 3).map(s => ({ 
        _id: s._id?.toString(), 
        title: s.title,
        section_type: s.section_type 
      })))
    } else {

    }
    
    return Response.json(sections)
  } catch (error) {

    return Response.json({ error: "Failed to fetch sections", details: String(error) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    const section: HomepageSection = await req.json()
    section.created_at = new Date()
    section.updated_at = new Date()
    const result = await db.collection<HomepageSection>("homepage_sections").insertOne(section)
    return Response.json({ _id: result.insertedId, ...section }, { status: 201 })
  } catch (error) {

    return Response.json({ error: "Failed to create section" }, { status: 500 })
  }
}

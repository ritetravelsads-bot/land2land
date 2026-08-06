import { MongoClient } from "mongodb"

const mongoUrl = process.env.MONGODB_URI || ""

export async function getBlogPostBySlug(slug: string, includeUnpublished: boolean = false) {
  if (!mongoUrl) {
    return null
  }

  const client = new MongoClient(mongoUrl)

  try {
    await client.connect()
    const db = client.db("land2land")
    const collection = db.collection("blog_posts")

    const query: Record<string, unknown> = { slug }
    
    if (!includeUnpublished) {
      query.$or = [{ is_published: true }, { published: true }]
    }

    const post = await collection.findOne(query)

    if (!post) {
      return null
    }

    // Convert MongoDB ObjectId to string for serialization
    return {
      ...post,
      _id: post._id?.toString(),
      author: post.author?.toString?.() || post.author,
    }
  } catch (error) {
    return null
  } finally {
    await client.close()
  }
}

export async function getBlogPostById(id: string) {
  if (!mongoUrl) {
    return null
  }

  const client = new MongoClient(mongoUrl)

  try {
    await client.connect()
    const db = client.db("land2land")
    const collection = db.collection("blog_posts")
    const { ObjectId } = await import("mongodb")

    let post = null
    
    // Try to find by ObjectId first
    if (ObjectId.isValid(id)) {
      post = await collection.findOne({ _id: new ObjectId(id) })
    }
    
    // Fallback to slug if not found
    if (!post) {
      post = await collection.findOne({ slug: id })
    }

    if (!post) {
      return null
    }

    // Serialize properly for client consumption
    return {
      ...post,
      _id: post._id?.toString(),
      author: post.author?.toString?.() || post.author,
      tags: Array.isArray(post.tags) ? post.tags : [],
      readTime: post.readTime?.toString() || post.read_time?.toString() || "5",
    }
  } catch (error) {
    return null
  } finally {
    await client.close()
  }
}

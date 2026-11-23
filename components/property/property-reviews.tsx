"use client"

import { useState } from "react"
import useSWR from "swr"
import { Star, ThumbsUp, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Review = { _id: string; rating: number; title?: string; comment: string; reviewer_name: string; created_at: string; helpful_count: number; verified: boolean }
type ReviewData = { reviews: Review[]; can_review: boolean; rating_count: number; average_rating: number }

export function PropertyReviews({ propertyId }: { propertyId: string }) {
  const { data: reviewData, isLoading: loading, mutate: load } = useSWR<ReviewData>(`/api/properties/${encodeURIComponent(propertyId)}/reviews`, async (url: string) => {
    const response = await fetch(url, { cache: "no-store" })
    if (!response.ok) throw new Error("Unable to load reviews.")
    return response.json()
  })
  const data = reviewData || { reviews: [], can_review: false, rating_count: 0, average_rating: 0 }
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [notice, setNotice] = useState("")
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const response = await fetch(`/api/properties/${encodeURIComponent(propertyId)}/reviews`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rating, title, comment }) })
    const result = await response.json()
    setNotice(response.ok ? "Thanks. Your verified review is queued for moderation." : result.error || "Unable to submit review.")
    if (response.ok) { setTitle(""); setComment(""); await load() }
  }

  async function action(reviewId: string, kind: "helpful" | "report") {
    const reason = kind === "report" ? window.prompt("Why are you reporting this review?") : ""
    if (kind === "report" && !reason?.trim()) return
    const response = await fetch(`/api/reviews/${encodeURIComponent(reviewId)}/actions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: kind, reason }) })
    const result = await response.json()
    setNotice(response.ok ? (kind === "helpful" ? "Thanks for your feedback." : "Report sent to our moderation team.") : result.error || "Unable to process your request.")
    if (response.ok && kind === "helpful") await load()
  }

  return <section id="reviews" aria-labelledby="property-reviews-title" className="mt-10 border-t border-border pt-8"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 id="property-reviews-title" className="text-xl font-semibold">Reviews & ratings</h2><p className="mt-1 text-sm text-muted-foreground">Feedback from customers who enquired about this property.</p></div><div className="flex items-center gap-2" aria-label={`${data.average_rating} out of 5 stars from ${data.rating_count} reviews`}><Star className="fill-primary text-primary" /><span className="text-lg font-semibold">{data.average_rating.toFixed(1)}</span><span className="text-sm text-muted-foreground">({data.rating_count})</span></div></div>
    {notice && <p role="status" className="mt-4 rounded-md border bg-muted/40 px-3 py-2 text-sm">{notice}</p>}
    {data.can_review && <form onSubmit={submit} className="mt-5 grid gap-3 rounded-lg border p-4"><h3 className="font-medium">Write a verified review</h3><p className="text-sm text-muted-foreground">Your review is available after our moderation team approves it.</p><div className="grid gap-2"><Label htmlFor="review-rating">Your rating</Label><select id="review-rating" className="h-10 rounded-md border bg-background px-3 text-sm" value={rating} onChange={(event) => setRating(Number(event.target.value))}><option value={5}>5 — Excellent</option><option value={4}>4 — Good</option><option value={3}>3 — Average</option><option value={2}>2 — Poor</option><option value={1}>1 — Very poor</option></select></div><div className="grid gap-2"><Label htmlFor="review-title">Title (optional)</Label><Input id="review-title" maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} /></div><div className="grid gap-2"><Label htmlFor="review-comment">Review</Label><Textarea id="review-comment" required minLength={10} maxLength={2000} value={comment} onChange={(event) => setComment(event.target.value)} /></div><Button type="submit">Submit review</Button></form>}
    {!data.can_review && !loading && <p className="mt-5 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">Reviews are open to signed-in customers with a recorded enquiry for this property.</p>}
    <div className="mt-5 flex flex-col gap-3">{loading ? <p className="text-sm text-muted-foreground">Loading reviews…</p> : !data.reviews.length ? <p className="rounded-lg border p-5 text-sm text-muted-foreground">No published reviews yet.</p> : data.reviews.map((review) => <article key={review._id} className="rounded-lg border p-4"><div className="flex flex-wrap items-center justify-between gap-2"><div><div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} className={index < review.rating ? "size-4 fill-primary text-primary" : "size-4 text-muted-foreground"} />)}</div><p className="mt-2 font-medium">{review.title || "Customer review"}</p></div><span className="text-xs text-muted-foreground">{new Date(review.created_at).toLocaleDateString()}</span></div><p className="mt-2 text-sm leading-6">{review.comment}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-2"><span className="text-xs text-muted-foreground">{review.reviewer_name}{review.verified ? " · Verified enquiry" : ""}</span><div className="flex gap-2"><Button type="button" variant="ghost" size="sm" onClick={() => void action(review._id, "helpful")}><ThumbsUp data-icon="inline-start" />Helpful ({review.helpful_count})</Button><Button type="button" variant="ghost" size="sm" onClick={() => void action(review._id, "report")}><Flag data-icon="inline-start" />Report</Button></div></div></article>)}</div>
  </section>
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import AgentSubscriptionSummaryCard from "@/components/associate/agent-subscription-summary-card"

export default function AssociateDashboardPage() {
  const [stats, setStats] = useState({
    active: 0,
    sold: 0,
    reviews: 0,
    rating: 0,
    totalLeads: 0,
    newLeads: 0,
    points: 0,
    pointsThisMonth: 0,
    pendingTasks: 0,
    availableTasks: 0,
  })
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userRes, propsRes, leadsRes, rewardsRes, reviewsRes] = await Promise.all([
          fetch("/api/auth/me", { cache: "no-store", credentials: "include" }),
          fetch("/api/associate/properties"),
          fetch("/api/associate/leads?limit=1"),
          fetch("/api/associate/rewards", { cache: "no-store" }),
          fetch("/api/associate/reviews", { cache: "no-store" }),
        ])
        
        const userData = await userRes.json()
        setUser(userData)

        const [propsData, leadsData, rewardsData, reviewsData] = await Promise.all([propsRes.json(), leadsRes.json(), rewardsRes.json(), reviewsRes.json()])
        const reviews = Array.isArray(reviewsData) ? reviewsData : []
        const averageRating = reviews.length ? reviews.reduce((sum: number, review: any) => sum + Number(review.overall_rating || review.rating || 0), 0) / reviews.length : 0

        setStats({
          active: Array.isArray(propsData) ? propsData.filter((p: any) => p.status === "active").length : 0,
          sold: Array.isArray(propsData) ? propsData.filter((p: any) => p.status === "sold").length : 0,
          reviews: reviews.length,
          rating: Number(averageRating.toFixed(1)),
          totalLeads: leadsData.stats?.total || 0,
          newLeads: leadsData.stats?.new || 0,
          points: Number(rewardsData.account?.available_points || 0),
          pointsThisMonth: Number(rewardsData.points_earned_this_month || 0),
          pendingTasks: Array.isArray(rewardsData.submissions) ? rewardsData.submissions.filter((submission: any) => submission.status === "pending").length : 0,
          availableTasks: Array.isArray(rewardsData.tasks) ? rewardsData.tasks.length : 0,
        })
      } catch (error) {
        console.error("Error loading associate data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Associate Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {user?.username}!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 border border-border rounded-lg">
          <p className="text-xs text-muted-foreground">Active Listings</p>
          <p className="text-2xl font-bold text-primary mt-2">{stats.active}</p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <p className="text-xs text-muted-foreground">Properties Sold</p>
          <p className="text-2xl font-bold text-primary mt-2">{stats.sold}</p>
        </div>
        <Link href="/associate/leads" className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
          <p className="text-xs text-muted-foreground">Total Leads</p>
          <p className="text-2xl font-bold text-primary mt-2">{stats.totalLeads}</p>
        </Link>
        <Link href="/associate/leads?status=new" className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors">
          <p className="text-xs text-blue-600 dark:text-blue-400">New Leads</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-2">{stats.newLeads}</p>
        </Link>
        <div className="p-4 border border-border rounded-lg">
          <p className="text-xs text-muted-foreground">Reviews</p>
          <p className="text-2xl font-bold text-primary mt-2">{stats.reviews}</p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <p className="text-xs text-muted-foreground">Rating</p>
          <p className="text-2xl font-bold text-primary mt-2">{stats.rating.toFixed(1)}</p>
        </div>
        <Link href="/associate/rewards" className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
          <p className="text-xs text-muted-foreground">Available points</p>
          <p className="text-2xl font-bold text-primary mt-2">{stats.points}</p>
        </Link>
        <Link href="/associate/rewards#history" className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
          <p className="text-xs text-muted-foreground">Earned this month</p>
          <p className="text-2xl font-bold text-primary mt-2">{stats.pointsThisMonth}</p>
        </Link>
        <Link href="/associate/rewards#submissions" className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
          <p className="text-xs text-muted-foreground">Pending approvals</p>
          <p className="text-2xl font-bold text-primary mt-2">{stats.pendingTasks}</p>
        </Link>
        <Link href="/associate/rewards#tasks" className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
          <p className="text-xs text-muted-foreground">Available tasks</p>
          <p className="text-2xl font-bold text-primary mt-2">{stats.availableTasks}</p>
        </Link>
      </div>

      <AgentSubscriptionSummaryCard />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            href="/associate/properties/new"
            className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm font-semibold text-foreground">Add New Property</p>
            <p className="text-xs text-muted-foreground mt-1">List a new property on marketplace</p>
          </Link>
          <Link
            href="/associate/properties"
            className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm font-semibold text-foreground">Manage Properties</p>
            <p className="text-xs text-muted-foreground mt-1">View and edit your listings</p>
          </Link>
          <Link
            href="/associate/leads"
            className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm font-semibold text-foreground">View Leads</p>
            <p className="text-xs text-muted-foreground mt-1">Track and manage your enquiries</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

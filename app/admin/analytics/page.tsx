"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import PageHeader from "@/components/dashboard/page-header"
import LoadingSpinner from "@/components/loading-spinner"
import { AlertCircle } from "lucide-react"
import { LeadStatusChart, LeadSourceChart } from "@/components/admin/analytics/lead-charts"
import { ListingTypeChart, ListingStatusChart } from "@/components/admin/analytics/listing-charts"

interface AnalyticsData {
  leadsByStatus: Record<string, number>
  leadsBySource: Record<string, number>
  listingsByType: Record<string, number>
  listingsByStatus: Record<string, number>
  totalLeads: number
  totalListings: number
  conversionRate: number
}

export default function AnalyticsPage() {
  const { data, isLoading, error } = useSWR<AnalyticsData>("/api/admin/analytics", (url) =>
    fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false, dedupingInterval: 5000 }
  )

  const stats = [
    {
      label: "Total Leads",
      value: data?.totalLeads ?? 0,
      subtext: `${(data?.conversionRate ?? 0).toFixed(1)}% conversion rate`,
    },
    {
      label: "Active Listings",
      value: data?.totalListings ?? 0,
      subtext: "Properties available",
    },
  ]

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Analytics Dashboard"
        description="Real-time insights into leads, listings, and conversion metrics."
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-lg p-6 space-y-2"
          >
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-4xl font-bold text-foreground">{stat.value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Failed to load analytics</p>
            <p className="text-sm opacity-80">Please try refreshing the page</p>
          </div>
        </div>
      ) : data ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Lead Charts */}
          <LeadStatusChart data={data.leadsByStatus} />
          <LeadSourceChart data={data.leadsBySource} />

          {/* Listing Charts */}
          <ListingTypeChart data={data.listingsByType} />
          <ListingStatusChart data={data.listingsByStatus} />
        </div>
      ) : null}
    </div>
  )
}

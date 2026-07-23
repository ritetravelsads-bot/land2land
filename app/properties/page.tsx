"use client"

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import {
  MapPin, Heart, Search, Filter, ChevronDown, ChevronUp, X,
  Layers, SlidersHorizontal, Grid3X3, List, CheckCircle2, TriangleAlert
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useCallback, Suspense } from "react"
import useSWR from "swr"
import { cn, formatPriceRange, BUDGET_RANGES, parseBudgetRange, getPropertyUrl } from "@/lib/utils"
import { LAND_TYPES, LAND_TYPE_LABELS, AREA_UNITS, type LandType, type AreaUnit } from "@/lib/models"

const fetcher = (url: string) => fetch(url).then(res => res.json())

// --- Filter option lists aligned with the Listing model ---

const OWNERSHIP_TYPES = [
  { value: "freehold",          label: "Freehold" },
  { value: "leasehold",         label: "Leasehold" },
  { value: "cooperative",       label: "Cooperative" },
  { value: "power_of_attorney", label: "Power of Attorney" },
]

const FACING_OPTIONS = [
  { value: "north",       label: "North" },
  { value: "south",       label: "South" },
  { value: "east",        label: "East" },
  { value: "west",        label: "West" },
  { value: "north_east",  label: "North East" },
  { value: "north_west",  label: "North West" },
  { value: "south_east",  label: "South East" },
  { value: "south_west",  label: "South West" },
]

const AREA_UNIT_OPTIONS = AREA_UNITS.map(u => ({ value: u, label: u.toUpperCase() }))

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured" },
  { value: "newest",     label: "Newest First" },
  { value: "price_low",  label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "name",       label: "Name A–Z" },
]

// Build land type options from the canonical model
const LAND_TYPE_OPTIONS = LAND_TYPES.map(t => ({ value: t, label: LAND_TYPE_LABELS[t as LandType] }))

interface Property {
  _id: string
  property_name: string
  slug?: string
  main_thumbnail?: string
  address?: string
  city?: string
  state?: string
  seller_name?: string
  area_value?: number
  area_unit?: string
  area_sqft?: number
  lowest_price?: number
  max_price?: number
  price_range?: string
  property_type?: string
  ownership_type?: string
  road_access?: boolean
  water_available?: boolean
  electricity_available?: boolean
  corner_plot?: boolean
  boundary_wall?: boolean
  is_featured?: boolean
  rera_no?: string
}

function PropertyCard({ property }: { property: Property }) {
  const priceDisplay = property.price_range || formatPriceRange(property.lowest_price, property.max_price)
  const areaDisplay = property.area_value && property.area_unit
    ? `${property.area_value} ${property.area_unit.toUpperCase()}`
    : property.area_sqft
    ? `${property.area_sqft} sqft`
    : null

  return (
    <Link
      href={getPropertyUrl(property)}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <div className="relative h-44 bg-muted overflow-hidden">
        <img
          src={property.main_thumbnail || "/placeholder.svg?height=176&width=300&query=land"}
          alt={property.property_name || "Land"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Land type badge */}
        {property.property_type && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-primary text-primary-foreground rounded-full capitalize">
              {LAND_TYPE_LABELS[property.property_type as LandType] || property.property_type.replace(/_/g, " ")}
            </span>
          </div>
        )}

        {/* RERA badge */}
        {property.rera_no && (
          <div className="absolute top-2 right-2">
            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-emerald-500 text-white rounded-full">
              <CheckCircle2 className="h-3 w-3" />
              RERA
            </span>
          </div>
        )}

        <button
          onClick={(e) => { e.preventDefault() }}
          className="absolute bottom-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition-all shadow-sm"
        >
          <Heart className="h-4 w-4 text-muted-foreground hover:text-rose-500" />
        </button>
      </div>

      <div className="p-3 space-y-2">
        <div>
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {property.property_name || "Land"}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="line-clamp-1">
              {[property.address, property.city, property.state].filter(Boolean).join(", ") || "Location not available"}
            </span>
          </div>
          {property.seller_name && (
            <p className="text-[11px] text-muted-foreground mt-0.5">By {property.seller_name}</p>
          )}
        </div>

        {/* Land detail chips */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs text-muted-foreground">
          {areaDisplay && (
            <span className="px-1.5 py-0.5 bg-muted rounded">{areaDisplay}</span>
          )}
          {property.ownership_type && (
            <span className="px-1.5 py-0.5 bg-muted rounded capitalize">
              {property.ownership_type.replace(/_/g, " ")}
            </span>
          )}
          {property.road_access && (
            <span className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[10px]">Road Access</span>
          )}
          {property.water_available && (
            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px]">Water</span>
          )}
          {property.electricity_available && (
            <span className="px-1.5 py-0.5 bg-yellow-50 text-yellow-700 rounded text-[10px]">Electricity</span>
          )}
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-sm font-bold text-primary">
            {priceDisplay || "Contact for Price"}
          </p>
        </div>
      </div>
    </Link>
  )
}

function PropertiesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const [filters, setFilters] = useState({
    search:           searchParams.get("search") || "",
    state:            searchParams.get("state") || "",
    city:             searchParams.get("city") || "",
    property_type:    searchParams.get("property_type") || "",
    ownership_type:   searchParams.get("ownership_type") || "",
    area_unit:        searchParams.get("area_unit") || "",
    facing:           searchParams.get("facing") || "",
    zoning:           searchParams.get("zoning") || "",
    minPrice:         searchParams.get("minPrice") || "",
    maxPrice:         searchParams.get("maxPrice") || "",
    minArea:          searchParams.get("minArea") || "",
    maxArea:          searchParams.get("maxArea") || "",
    road_access:      searchParams.get("road_access") || "",
    water_available:  searchParams.get("water_available") || "",
    electricity_available: searchParams.get("electricity_available") || "",
    corner_plot:      searchParams.get("corner_plot") || "",
    boundary_wall:    searchParams.get("boundary_wall") || "",
    is_negotiable:    searchParams.get("is_negotiable") || "",
    rera_registered:  searchParams.get("rera_registered") || "",
    sort:             searchParams.get("sort") || "featured",
  })

  const page = Number(searchParams.get("page")) || 1

  const buildQueryString = useCallback(() => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    params.set("page", String(page))
    params.set("limit", "12")
    return params.toString()
  }, [filters, page])

  const { data, isLoading: loading } = useSWR(
    `/api/properties?${buildQueryString()}`,
    fetcher,
    { revalidateOnFocus: false, keepPreviousData: true, dedupingInterval: 5000 }
  )

  const properties: Property[] = data?.properties || []
  const pagination = data?.pagination || { page: 1, total: 0, pages: 1 }

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => { if (v) params.set(k, v) })
    params.set("page", "1")
    router.push(`/properties?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const cleared = Object.fromEntries(
      Object.keys(filters).map(k => [k, k === "sort" ? "featured" : ""])
    )
    setFilters(cleared as typeof filters)
    router.push("/properties")
  }

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v) })
    params.set("page", String(newPage))
    router.push(`/properties?${params.toString()}`)
  }

  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) => value && key !== "sort"
  ).length

  // Boolean filter toggle helper
  const toggleBoolFilter = (key: string, current: string) =>
    updateFilter(key, current === "true" ? "" : "true")

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-b from-primary/5 to-background px-4 py-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold leading-tight mb-1">
            Browse Land for Sale Across India
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Agricultural, residential, commercial &amp; industrial land — verified titles, transparent pricing.
          </p>
          {pagination.total > 0 && (
            <p className="text-xs text-primary font-medium mt-1">
              {pagination.total} listings found
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 py-4">
        {/* Search & Quick Filters */}
        <div className="bg-card border border-border rounded-xl mb-4">

          {/* Search row */}
          <div className="p-3 flex flex-col gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, city, state, zoning…"
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Quick filters row — scroll on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <select
                value={filters.property_type}
                onChange={(e) => updateFilter("property_type", e.target.value)}
                className="shrink-0 px-3 py-2 text-xs border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">All Land Types</option>
                {LAND_TYPE_OPTIONS.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>

              <select
                value={filters.minPrice && filters.maxPrice
                  ? `${filters.minPrice}-${filters.maxPrice}`
                  : filters.minPrice ? `${filters.minPrice}-` : ""}
                onChange={(e) => {
                  const { min, max } = parseBudgetRange(e.target.value)
                  updateFilter("minPrice", min ? String(min) : "")
                  updateFilter("maxPrice", max ? String(max) : "")
                }}
                className="shrink-0 px-3 py-2 text-xs border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Any Budget</option>
                {BUDGET_RANGES.map(b => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>

              <select
                value={filters.area_unit}
                onChange={(e) => updateFilter("area_unit", e.target.value)}
                className="shrink-0 px-3 py-2 text-xs border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Any Area Unit</option>
                {AREA_UNIT_OPTIONS.map(u => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={cn(
                  "shrink-0 bg-transparent gap-1.5 text-xs",
                  showAdvanced && "bg-primary/5 border-primary/30"
                )}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] bg-primary text-primary-foreground rounded-full">
                    {activeFilterCount}
                  </span>
                )}
                {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>

          {/* Advanced filters panel */}
          {showAdvanced && (
            <div className="px-3 pb-4 border-t border-border pt-3 space-y-4 animate-in slide-in-from-top-2 duration-200">

              {/* Location */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Location</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">State</label>
                    <input
                      type="text"
                      placeholder="e.g. Punjab"
                      value={filters.state}
                      onChange={(e) => updateFilter("state", e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Ludhiana"
                      value={filters.city}
                      onChange={(e) => updateFilter("city", e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                    />
                  </div>
                </div>
              </div>

              {/* Area */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Area (sqft)</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Min Area</label>
                    <input
                      type="number"
                      placeholder="Min sqft"
                      value={filters.minArea}
                      onChange={(e) => updateFilter("minArea", e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Max Area</label>
                    <input
                      type="number"
                      placeholder="Max sqft"
                      value={filters.maxArea}
                      onChange={(e) => updateFilter("maxArea", e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                    />
                  </div>
                </div>
              </div>

              {/* Ownership & Facing */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Ownership Type</label>
                  <select
                    value={filters.ownership_type}
                    onChange={(e) => updateFilter("ownership_type", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                  >
                    <option value="">Any</option>
                    {OWNERSHIP_TYPES.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Facing</label>
                  <select
                    value={filters.facing}
                    onChange={(e) => updateFilter("facing", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                  >
                    <option value="">Any</option>
                    {FACING_OPTIONS.map(f => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Zoning */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Zoning</label>
                <input
                  type="text"
                  placeholder="e.g. agricultural, mixed-use"
                  value={filters.zoning}
                  onChange={(e) => updateFilter("zoning", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                />
              </div>

              {/* Boolean feature toggles */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Land Features</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "road_access",           label: "Road Access" },
                    { key: "water_available",        label: "Water Available" },
                    { key: "electricity_available",  label: "Electricity" },
                    { key: "corner_plot",            label: "Corner Plot" },
                    { key: "boundary_wall",          label: "Boundary Wall" },
                    { key: "is_negotiable",          label: "Negotiable Price" },
                    { key: "rera_registered",        label: "RERA Registered" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => toggleBoolFilter(key, filters[key as keyof typeof filters])}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-colors text-left",
                        filters[key as keyof typeof filters] === "true"
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-background border-border text-muted-foreground"
                      )}
                    >
                      <CheckCircle2 className={cn(
                        "h-3.5 w-3.5 shrink-0",
                        filters[key as keyof typeof filters] === "true" ? "text-primary" : "text-border"
                      )} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="bg-transparent text-xs gap-1 w-full"
              >
                <X className="h-3 w-3" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted-foreground">
            {loading ? "Loading…" : `${properties.length} of ${pagination.total} listings`}
          </p>
          <div className="flex items-center gap-2">
            <select
              value={filters.sort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="px-2 py-1.5 text-xs border border-border rounded-lg bg-background"
            >
              {SORT_OPTIONS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <div className="flex border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("p-1.5", viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-background")}
              >
                <Grid3X3 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn("p-1.5", viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-background")}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div className={cn("grid gap-4", viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1")}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                <div className="h-44 bg-muted" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-xl">
            <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-4 text-sm">No land listings found matching your criteria</p>
            <Button variant="outline" onClick={clearAllFilters} className="bg-transparent text-sm">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={cn(
            "grid gap-4",
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          )}>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline" size="sm"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="bg-transparent text-xs"
            >
              Previous
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                let pageNum: number
                if (pagination.pages <= 5) pageNum = i + 1
                else if (page <= 3) pageNum = i + 1
                else if (page >= pagination.pages - 2) pageNum = pagination.pages - 4 + i
                else pageNum = page - 2 + i
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={cn(
                      "w-8 h-8 text-xs rounded-lg font-medium transition-colors",
                      page === pageNum
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border hover:border-primary/50"
                    )}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>
            <Button
              variant="outline" size="sm"
              onClick={() => goToPage(page + 1)}
              disabled={page === pagination.pages}
              className="bg-transparent text-xs"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={null}>
      <PropertiesContent />
    </Suspense>
  )
}

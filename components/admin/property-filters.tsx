"use client"

import React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  ChevronUp,
  Home,
  IndianRupee,
  MapPin,
  Building2,
  Filter
} from "lucide-react"
import { cn, BUDGET_RANGES, parseBudgetRange, formatPriceToIndian } from "@/lib/utils"

export interface PropertyFiltersProps {
  onChange: (filters: any) => void
  initial?: any
}

const PROPERTY_TYPES = [
  { value: "agricultural", label: "Agricultural Land" },
  { value: "residential_plot", label: "Residential Plot" },
  { value: "commercial_plot", label: "Commercial Plot" },
  { value: "industrial", label: "Industrial Land" },
  { value: "farmland", label: "Farmland" },
  { value: "vacant", label: "Vacant / Other Land" },
]

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
  { value: "inactive", label: "Inactive" },
]

const LISTING_TYPES = [
  { value: "sale", label: "For Sale" },
  { value: "resale", label: "Resale" },
  { value: "lease", label: "For Lease" },
  { value: "auction", label: "Auction" },
]

const OWNERSHIP_OPTIONS = [
  { value: "freehold", label: "Freehold" },
  { value: "leasehold", label: "Leasehold" },
  { value: "cooperative", label: "Co-operative Society" },
  { value: "power_of_attorney", label: "Power of Attorney" },
]

export function PropertyFilters({ onChange, initial = {} }: PropertyFiltersProps) {
  const [filters, setFilters] = useState(initial)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  // Count active filters
  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) => value && value !== "" && key !== "search"
  ).length

  const handleChange = useCallback((name: string, value: string) => {
    const newFilters = { ...filters, [name]: value }
    if (!value) {
      delete newFilters[name]
    }
    setFilters(newFilters)
    onChange(newFilters)
  }, [filters, onChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name, e.target.value)
  }

  const clearFilters = () => {
    setFilters({})
    onChange({})
  }

  const clearSingleFilter = (key: string) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    setFilters(newFilters)
    onChange(newFilters)
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Main Search Bar */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className={cn(
            "relative flex-1 transition-all duration-200",
            searchFocused && "ring-2 ring-primary/20 rounded-lg"
          )}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              name="search"
              placeholder="Search by listing title, address, seller..."
              className="pl-10 pr-10 h-10 bg-background border-border"
              value={filters.search || ""}
              onChange={handleInputChange}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {filters.search && (
              <button 
                onClick={() => clearSingleFilter("search")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Select 
              value={filters.property_type || "all"} 
              onValueChange={(value) => handleChange("property_type", value)}
            >
              <SelectTrigger className="w-full sm:w-[160px] h-10 bg-background">
                <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Land Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {PROPERTY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.status || "all"} 
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger className="w-full sm:w-[150px] h-10 bg-background">
                <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="default"
              className={cn(
                "h-10 gap-2 whitespace-nowrap",
                showAdvanced && "bg-primary/10 border-primary/30"
              )}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Advanced</span>
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {activeFilterCount}
                </span>
              )}
              {showAdvanced ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <div className={cn(
        "grid transition-all duration-300 ease-in-out",
        showAdvanced ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <div className="p-4 space-y-4">
            {/* Filter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Listing Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Filter className="h-3 w-3" />
                  Listing Type
                </label>
                <Select 
                  value={filters.listing_type || "all"} 
                  onValueChange={(value) => handleChange("listing_type", value)}
                >
                  <SelectTrigger className="h-9 bg-background">
                    <SelectValue placeholder="All Listings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Listings</SelectItem>
                    {LISTING_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ownership */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Home className="h-3 w-3" />
                  Ownership
                </label>
                <Select 
                  value={filters.ownership_type || "all"} 
                  onValueChange={(value) => handleChange("ownership_type", value)}
                >
                  <SelectTrigger className="h-9 bg-background">
                    <SelectValue placeholder="Any Ownership" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Ownership</SelectItem>
                    {OWNERSHIP_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" />
                  City
                </label>
                <Input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  className="h-9 bg-background"
                  value={filters.city || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Seller / Agent */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="h-3 w-3" />
                  Seller / Agent
                </label>
                <Input
                  type="text"
                  name="developer"
                  placeholder="Seller / agent name"
                  className="h-9 bg-background"
                  value={filters.developer || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <IndianRupee className="h-3 w-3" />
                Budget Range
              </label>
              <Select 
                value={filters.minPrice && filters.maxPrice ? `${filters.minPrice}-${filters.maxPrice}` : filters.minPrice ? `${filters.minPrice}-` : "all"} 
                onValueChange={(value) => {
                  const { min, max } = parseBudgetRange(value)
                  handleChange("minPrice", min ? String(min) : "")
                  setTimeout(() => handleChange("maxPrice", max ? String(max) : ""), 0)
                }}
              >
                <SelectTrigger className="h-9 bg-background">
                  <SelectValue placeholder="Any Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Budget</SelectItem>
                  {BUDGET_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Price Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <IndianRupee className="h-3 w-3" />
                Custom Price Range
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                  <Input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    className="h-9 pl-7 bg-background"
                    value={filters.minPrice || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <span className="text-muted-foreground text-sm">to</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                  <Input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    className="h-9 pl-7 bg-background"
                    value={filters.maxPrice || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {(filters.minPrice || filters.maxPrice) && (
                <p className="text-xs text-primary mt-1">
                  {filters.minPrice && `From: ₹${formatPriceToIndian(parseInt(filters.minPrice))}`}
                  {filters.minPrice && filters.maxPrice && " - "}
                  {filters.maxPrice && `To: ₹${formatPriceToIndian(parseInt(filters.maxPrice))}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters & Clear */}
      {(activeFilterCount > 0 || filters.search) && (
        <div className="px-4 pb-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {Object.entries(filters).filter(([, value]) => value && value !== "").map(([key, value]) => {
            const label: string = key === "search" ? `"${value}"` : 
                         key === "property_type" ? (PROPERTY_TYPES.find(t => t.value === value)?.label || String(value)) :
                         key === "status" ? (STATUS_OPTIONS.find(s => s.value === value)?.label || String(value)) :
                         key === "listing_type" ? (LISTING_TYPES.find(l => l.value === value)?.label || String(value)) :
                         key === "ownership_type" ? (OWNERSHIP_OPTIONS.find(o => o.value === value)?.label || String(value)) :
                         key === "minPrice" ? `Min: ₹${Number(value).toLocaleString()}` :
                         key === "maxPrice" ? `Max: ₹${Number(value).toLocaleString()}` :
                         String(value)
            return (
              <button
                key={key}
                onClick={() => clearSingleFilter(key)}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md hover:bg-primary/20 transition-colors"
              >
                {label}
                <X className="h-3 w-3" />
              </button>
            )
          })}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}

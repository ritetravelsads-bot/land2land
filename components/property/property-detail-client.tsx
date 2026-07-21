"use client"

import { useState, useEffect } from "react"
import {
  MapPin,
  ChevronLeft, ChevronRight,
  Share2, Heart,
  Check, Phone, Mail,
  Shield, ExternalLink,
  Ruler, Grid3X3,
  User, Loader2, ChevronRight as ChevronRightIcon,
  X, ImageIcon, Mountain, Droplets, Route,
  FileText, Landmark, Leaf, Zap, Car
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn, formatPriceToIndian } from "@/lib/utils"
import { useRecentlyViewed } from "@/hooks/use-recently-viewed"

// Import modular components
import { HeroBanner } from "@/components/property/hero-banner"
import { ProjectHighlights } from "@/components/property/project-highlights"
import { LocationConnectivity } from "@/components/property/location-connectivity"
import { DeveloperProjects } from "@/components/property/developer-projects"
import { PropertyFaq } from "@/components/property/property-faq"
import { BrochureDownload } from "@/components/property/brochure-download"
import { SpecialSectionsRenderer } from "@/components/property/special-section"

// --- helpers ---

const CATEGORY_LABELS: Record<string, string> = {
  agricultural: "Agricultural Land",
  residential_plot: "Residential Land",
  commercial_plot: "Commercial Land",
  industrial: "Industrial Land",
  farmland: "Farmland",
  vacant: "Vacant Land",
  abadi_land: "Abadi Land",
}

const OWNERSHIP_LABELS: Record<string, string> = {
  freehold: "Freehold",
  leasehold: "Leasehold",
  cooperative: "Co-operative Society",
  power_of_attorney: "Power of Attorney",
}

const SOIL_LABELS: Record<string, string> = {
  alluvial: "Alluvial (Khadar/Bangar)",
  black_cotton: "Black Cotton (Regur)",
  red_laterite: "Red & Laterite",
  arid_desert: "Arid / Desert",
  loamy: "Loamy",
  sandy: "Sandy",
  clayey: "Clayey",
  rocky: "Rocky / Stony",
  mixed: "Mixed",
}

const ZONING_LABELS: Record<string, string> = {
  agricultural: "Agricultural",
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
  mixed_use: "Mixed Use",
  green_belt: "Green Belt",
  forest: "Forest / Reserved",
}

// --- interfaces ---

interface PropertyDetailClientProps {
  property: any
  developer: any
  propertyTypeSlug?: string
  propertyTypeDisplayName?: string
}

// --- component ---

export function PropertyDetailClient({
  property,
  developer,
  propertyTypeSlug = "agricultural",
  propertyTypeDisplayName = "Agricultural Land",
}: PropertyDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { addProperty: addToRecentlyViewed } = useRecentlyViewed()

  useEffect(() => {
    if (property) {
      addToRecentlyViewed({
        id: property._id,
        slug: property.slug,
        typeSlug: propertyTypeSlug,
        name: property.property_name || "Property",
        thumbnail: property.main_thumbnail || "",
        price: formatPriceToIndian(property.lowest_price) || "",
        address: `${property.address || ""}, ${property.city || ""}`.replace(/^, |, $/g, ""),
        timestamp: Date.now(),
      })
    }
  }, [property, addToRecentlyViewed])

  const images = [
    property.main_banner || property.main_thumbnail,
    ...(property.multiple_images || []),
  ].filter(Boolean)

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length)

  // Manager / associate info
  const manager = property.assigned_manager ||
    property.manager || {
    name: property.agent_name || "Land2Land Expert",
    phone: property.agent_phone || "+91 9205190063",
    email: property.agent_email || "contact@land2land.com",
    photo: property.agent_photo,
  }

  // Build land spec grid — only show rows that have a value
  const landSpecs = [
    {
      icon: Grid3X3,
      label: "Category",
      value:
        CATEGORY_LABELS[property.property_category || property.property_type || ""] ||
        property.property_category?.replace(/_/g, " ") ||
        null,
    },
    {
      icon: Ruler,
      label: "Total Area",
      value: property.area_value
        ? `${property.area_value} ${property.area_unit?.toUpperCase() || "BIGHA"}`
        : null,
    },
    {
      icon: FileText,
      label: "Ownership",
      value:
        OWNERSHIP_LABELS[property.ownership_type || ""] ||
        property.ownership_type?.replace(/_/g, " ") ||
        null,
    },
    {
      icon: Leaf,
      label: "Soil Type",
      value:
        SOIL_LABELS[property.soil_type || ""] ||
        property.soil_type?.replace(/_/g, " ") ||
        null,
    },
    {
      icon: Grid3X3,
      label: "Land Zoning",
      value:
        ZONING_LABELS[property.zoning || ""] ||
        property.zoning?.replace(/_/g, " ") ||
        null,
    },
    {
      icon: Mountain,
      label: "Land Facing",
      value: property.facing?.replace(/_/g, " ") || null,
    },
    {
      icon: Droplets,
      label: "Water Level / Borewell",
      value: property.water_level || null,
    },
    {
      icon: Route,
      label: "Nearest Highway",
      value: property.highway_connectivity || null,
    },
    {
      icon: Car,
      label: "Road Width",
      value: property.road_width ? `${property.road_width} ft` : null,
    },
    {
      icon: MapPin,
      label: "Nearest Town",
      value: property.nearest_town || null,
    },
    {
      icon: FileText,
      label: "Survey / Khasra No.",
      value: property.survey_number || null,
    },
    {
      icon: Landmark,
      label: "Listing Type",
      value: property.listing_type?.replace(/_/g, " ") || null,
    },
  ].filter((s) => !!s.value)

  // Land features (boolean checkmarks)
  const landFeatures = [
    { key: "road_access", label: "Road Access" },
    { key: "water_available", label: "Water Source Available" },
    { key: "electricity_available", label: "Electricity Available" },
    { key: "boundary_wall", label: "Boundary / Fence" },
    { key: "corner_plot", label: "Corner Plot" },
    { key: "title_clear", label: "Title Clear (No Dispute)" },
    { key: "loan_available", label: "Bank Loan Available" },
    { key: "is_negotiable", label: "Price Negotiable" },
  ].filter((f) => !!property[f.key])

  const reviewStatus = property.review_status
  const showPreviewBanner = reviewStatus && reviewStatus !== "approved"

  return (
    <main className="min-h-screen bg-background">
      {/* Preview banner shown to the owner/admin when a listing is not yet public */}
      {showPreviewBanner && (
        <div
          className={`px-4 py-2.5 text-center text-sm font-medium ${reviewStatus === "rejected"
              ? "bg-red-600 text-white"
              : "bg-yellow-500 text-yellow-950"
            }`}
        >
          {reviewStatus === "rejected"
            ? "Preview only — this listing was rejected and is not public. Edit and resubmit it for review."
            : "Preview only — this listing is under review and is not public yet."}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground overflow-x-auto">
            <Link href="/" className="hover:text-primary transition-colors whitespace-nowrap">Home</Link>
            <ChevronRightIcon className="h-3 w-3 flex-shrink-0" />
            <Link href="/properties" className="hover:text-primary transition-colors whitespace-nowrap">Properties</Link>
            <ChevronRightIcon className="h-3 w-3 flex-shrink-0" />
            <Link href={`/properties/${propertyTypeSlug}`} className="hover:text-primary transition-colors whitespace-nowrap">
              {propertyTypeDisplayName}
            </Link>
            <ChevronRightIcon className="h-3 w-3 flex-shrink-0" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{property.property_name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <HeroBanner property={property} />

      {/* Sticky Action Bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/properties" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div className="hidden sm:block">
              <p className="font-semibold text-sm line-clamp-1">{property.property_name}</p>
              <p className="text-xs text-muted-foreground">
                {property.city}{property.state ? `, ${property.state}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isLiked ? "bg-rose-100 text-rose-500" : "hover:bg-muted"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
            <Button size="sm" asChild>
              <a href="#enquiry">Enquire Now</a>
            </Button>
          </div>
        </div>
      </div>

      {/* ============================================================
          MAIN CONTENT: two-column layout (details + sticky contact)
      ============================================================ */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT / MAIN COLUMN */}
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            {property.about_project && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">
                  About this Land
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {property.about_project}
                </p>
              </section>
            )}

            <SpecialSectionsRenderer sections={property.special_sections || []} position="after_about" />

            {/* Highlights */}
            <ProjectHighlights highlights={property.project_highlights || []} />

            <SpecialSectionsRenderer sections={property.special_sections || []} position="after_highlights" />

            {/* Land Specifications */}
            {landSpecs.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">Land Specifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-border rounded-xl overflow-hidden">
                  {landSpecs.map((spec, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3.5 bg-card",
                        idx % 2 === 0 ? "border-r border-border" : "",
                        idx < landSpecs.length - 2 ? "border-b border-border" : "",
                        landSpecs.length % 2 !== 0 && idx === landSpecs.length - 1
                          ? "sm:col-span-2 border-r-0"
                          : ""
                      )}
                    >
                      <spec.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                          {spec.label}
                        </p>
                        <p className="text-sm font-semibold text-foreground capitalize mt-0.5">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Land Features */}
            {landFeatures.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">Features &amp; Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {landFeatures.map((f) => (
                    <div
                      key={f.key}
                      className="flex items-center gap-2 px-3 py-2.5 bg-primary/5 border border-primary/20 rounded-lg"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-foreground">{f.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* RERA */}
            {(property.rera_registered || property.rera_id) && (
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400">RERA Registered</h3>
                </div>
                <div className="flex flex-wrap gap-4 text-xs">
                  {property.rera_id && (
                    <p>
                      <span className="text-muted-foreground">RERA ID: </span>
                      <span className="font-medium">{property.rera_id}</span>
                    </p>
                  )}
                  {property.rera_website_link && (
                    <a
                      href={property.rera_website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View on RERA Website
                    </a>
                  )}
                </div>
              </div>
            )}

            <SpecialSectionsRenderer sections={property.special_sections || []} position="after_details" />

            {/* Gallery */}
            {images.length > 1 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">
                    Photos
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({images.length})
                    </span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {images.slice(0, 6).map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => { setActiveImage(idx); setShowFullscreen(true) }}
                      className={cn(
                        "relative overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-all duration-200",
                        idx === 0 ? "col-span-2 row-span-2 aspect-[16/9] md:aspect-[4/3]" : "aspect-[4/3]"
                      )}
                    >
                      <img
                        src={img}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {idx === 5 && images.length > 6 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">+{images.length - 6}</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {images.length > 6 && (
                  <button
                    onClick={() => { setActiveImage(0); setShowFullscreen(true) }}
                    className="mt-3 text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <ImageIcon className="h-3 w-3" />
                    View all {images.length} photos
                  </button>
                )}
              </section>
            )}

            <SpecialSectionsRenderer sections={property.special_sections || []} position="after_gallery" />

            {/* Location & Connectivity */}
            <LocationConnectivity
              connectivity={property.location_connectivity}
              nearby={property.nearby}
              googleMapLink={property.google_map_link}
              address={property.address}
              city={property.city}
              state={property.state}
            />

            <SpecialSectionsRenderer sections={property.special_sections || []} position="after_location" />

            {/* About Seller */}
            <DeveloperProjects
              developerId={property.developer_id}
              developerSlug={developer?.slug}
              developerName={property.developer_name || developer?.name}
              excludePropertyId={property._id}
            />

            {/* Brochure */}
            <BrochureDownload brochureUrl={property.brochure_pdf} propertyName={property.property_name} />

            <SpecialSectionsRenderer sections={property.special_sections || []} position="before_faq" />

            {/* FAQs */}
            <PropertyFaq faqs={property.faqs || []} />
          </div>

          {/* RIGHT / STICKY CONTACT COLUMN */}
          <div className="lg:col-span-1">
            <div className="sticky top-[72px] space-y-4">

              {/* Price card */}
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Asking Price</p>
                  <p className="text-2xl font-bold text-foreground">
                    {property.lowest_price
                      ? `₹${formatPriceToIndian(property.lowest_price)}`
                      : "Price on Request"}
                  </p>
                  {property.max_price && property.max_price !== property.lowest_price && (
                    <p className="text-sm text-muted-foreground">
                      up to ₹{formatPriceToIndian(property.max_price)}
                    </p>
                  )}
                  {property.price_per_unit && (
                    <p className="text-xs text-muted-foreground mt-1">
                      ₹{formatPriceToIndian(property.price_per_unit)} per {property.area_unit || "unit"}
                    </p>
                  )}
                  {property.is_negotiable && (
                    <span className="inline-block mt-2 text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Negotiable
                    </span>
                  )}
                </div>

                {property.area_value && (
                  <div className="border-t border-border pt-3 mb-4">
                    <p className="text-xs text-muted-foreground">Total Area</p>
                    <p className="text-lg font-bold text-foreground">
                      {property.area_value} {property.area_unit?.toUpperCase() || "BIGHA"}
                    </p>
                  </div>
                )}
              </div>

              {/* Associate contact card */}
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-2xl p-5">
                <div className="text-center mb-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-3 shadow-lg shadow-primary/20">
                    {manager.photo ? (
                      <img
                        src={manager.photo}
                        alt={manager.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-primary-foreground" />
                    )}
                  </div>
                  <h3 className="font-bold text-foreground text-sm">{manager.name}</h3>
                  <p className="text-xs text-muted-foreground">Land Specialist</p>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={`tel:${manager.phone}`}
                    className="flex items-center gap-3 p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] opacity-80">Call Now</p>
                      <p className="font-semibold text-sm">{manager.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${manager.phone?.replace(/[^0-9]/g, "")}?text=Hi, I'm interested in ${property.property_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] opacity-80">WhatsApp</p>
                      <p className="font-semibold text-sm">Chat Now</p>
                    </div>
                  </a>

                  {manager.email && (
                    <a
                      href={`mailto:${manager.email}?subject=Enquiry for ${property.property_name}`}
                      className="flex items-center gap-3 p-3 bg-card border border-border hover:border-primary/50 rounded-xl transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Email</p>
                        <p className="font-medium text-sm text-foreground truncate max-w-[140px]">{manager.email}</p>
                      </div>
                    </a>
                  )}
                </div>

                <p className="text-[10px] text-center text-muted-foreground mt-4">
                  Available Mon–Sat, 9 AM – 7 PM
                </p>
              </div>

              {/* Quick Enquiry Form */}
              <div id="enquiry">
                <CompactEnquiryForm
                  propertyId={property._id}
                  propertyName={property.property_name}
                  propertySlug={property.slug}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery */}
      {showFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white z-10"
          >
            <X className="h-6 w-6" />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <img
            src={images[activeImage]}
            alt={property.property_name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {activeImage + 1} / {images.length}
          </div>
        </div>
      )}
    </main>
  )
}

// ---------- Compact Enquiry Form ----------

function CompactEnquiryForm({
  propertyId,
  propertyName,
  propertySlug,
}: {
  propertyId?: string
  propertyName?: string
  propertySlug?: string
}) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/property-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          property_id: propertyId,
          property_name: propertyName,
          property_slug: propertySlug,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setName("")
        setPhone("")
      } else {
        setError(data.error || "Failed to submit enquiry")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-3">
          <Check className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="font-bold text-foreground mb-1">Thank You!</h3>
        <p className="text-sm text-muted-foreground mb-4">Our team will call you shortly.</p>
        <Button variant="outline" size="sm" onClick={() => setSuccess(false)}>
          Submit Another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-sm">
      <h4 className="font-semibold text-foreground text-sm">Quick Enquiry</h4>

      {error && (
        <div className="p-2.5 bg-destructive/10 border border-destructive/20 rounded-lg text-xs text-destructive">
          {error}
        </div>
      )}

      <div>
        <label className="text-xs font-medium text-foreground block mb-1.5">
          Your Name <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-foreground block mb-1.5">
          Phone <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            required
            pattern="[6-9][0-9]{9}"
            className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <Button type="submit" className="w-full py-5 text-sm font-semibold rounded-xl" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Get Callback"
        )}
      </Button>

      <p className="text-[10px] text-center text-muted-foreground">
        By submitting, you agree to our{" "}
        <Link href="/privacy-policy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>
    </form>
  )
}

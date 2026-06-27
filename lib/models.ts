// Database collection names
// Land2Land marketplace: "properties" -> "listings", "developers" -> "sellers".
// Old keys (PROPERTIES/DEVELOPERS) are kept as aliases so existing code keeps
// compiling; they now point at the renamed collections.
export const COLLECTIONS = {
  USERS: "users",
  LISTINGS: "listings",
  PROPERTIES: "listings", // deprecated alias -> listings
  STATES: "states",
  CATEGORIES: "categories",
  AMENITIES: "amenities",
  SELLERS: "sellers",
  DEVELOPERS: "sellers", // deprecated alias -> sellers
  FACILITIES: "facilities",
  REVIEWS: "reviews",
  TICKETS: "tickets",
  NEWS: "news",
  LEADS: "leads",
  TESTIMONIALS: "testimonials",
}

// User types
export type UserType = "buyer" | "seller" | "agent" | "admin"

export interface User {
  _id?: string
  username: string
  email: string
  password: string
  phone_number: string
  user_type: UserType
  profile_picture?: string
  date_joined: Date
  last_login?: Date
  is_verified?: boolean
}

// Land2Land land categories (top-level "Property Category")
export const LAND_TYPES = [
  "agricultural",
  "residential_plot",
  "commercial_plot",
  "industrial",
  "farmland",
  "vacant",
] as const
export type LandType = (typeof LAND_TYPES)[number]

export const LAND_TYPE_LABELS: Record<LandType, string> = {
  agricultural: "Agricultural Land",
  residential_plot: "Residential Plot",
  commercial_plot: "Commercial Plot",
  industrial: "Industrial Land",
  farmland: "Farmland",
  vacant: "Vacant / Other Land",
}

// Units of area used for land
export const AREA_UNITS = ["sqft", "sqyd", "acre", "bigha", "hectare", "marla", "kanal"] as const
export type AreaUnit = (typeof AREA_UNITS)[number]

export type OwnershipType = "freehold" | "leasehold" | "cooperative" | "power_of_attorney"
export type Facing = "north" | "south" | "east" | "west" | "north_east" | "north_west" | "south_east" | "south_west"

// A land Listing. (Formerly "Property" — building-specific fields are retained
// as optional/legacy only and are no longer surfaced in the UI.)
export interface Listing {
  _id?: string
  // `property_type` now holds the LandType value
  property_type: string
  property_name: string
  slug: string
  status: "available" | "sold" | "reserved"
  lowest_price: number
  max_price: number

  // --- Land-specific fields ---
  area_value?: number        // numeric area in the chosen unit
  area_unit?: AreaUnit
  plot_length?: number       // dimensions in feet
  plot_width?: number
  road_access?: boolean
  road_width?: number        // approach road width (ft)
  zoning?: string            // e.g. agricultural / residential / mixed-use
  ownership_type?: OwnershipType
  facing?: Facing
  corner_plot?: boolean
  boundary_wall?: boolean
  water_available?: boolean
  electricity_available?: boolean
  survey_number?: string     // survey / khasra / khata number
  is_negotiable?: boolean

  area_sqft: number          // canonical area in sqft (kept for compatibility/search)
  address: string
  city: string
  state: string
  postal_code: string
  property_size: number      // legacy size field (sqft)
  property_video?: string
  neighborhood: string
  seller?: string            // seller / agent id (was `builder`)
  builder?: string           // deprecated alias of `seller`
  possession: string
  latitude: number
  longitude: number
  rera_no?: string
  availability_status: "available" | "pending" | "sold"
  is_featured: boolean
  is_hot: boolean
  agent: string
  amenities: string[]
  facilities: string[]
  main_thumbnail: string
  main_banner: string
  multiple_images: string[]
  meta_title: string
  meta_keywords: string
  meta_description: string
  created_at: Date
  updated_at: Date

  // --- Legacy building fields (optional, not used by the land UI) ---
  bedrooms?: number
  bathrooms?: number
  garage?: number
  garage_size?: number

  about_project?: string
  project_highlights?: string[]
  units?: Array<{
    type: string
    size_range?: string
    price_range?: string
    available?: boolean
  }>
  location_connectivity?: Array<{
    type: "metro" | "airport" | "highway" | "hospital" | "school" | "mall" | "railway" | "bus_stand"
    name: string
    distance: string
  }>
  faqs?: Array<{
    question: string
    answer: string
  }>
  payment_plan_details?: string
}

// Deprecated alias — prefer `Listing`.
export type Property = Listing

export interface State {
  _id?: string
  name: string
  slug: string
}

export interface Category {
  _id?: string
  name: string
  slug: string
  icon_class: string
}

export interface Amenities {
  _id?: string
  name: string
  icon_class: string
}

// A land Seller / Agent (formerly "Builder"/"Developer").
export interface Seller {
  _id?: string
  name: string
  slug: string
  logo?: string
  seller_type?: "owner" | "agent" | "broker"
  phone?: string
  email?: string
}

// Deprecated alias — prefer `Seller`.
export type Builder = Seller

export interface Facilities {
  _id?: string
  name: string
  icon_class: string
}

export interface Review {
  _id?: string
  property: string
  user: string
  rating: number
  comment: string
  is_approved: boolean
  created_at: Date
}

export interface Ticket {
  _id?: string
  user: string
  subject: string
  description: string
  priority: "low" | "medium" | "high"
  status: "open" | "in_progress" | "resolved" | "closed"
  created_at: Date
  updated_at: Date
}

export interface News {
  _id?: string
  title: string
  slug: string
  content: string
  author: string
  publication_date: Date
  is_published: boolean
  cover_image: string
  meta_title?: string
  meta_description?: string
  created_at: Date
  updated_at: Date
}

// Lead status workflow: new → contacted → qualified → converted/lost
export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost"
export type LeadSource = "property_enquiry" | "contact_form" | "phone_call" | "whatsapp" | "walk_in" | "referral" | "other"
export type LeadPriority = "low" | "medium" | "high" | "urgent"

export interface Lead {
  _id?: string
  
  // Contact Information
  name: string
  email: string
  phone: string
  message?: string
  
  // Property & Source
  property_id?: string          // MongoDB ObjectId as string
  property_name?: string        // Denormalized for quick display
  property_slug?: string        // For linking to property page
  source: LeadSource
  source_url?: string           // The page URL where lead was captured
  
  // Ownership & Assignment
  property_owner_id?: string    // The agent/admin who owns the property
  property_owner_type?: "admin" | "agent"
  assigned_to?: string          // Agent ID if admin assigns to an agent
  assigned_by?: string          // Admin ID who assigned the lead
  assigned_at?: Date
  
  // Status & Priority
  status: LeadStatus
  priority: LeadPriority
  
  // Follow-up tracking
  notes?: Array<{
    content: string
    created_by: string
    created_by_type: "admin" | "agent"
    created_at: Date
  }>
  last_contacted_at?: Date
  next_follow_up?: Date
  
  // Budget & Requirements (optional, from enquiry form)
  budget_min?: number
  budget_max?: number
  preferred_bhk?: number
  preferred_location?: string
  
  // Timestamps
  created_at: Date
  updated_at: Date
}

// Lead with populated property and user data
export interface LeadWithDetails extends Lead {
  property?: Property
  owner?: User
  assignee?: User
}

// Testimonial Model
export interface Testimonial {
  _id?: string
  name: string
  location: string
  property_bought: string
  rating: number          // 1–5
  text: string
  is_approved: boolean
  created_at: Date
}

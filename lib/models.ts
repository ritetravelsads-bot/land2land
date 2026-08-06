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
  RERA_REQUESTS: "rera_requests",
}

// User types
export type UserType = "buyer" | "seller" | "associate" | "admin"

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
  "abadi_land",
] as const
export type LandType = (typeof LAND_TYPES)[number]

export const LAND_TYPE_LABELS: Record<LandType, string> = {
  agricultural: "Agricultural Land",
  residential_plot: "Residential Land",
  commercial_plot: "Commercial Land",
  industrial: "Industrial Land",
  farmland: "Farmland",
  vacant: "Vacant / Other Land",
  abadi_land: "Abadi Land",
}

// Units of area used for land
export const AREA_UNITS = ["sqft", "sqyd", "acre", "bigha", "hectare", "marla", "kanal"] as const
export type AreaUnit = (typeof AREA_UNITS)[number]

export type OwnershipType = "freehold" | "leasehold" | "cooperative" | "power_of_attorney"
export type Facing = "north" | "south" | "east" | "west" | "north_east" | "north_west" | "south_east" | "south_west"

// --- Land document verification ---
// Indian land records that a land owner uploads for admin verification.
// Note: Khasra is now captured as a text number field (`khasra_number`), not a file upload.
export type LandDocumentKey = "fard" | "intkal" | "girdawari" | "shizra"

export const LAND_DOCUMENT_TYPES: Array<{
  key: LandDocumentKey
  label: string
  hint: string
}> = [
  { key: "fard", label: "Fard", hint: "फर्द — record of rights (ownership proof)" },
  { key: "intkal", label: "Intkal", hint: "इंतकाल — mutation / transfer record" },
  { key: "girdawari", label: "Girdawari", hint: "गिरदावरी — crop inspection record" },
  { key: "shizra", label: "Shizra", hint: "शजरा — map of the land (field sketch)" },
]

// A single uploaded document file.
export interface LandDocumentFile {
  url: string
  name: string
  type: string // MIME type, e.g. "application/pdf" or "image/jpeg"
  size?: number
  uploaded_at: string | Date
}

// The moderation workflow state for a listing.
// pending  -> submitted, waiting for admin review
// approved -> admin approved, listing is public
// rejected -> admin rejected, owner must fix & resubmit
export type ReviewStatus = "pending" | "approved" | "rejected"

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
  khasra_number?: string     // Khasra (खसरा) plot / field record number, entered as text
  is_negotiable?: boolean

  // --- Land document verification & moderation ---
  documents?: Partial<Record<LandDocumentKey, LandDocumentFile>>
  review_status?: ReviewStatus
  review_notes?: string      // admin feedback / rejection reason
  submission_count?: number  // how many times the owner has submitted for review (1 = first)
  submitted_at?: Date | string
  reviewed_at?: Date | string
  reviewed_by?: string       // admin user id

  area_sqft: number          // canonical area in sqft (kept for compatibility/search)
  address: string
  city: string
  state: string
  postal_code: string
  property_size: number      // legacy size field (sqft)
  property_video?: string
  neighborhood: string
  seller?: string            // seller / associate id (was `builder`)
  builder?: string           // deprecated alias of `seller`
  possession: string
  latitude: number
  longitude: number
  rera_no?: string
  availability_status: "available" | "pending" | "sold"
  is_featured: boolean
  is_hot: boolean
  associate: string
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

// A land Seller / Associate (formerly "Builder"/"Developer").
export interface Seller {
  _id?: string
  name: string
  slug: string
  logo?: string
  seller_type?: "owner" | "associate" | "broker"
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
  property_owner_id?: string    // The associate/admin who owns the property
  property_owner_type?: "admin" | "associate"
  assigned_to?: string          // Associate ID if admin assigns to an associate
  assigned_by?: string          // Admin ID who assigned the lead
  assigned_at?: Date
  
  // Status & Priority
  status: LeadStatus
  priority: LeadPriority
  
  // Follow-up tracking
  notes?: Array<{
    content: string
    created_by: string
    created_by_type: "admin" | "associate"
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

// --- RERA Registration Requests ---
// An associate asks the platform for help registering their land with RERA.
// The request flows through several admin-controlled stages:
//   submitted           -> associate created the request, waiting for admin
//   under_review        -> admin is reviewing the request
//   documents_requested -> admin asked the associate for specific documents (associate action needed)
//   documents_submitted -> associate uploaded the requested documents (back to admin)
//   processing          -> admin is processing the RERA registration
//   approved            -> RERA obtained (rera_number is set)
//   rejected            -> admin rejected the request (rejection_reason is set)
export type ReraRequestStatus =
  | "submitted"
  | "under_review"
  | "documents_requested"
  | "documents_submitted"
  | "processing"
  | "approved"
  | "rejected"

export const RERA_REQUEST_STATUSES: ReraRequestStatus[] = [
  "submitted",
  "under_review",
  "documents_requested",
  "documents_submitted",
  "processing",
  "approved",
  "rejected",
]

export const RERA_STATUS_LABELS: Record<ReraRequestStatus, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  documents_requested: "Documents Requested",
  documents_submitted: "Documents Submitted",
  processing: "Processing",
  approved: "Approved",
  rejected: "Rejected",
}

export type ReraApplicantType = "individual" | "company" | "partnership" | "huf" | "society"

export const RERA_APPLICANT_TYPE_LABELS: Record<ReraApplicantType, string> = {
  individual: "Individual",
  company: "Company",
  partnership: "Partnership Firm",
  huf: "HUF (Hindu Undivided Family)",
  society: "Society / Trust",
}

// A document the admin requests from the associate for a RERA registration.
export interface ReraRequestedDocument {
  key: string                 // unique id for this requested item
  label: string               // what the admin is asking for, e.g. "Title Deed"
  note?: string               // extra instructions from the admin
  required: boolean
  requested_at: string | Date
  file?: LandDocumentFile     // the file the associate uploads in response
  uploaded_at?: string | Date
}

// A single entry in the request's stage/activity timeline.
export interface ReraStageEvent {
  status: ReraRequestStatus
  note?: string
  by: string                  // user id who made the change
  by_role: "associate" | "admin"
  at: string | Date
}

export interface ReraRequest {
  _id?: string

  // Who + which land
  associate: string               // associate user id
  associate_name?: string
  associate_email?: string
  listing: string             // listing / property id
  listing_name?: string       // denormalized for quick display
  listing_slug?: string

  // Applicant details supplied by the associate
  applicant_name: string
  applicant_type: ReraApplicantType
  contact_phone: string
  contact_email: string
  project_location?: string
  land_area?: string          // free text, e.g. "5 acres"
  estimated_value?: number
  aadhaar_or_pan?: string     // applicant identity reference
  associate_notes?: string        // any message from the associate

  // Admin-managed workflow
  status: ReraRequestStatus
  requested_documents: ReraRequestedDocument[]
  stage_history: ReraStageEvent[]
  admin_notes?: string        // internal / feedback note shown to the associate
  rera_number?: string        // set when approved
  rejection_reason?: string   // set when rejected

  created_at: Date | string
  updated_at: Date | string
}

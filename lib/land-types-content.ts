import { LAND_TYPES, LAND_TYPE_LABELS, type LandType } from "@/lib/models"

// Single source of truth for the public land-type taxonomy.
// Maps each LandType (from models.ts) to a URL slug and landing-page content.

export interface LandTypeContent {
  type: LandType
  slug: string
  label: string
  shortLabel: string
  icon: string // lucide icon name
  tagline: string
  description: string
  heroImage: string
  highlights: string[]
  faqs: Array<{ question: string; answer: string }>
}

export const LAND_TYPE_CONTENT: Record<LandType, LandTypeContent> = {
  agricultural: {
    type: "agricultural",
    slug: "agricultural",
    label: "Agricultural Land",
    shortLabel: "Agricultural",
    icon: "Wheat",
    tagline: "Fertile land for farming, cultivation and agri-business",
    description:
      "Buy and sell agricultural land across India — fertile parcels suited for crop cultivation, dairy, poultry and agri-businesses. Verified ownership, clear titles and transparent pricing per acre, bigha or hectare.",
    heroImage: "/images/land/agricultural-hero.png",
    highlights: [
      "Clear title & verified ownership records",
      "Water and irrigation access details",
      "Soil type and crop suitability",
      "Priced per acre, bigha or hectare",
    ],
    faqs: [
      {
        question: "Can anyone buy agricultural land in India?",
        answer:
          "Rules vary by state. Some states allow only farmers or agriculturists to buy agricultural land, while others permit any buyer. Always verify local land laws before purchasing.",
      },
      {
        question: "What documents should I check before buying agricultural land?",
        answer:
          "Verify the title deed, mutation records (khasra/khatauni), encumbrance certificate, survey number, and that land use is correctly recorded as agricultural.",
      },
    ],
  },
  residential_plot: {
    type: "residential_plot",
    slug: "residential-plot",
    label: "Residential Plot",
    shortLabel: "Residential Plots",
    icon: "Home",
    tagline: "Build your dream home on a ready-to-construct plot",
    description:
      "Find residential plots in approved layouts and gated communities. Ready-to-construct parcels with clear titles, road access and utility connections in fast-growing neighbourhoods.",
    heroImage: "/images/land/residential-hero.png",
    highlights: [
      "Approved residential layouts",
      "Road access & utility connections",
      "Corner and park-facing options",
      "Clear, construction-ready titles",
    ],
    faqs: [
      {
        question: "What approvals should a residential plot have?",
        answer:
          "Look for layout approval from the local development authority, a clear title, and that the land is zoned for residential use. RERA registration is a plus for plotted developments.",
      },
      {
        question: "Can I get a loan to buy a residential plot?",
        answer:
          "Yes, most banks offer plot or land loans for approved residential plots, though terms differ from home loans. Approval depends on the plot's documentation and location.",
      },
    ],
  },
  commercial_plot: {
    type: "commercial_plot",
    slug: "commercial-plot",
    label: "Commercial Plot",
    shortLabel: "Commercial Plots",
    icon: "Store",
    tagline: "Prime land for shops, offices and commercial projects",
    description:
      "Discover commercial plots on main roads, highways and high-footfall locations — ideal for retail, offices, showrooms and mixed-use development with strong rental and appreciation potential.",
    heroImage: "/images/land/commercial-hero.png",
    highlights: [
      "High-visibility road frontage",
      "Commercial zoning & approvals",
      "Strong appreciation potential",
      "Suited for retail, office or mixed-use",
    ],
    faqs: [
      {
        question: "What makes a good commercial plot?",
        answer:
          "Road frontage, visibility, footfall, commercial zoning, and proximity to business hubs or transport. Confirm the permitted floor-area-ratio (FAR) and land use before buying.",
      },
      {
        question: "Is commercial land a good investment?",
        answer:
          "Commercial land in growing corridors typically offers higher appreciation and rental yields than residential, but requires larger capital and careful due diligence on zoning.",
      },
    ],
  },
  industrial: {
    type: "industrial",
    slug: "industrial",
    label: "Industrial Land",
    shortLabel: "Industrial",
    icon: "Factory",
    tagline: "Land for factories, warehouses and manufacturing units",
    description:
      "Buy industrial land and plots in notified industrial zones, SEZs and logistics corridors — with power, water and road infrastructure suited for manufacturing, warehousing and storage.",
    heroImage: "/images/land/industrial-hero.png",
    highlights: [
      "Located in notified industrial zones",
      "Heavy power & water availability",
      "Wide approach roads for logistics",
      "Suited for factories & warehouses",
    ],
    faqs: [
      {
        question: "What should I verify before buying industrial land?",
        answer:
          "Confirm industrial zoning/land use, pollution-control clearances, power load sanction, water availability, and access roads suitable for heavy vehicles.",
      },
      {
        question: "Can agricultural land be used for industry?",
        answer:
          "Not directly. Agricultural land must be legally converted (land-use change/CLU) to industrial use through the relevant authority before any industrial activity.",
      },
    ],
  },
  farmland: {
    type: "farmland",
    slug: "farmland",
    label: "Farmland",
    shortLabel: "Farmland",
    icon: "Trees",
    tagline: "Managed farmland and farmhouse plots for lifestyle & returns",
    description:
      "Explore managed farmland, farmhouse plots and weekend-retreat land near cities — combining green living, orchards and plantations with long-term land appreciation.",
    heroImage: "/images/land/farmland-hero.png",
    highlights: [
      "Managed & gated farmland options",
      "Ideal for farmhouses & orchards",
      "Green, low-density surroundings",
      "Long-term appreciation near cities",
    ],
    faqs: [
      {
        question: "What is managed farmland?",
        answer:
          "Managed farmland is agricultural land maintained by a company on your behalf — handling plantation, upkeep and harvest — while you own the parcel and earn from produce or appreciation.",
      },
      {
        question: "Can I build a farmhouse on farmland?",
        answer:
          "Construction limits depend on local rules. Many regions allow a small farmhouse on a percentage of the plot; always confirm the permissible built-up area with local authorities.",
      },
    ],
  },
  vacant: {
    type: "vacant",
    slug: "vacant",
    label: "Vacant / Other Land",
    shortLabel: "Vacant Land",
    icon: "Map",
    tagline: "Open and unclassified land parcels of every kind",
    description:
      "Browse vacant, open and unclassified land parcels of all sizes and purposes — flexible options for investors and buyers looking for raw land with future potential.",
    heroImage: "/images/land/vacant-hero.png",
    highlights: [
      "Flexible, multi-purpose parcels",
      "Range of sizes and price points",
      "Verified ownership & boundaries",
      "Strong long-term hold potential",
    ],
    faqs: [
      {
        question: "What can I do with vacant land?",
        answer:
          "Vacant land can be held for appreciation, developed (subject to zoning), leased, or converted to residential, commercial or agricultural use after the necessary approvals.",
      },
      {
        question: "How do I verify boundaries of vacant land?",
        answer:
          "Use the survey number to obtain an official survey map, and consider a licensed surveyor to physically demarcate boundaries before purchase.",
      },
    ],
  },
}

// Ordered list for menus and listings.
export const LAND_TYPE_LIST: LandTypeContent[] = LAND_TYPES.map((t) => LAND_TYPE_CONTENT[t])

const SLUG_TO_TYPE: Record<string, LandType> = LAND_TYPES.reduce(
  (acc, t) => {
    acc[LAND_TYPE_CONTENT[t].slug] = t
    return acc
  },
  {} as Record<string, LandType>,
)

export function getLandTypeBySlug(slug: string): LandTypeContent | null {
  const type = SLUG_TO_TYPE[slug]
  return type ? LAND_TYPE_CONTENT[type] : null
}

export function getLandTypeLabel(type: string): string {
  return LAND_TYPE_LABELS[type as LandType] ?? type
}

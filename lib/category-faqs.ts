import type { LandType } from "@/lib/models"

export type CategoryFAQ = {
  question: string
  answer: string
  points: Array<{ label: string; text: string }>
}

const point = (label: string, text: string) => ({ label, text })

export const CATEGORY_FAQS: Partial<Record<LandType, CategoryFAQ[]>> = {
  agricultural: [
    {
      question: "How do I buy agricultural land in India?",
      answer: "Buying agricultural land in India requires confirming your state-level buyer eligibility, verifying the land's title and revenue records for at least 30 years, and registering the sale deed at the local Registrar Office.",
      points: [
        point("Eligibility Check", "Confirm whether you qualify under the relevant state's tenancy or land reform laws; states such as Karnataka and Maharashtra may restrict purchase to individuals with a farming background."),
        point("Document Verification", "Cross-check the 7/12 extract, RTC or Khasra-Khatauni, mutation entries, and a fresh Encumbrance Certificate covering the relevant title period."),
        point("Physical Due Diligence", "Conduct an on-ground survey to confirm boundaries against the FMB/Tippan map, access road, irrigation source, and soil quality."),
        point("Registration", "Execute and register the sale deed at the Sub-Registrar Office with jurisdiction over the land, paying stamp duty and registration fees."),
      ],
    },
    {
      question: "Can I get a loan to buy agricultural land?",
      answer: "Select public and private banks, cooperative banks, and NBFCs offer agricultural land purchase loans, although eligibility and loan-to-value ratios are typically stricter than for home loans.",
      points: [
        point("Lender Type", "Nationalised, regional rural, and cooperative banks may finance agricultural land; not every lender finances pure land purchase."),
        point("Loan-to-Value", "Financing is often capped around 50–70% of assessed value, requiring a larger upfront contribution."),
        point("Eligibility", "Lenders may ask for farmer status, agricultural income, land records, and a viable cultivation plan."),
        point("Documents", "Expect KYC, revenue records, an Encumbrance Certificate, and a valuation report from an approved surveyor."),
      ],
    },
    {
      question: "Is income from the sale of agricultural land taxable in India?",
      answer: "Rural agricultural land is generally exempt from capital gains tax, while urban agricultural land can attract tax based on its location and holding period.",
      points: [
        point("Rural Exemption", "Land outside applicable municipal limits is generally not treated as a capital asset under Section 2(14) of the Income Tax Act."),
        point("Urban Land Taxation", "Agricultural land within municipal or notified urban areas can attract LTCG or STCG depending on the holding period."),
        point("Reinvestment Relief", "Section 54B may provide relief when gains from eligible urban agricultural land are reinvested in agricultural land within the prescribed period."),
      ],
    },
    {
      question: "What is the land ceiling limit for agricultural land ownership in India?",
      answer: "State-level Land Ceiling Acts cap how much agricultural land a family can hold, with limits varying by state and by the irrigation and quality of the land.",
      points: [
        point("State Variation", "Limits are fixed under individual state legislation rather than one national ceiling."),
        point("Land Quality", "Many states classify irrigated, single-crop, and dry land differently, with different ceilings for each category."),
        point("Family Unit", "Ceilings are generally applied to the family unit, including spouse and minor children."),
        point("Surplus Land", "Land above the applicable ceiling may be declared surplus and become liable for government acquisition."),
      ],
    },
    {
      question: "Can a private company or trust buy agricultural land in India?",
      answer: "Most states restrict agricultural land purchase to individual farmers, so companies and trusts generally need special government or Collector-level permission.",
      points: [
        point("Special-Purpose Exceptions", "Approved agro-processing, seed production, plantation, or collective farming projects may qualify for permission."),
        point("Trust or Society Route", "Registered agricultural trusts and cooperative societies may hold farmland for approved purposes under state rules."),
        point("Conversion Requirement", "A factory, warehouse, or commercial project generally requires land-use conversion rather than agricultural purchase."),
      ],
    },
    {
      question: "How is agricultural land measured in India?",
      answer: "Agricultural land is measured in standard units such as acres and hectares alongside regional units such as bigha, guntha, kanal, and biswa, whose conversion varies by state.",
      points: [
        point("Standard Units", "One acre equals 43,560 square feet or approximately 0.4047 hectares."),
        point("Regional Variation", "A bigha is not nationally fixed and may represent different areas in neighbouring states or districts."),
        point("Common Local Units", "Punjab and Haryana commonly use kanal and marla, while Karnataka and parts of Maharashtra use guntha."),
        point("Verification Source", "Confirm the exact conversion against the relevant state's revenue department notification."),
      ],
    },
  ],
  residential_plot: [
    {
      question: "What is residential land use?",
      answer: "Residential land use is a zoning classification that legally permits development for housing, including individual homes, plotted layouts, or approved group housing.",
      points: [
        point("Zoning Basis", "DDA, DTCP, HMDA, and other local authorities define residential, commercial, industrial, and agricultural zones."),
        point("Permitted Structures", "Depending on local bye-laws, residential zoning may allow independent houses, row houses, plotted development, or apartments."),
        point("Conversion Requirement", "Agricultural land must be formally converted to Non-Agricultural residential status before housing development."),
        point("Mixed Use", "Some master plans permit limited commercial activity in residential zones subject to frontage and floor-area restrictions."),
      ],
    },
    {
      question: "Where can I find residential land for sale near me?",
      answer: "Use verified online land marketplaces, local property dealers, and location-based searches on state registration portals.",
      points: [
        point("Online Platforms", "Filter by city, locality, budget, plot size, and NA status to shortlist suitable plots."),
        point("Local Verification", "Sub-Registrar records and municipal land-use maps can confirm zoning and transaction values."),
        point("Layout Approval", "Prioritise DTCP, RERA, or other authority-approved layouts because they are easier to finance and resell."),
        point("Site Visits", "Visit shortlisted properties to assess connectivity, road access, neighbourhood development, and drainage."),
      ],
    },
    {
      question: "How can I convert agricultural land to residential?",
      answer: "File a Non-Agricultural conversion application with the district Collector or relevant authority, provide ownership and land documents, and pay the applicable conversion fee.",
      points: [
        point("Application", "Submit the 7/12 extract, sale deed, site plan, and required No-Objection Certificates."),
        point("Zoning Compliance", "The authority checks the application against the local master plan."),
        point("Fees and Timeline", "Conversion fees and approval timelines vary by location and documentation completeness."),
        point("Post-Conversion", "After approval, update revenue records before development, mortgage, or subdivision."),
      ],
    },
    {
      question: "What is the difference between an NA plot and a gated layout plot?",
      answer: "An NA plot is legally converted for non-farming use, while a gated layout plot is an NA plot inside an approved community with shared infrastructure.",
      points: [
        point("Legal Status", "NA status changes land use but does not by itself confirm layout approval or amenities."),
        point("Layout Approval", "A gated layout additionally requires sanction for roads, drainage, plot subdivision, and common infrastructure."),
        point("Amenities", "Gated layouts may include boundary walls, security, internal roads, and common-area maintenance."),
        point("Resale and Loans", "Approved and RERA-registered layouts are generally easier to finance and resell."),
      ],
    },
    {
      question: "How much stamp duty and registration charges apply to a residential plot?",
      answer: "Stamp duty commonly ranges from about 5% to 7% of market or circle-rate value, plus a separate registration fee that often approaches 1%, depending on the state.",
      points: [
        point("State Range", "Rates vary by state and are generally calculated on the higher of agreement value or circle rate."),
        point("Gender Rebate", "Some states provide concessions when property is registered solely or jointly in a woman's name."),
        point("Registration Fee", "A separate registration charge is paid to the Sub-Registrar's office."),
      ],
    },
    {
      question: "What is the minimum plot size required to build a house in India?",
      answer: "Minimum residential plot size is set by each city's building bye-laws and commonly ranges from around 30–50 square metres in dense urban areas, with larger requirements in low-density zones.",
      points: [
        point("Municipal Bye-Laws", "DDA, BBMP, BMC, and other authorities prescribe minimum sizes and setbacks by zone."),
        point("Road Width", "Permissible construction is often linked to the width of the approach road."),
        point("FSI Impact", "The sanctioned FSI determines the total built-up area even when the plot meets the minimum size."),
      ],
    },
  ],
  commercial_plot: [
    {
      question: "What is commercial land?",
      answer: "Commercial land is officially zoned for business activities such as retail, offices, hospitality, or commercial buildings, distinct from residential, industrial, or agricultural zoning.",
      points: [
        point("Zoning Classification", "Commercial zones are designated in the city's master or development plan."),
        point("Permitted Activities", "Uses may include shops, offices, showrooms, hotels, restaurants, and mixed-use developments."),
        point("FSI and Norms", "Commercial plots often carry different FSI, parking, and building norms than residential plots."),
        point("Regulatory Overlap", "Large projects may need RERA, fire-safety, and environmental clearances."),
      ],
    },
    {
      question: "What is commercial land used for?",
      answer: "Commercial land supports approved income-generating activities such as retail shops, offices, hotels, showrooms, and commercial complexes.",
      points: [
        point("Retail and Office", "Shops, shopping complexes, offices, and business parks need visibility, frontage, and parking."),
        point("Hospitality and Services", "Hotels, restaurants, banquet halls, and services may require fire and health clearances."),
        point("Mixed Development", "Larger plots can combine retail, office, and hospitality uses under one sanctioned plan."),
        point("Restricted Activities", "Not every business is permitted in every commercial sub-zone."),
      ],
    },
    {
      question: "Where can I find commercial land for sale near me?",
      answer: "Search verified property platforms, commercial brokers, and notified commercial zones in the local master plan.",
      points: [
        point("Platform Search", "Filter by size, price, road frontage, footfall potential, and permitted commercial use."),
        point("Zoning Verification", "Cross-reference the plot with the development authority zoning map."),
        point("Location Factors", "Prioritise arterial-road access, visibility, residential catchment, and planned infrastructure."),
        point("Direct Enquiry", "Owner enquiries and government e-auctions can reveal opportunities not listed online."),
      ],
    },
    {
      question: "Is RERA registration mandatory for commercial land?",
      answer: "RERA registration generally applies to a commercial development project exceeding 500 square metres or eight units, not a simple one-time sale of an individual undeveloped plot.",
      points: [
        point("Threshold", "Promoters must register projects crossing the applicable area or unit threshold, including phases."),
        point("Sale vs Development", "RERA primarily applies when a developer sells constructed units or plotted development."),
        point("Buyer Protection", "Registered projects disclose approvals, timelines, and litigation information on the state RERA portal."),
      ],
    },
    {
      question: "What is FSI or FAR and how does it affect commercial development?",
      answer: "FSI, also called FAR, is the ratio of permitted built-up area to plot area and directly determines how much can be constructed.",
      points: [
        point("Formula", "An FSI of 2 on a 1,000-square-metre plot permits up to 2,000 square metres of total built-up area."),
        point("Zone Limits", "FSI varies by city and zone, with core commercial districts often carrying higher limits."),
        point("Valuation", "Two identical plots can have different values because sanctioned FSI affects revenue potential."),
      ],
    },
    {
      question: "What is the difference between commercial and industrial land?",
      answer: "Commercial land is zoned for trade, retail, and office use, while industrial land is zoned for manufacturing, warehousing, and production.",
      points: [
        point("Permitted Use", "Commercial zoning covers shops, offices, hotels, and showrooms; industrial zoning covers factories, logistics, and manufacturing."),
        point("Regulatory Approvals", "Industrial land may need Pollution Control Board consent and factory licensing."),
        point("Infrastructure", "Industrial plots prioritise heavy-vehicle access, power load, and effluent disposal."),
      ],
    },
  ],
  farmland: [
    {
      question: "What is farmland?",
      answer: "Farmland is land classified and used for agricultural production, including crops, horticulture, orchards, and other permitted rural activities.",
      points: [
        point("Classification", "Farmland is recorded as agricultural land in documents such as the 7/12 extract, RTC, or Khasra-Khatauni."),
        point("Use Types", "It may support row crops, orchards, plantations, horticulture, or seasonal cultivation."),
        point("Ownership Rules", "Agricultural purchase eligibility, ceiling limits, and NRI restrictions generally apply equally to farmland."),
        point("Value Drivers", "Water, soil fertility, road access, and proximity to markets influence value and productivity."),
      ],
    },
    {
      question: "How can I buy farmland?",
      answer: "Confirm eligibility to purchase agricultural land in the state, verify title and revenue records for at least 30 years, and register the sale deed at the local Sub-Registrar Office.",
      points: [
        point("Location and Budget", "Shortlist by acreage, price per acre, connectivity, water availability, and crop suitability."),
        point("Eligibility", "Verify whether the state's rules require agricultural background or other qualifications."),
        point("Document Verification", "Check ownership chain, mutation records, Encumbrance Certificate, and land classification."),
        point("Registration and Mutation", "Register the sale deed and promptly apply for mutation in the revenue records."),
      ],
    },
    {
      question: "Where can I find farmland for sale near me?",
      answer: "Use verified land marketplaces, local agricultural brokers, and comparisons based on acreage, price, water availability, and road access.",
      points: [
        point("Platform Search", "Filter by district, acreage range, budget, and irrigation type."),
        point("Local Enquiry", "Patwari, Talathi, and local agricultural brokers may know about unlisted sales."),
        point("Infrastructure Check", "Compare nearby mandis, cold storage, and road connectivity."),
        point("Site Visit", "Visit shortlisted farmland to assess actual water availability and soil condition."),
      ],
    },
    {
      question: "Can farmland be leased for cultivation?",
      answer: "Farmland can usually be leased for cultivation, but tenure, rent terms, and tenant rights are governed by each state's tenancy laws.",
      points: [
        point("State Tenancy Acts", "Lease rules vary and may include maximum tenure and tenant-protection provisions."),
        point("Written Agreement", "A registered or notarised lease clarifies possession, rent, use, and return obligations."),
        point("Rent and Duration", "Document negotiated terms and stay within state-specified limits."),
        point("Return of Possession", "Include a clear end date and possession-return clause."),
      ],
    },
    {
      question: "What is the difference between farmland and agricultural land?",
      answer: "Agricultural land is the broad legal classification for land used in farming, while farmland commonly refers to land actively used or intended for cultivation.",
      points: [
        point("Legal vs Colloquial", "Agricultural land is the formal revenue-record classification; farmland is a common market term."),
        point("Scope", "Agricultural land can include orchards, plantations, grazing land, and horticultural plots."),
        point("Investment Framing", "Listings may use farmland for lifestyle farming, weekend farmhouses, or organic cultivation."),
        point("Regulatory Treatment", "For eligibility and tax purposes, both generally follow the official agricultural classification."),
      ],
    },
    {
      question: "Can farmland be used to build a farmhouse or resort?",
      answer: "A farmhouse may be permitted in limited form under state rules, while a commercial resort or paid venue typically requires land-use conversion and additional approvals.",
      points: [
        point("Farmhouse Rules", "Some states allow a defined percentage for a farmhouse subject to size and purpose limits."),
        point("Commercial Use", "A resort, event venue, or homestay generally requires Non-Agricultural conversion and commercial approval."),
        point("Structure Limits", "States may cap built-up footprint and restrict non-agricultural utilities without conversion."),
        point("Environmental Overlays", "Eco-sensitive zones, forest buffers, and water bodies may impose extra restrictions."),
      ],
    },
  ],
}

export function getCategoryFAQs(type: LandType): CategoryFAQ[] | null {
  return CATEGORY_FAQS[type] ?? null
}

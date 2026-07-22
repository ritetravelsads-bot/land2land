import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle, UserPlus, MapPin, FileCheck, ArrowRight } from "lucide-react"

export default function ListYourLandGuide() {
  const steps = [
    {
      title: "Create a Free Account",
      description: "Sign up on Land2Land.com with your mobile number to get access to our seller dashboard.",
      icon: UserPlus,
    },
    {
      title: "Enter Property Details",
      description: "Pinpoint your land on the map and add key details like total area, zoning type, and expected price.",
      icon: MapPin,
    },
    {
      title: "Upload Documents & Publish",
      description: "Upload clear photos and title documents for verification. Once approved, your listing goes live to 15,000+ buyers.",
      icon: FileCheck,
    },
  ]

  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-6 lg:px-8 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-12 bg-[var(--land-ochre)]/60" />
            <span className="text-[var(--land-primary)] text-xs font-semibold uppercase tracking-widest">
              Seller Guide
            </span>
            <div className="h-px w-12 bg-[var(--land-ochre)]/60" />
          </div>
          <h2 className="text-[var(--land-primary)] text-3xl md:text-4xl font-bold text-balance">
            How to List Your Land in 3 Simple Steps
          </h2>
          <p className="text-slate-600 text-lg">
            Watch our quick tutorial or follow the steps below to get your property in front of thousands of verified investors today.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: YouTube Video Embed */}
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-slate-200 aspect-video">
            {/* Replace 'YOUR_VIDEO_ID' in the src below with your actual YouTube video ID */}
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/SCUpYV5-I18?si=4X9YKdnEDkZSX9hd" 
              title="How to list your land on Land2Land"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Right Column: Steps Timeline */}
          <div className="space-y-8">
            <div className="relative border-l-2 border-slate-200 ml-4 space-y-10 pb-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="relative pl-10">
                    {/* Icon / Timeline Node */}
                    <div className="absolute -left-[21px] top-0.5 bg-white p-1 rounded-full">
                      <div className="w-9 h-9 rounded-full bg-[var(--land-primary)]/10 text-[var(--land-primary)] flex items-center justify-center">
                        <Icon size={18} strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-4 pl-4">
              <Button
                asChild
                size="lg"
                className="bg-[var(--land-primary)] text-white hover:bg-[var(--land-primary)]/90 h-13 px-8 text-base font-bold shadow-md"
              >
                <Link href="/list-property">
                  Start Your Listing
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
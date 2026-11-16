"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, BookOpenCheck, ExternalLink, Landmark, Ruler } from "lucide-react"

const statePortals = [
  {
    id: "haryana",
    name: "Haryana",
    portalName: "Jamabandi Haryana",
    portalUrl: "https://jamabandi.nic.in/",
    units: "Kanal, marla, acre, and hectare",
    records: "Jamabandi (Record of Rights), mutation entries, and cadastral maps",
  },
  {
    id: "punjab",
    name: "Punjab",
    portalName: "Punjab Land Records",
    portalUrl: "https://jamabandi.punjab.gov.in/",
    units: "Kanal, marla, acre, and hectare",
    records: "Jamabandi, Fard, mutation entries, and cadastral maps",
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    portalName: "UP Bhulekh",
    portalUrl: "https://upbhulekh.gov.in/",
    units: "Bigha, biswa, and hectare (local conventions can vary)",
    records: "Khatauni, Khasra, mutation records, and Bhu Naksha",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    portalName: "Apna Khata Rajasthan",
    portalUrl: "https://apnakhata.rajasthan.gov.in/",
    units: "Bigha, biswa, and hectare (local conventions can vary)",
    records: "Jamabandi, Girdawari, mutation records, and cadastral maps",
  },
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    portalName: "MP Bhulekh",
    portalUrl: "https://mpbhulekh.gov.in/",
    units: "Bigha and hectare (confirm the local standard)",
    records: "Khasra, Khatauni / B-1, mutation records, and land maps",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    portalName: "Mahabhulekh",
    portalUrl: "https://bhulekh.mahabhumi.gov.in/",
    units: "Guntha, acre, and hectare",
    records: "7/12 extract, 8A extract, Ferfar, and property card",
  },
]

const tasks = [
  { id: "portal", label: "Open the official land-record portal" },
  { id: "records", label: "Find records to review" },
  { id: "units", label: "Check local measurement units" },
] as const

type TaskId = (typeof tasks)[number]["id"]

export default function StatePortalFinder() {
  const [stateId, setStateId] = useState(statePortals[0].id)
  const [taskId, setTaskId] = useState<TaskId>("portal")
  const selectedState = useMemo(
    () => statePortals.find((state) => state.id === stateId) ?? statePortals[0],
    [stateId],
  )

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Landmark size={14} aria-hidden="true" /> State land helper
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Start with the right state record</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Choose a state and a task to find its official land-record portal, common records to review, or measurement units. Use government records as a starting point, then confirm details with a qualified local professional.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="portal-state" className="text-sm font-semibold text-foreground">Select a state</label>
              <select
                id="portal-state"
                value={stateId}
                onChange={(event) => setStateId(event.target.value)}
                className="h-12 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {statePortals.map((state) => <option key={state.id} value={state.id}>{state.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="portal-task" className="text-sm font-semibold text-foreground">What do you need?</label>
              <select
                id="portal-task"
                value={taskId}
                onChange={(event) => setTaskId(event.target.value as TaskId)}
                className="h-12 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {tasks.map((task) => <option key={task.id} value={task.id}>{task.label}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-muted/50 p-5" aria-live="polite">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {taskId === "portal" ? <ExternalLink size={19} aria-hidden="true" /> : taskId === "records" ? <BookOpenCheck size={19} aria-hidden="true" /> : <Ruler size={19} aria-hidden="true" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{selectedState.name}</p>
                <h3 className="mt-1 text-lg font-bold text-foreground">
                  {taskId === "portal" ? selectedState.portalName : taskId === "records" ? "Records to look for" : "Common local units"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {taskId === "portal" ? "Open the state government land-record service to search available records." : taskId === "records" ? selectedState.records : selectedState.units}
                </p>
                {taskId === "portal" && (
                  <a
                    href={selectedState.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Visit {selectedState.portalName}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Portal availability, terminology, and land measurement conventions may vary by district and change over time. This directory is informational, not legal advice; confirm records and eligibility with the relevant authority.
          </p>
        </div>
      </div>
    </section>
  )
}

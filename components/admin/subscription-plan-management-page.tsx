"use client"

import { useState } from "react"
import useSWR from "swr"
import { BadgeCheck, CircleDollarSign, Pencil, Plus, RefreshCw, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Plan {
  _id: string
  plan_code: string
  name: string
  description?: string
  billing_cycle: "free" | "monthly" | "yearly" | "custom" | null
  price_amount: number | null
  currency: string
  duration_days: number | null
  publishing_limit: number | null
  benefits: string[]
  status: "active" | "inactive"
  display_order: number
  featured: boolean
  purchase_enabled: boolean
  refund_on_unpublish: boolean
}

interface PlanResponse { plans: Plan[] }

const PLAN_CODES = ["free", "basic", "standard", "premium", "business"] as const

const fetcher = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || "Failed to load plans")
  return data
}

const blankForm = () => ({
  plan_code: "basic",
  name: "Basic",
  description: "",
  billing_cycle: "monthly",
  price_amount: "",
  duration_days: "",
  publishing_limit: "",
  benefits: "",
  status: "inactive",
  display_order: "1",
  featured: false,
  purchase_enabled: false,
  refund_on_unpublish: false,
})

type PlanForm = ReturnType<typeof blankForm>

function formatPrice(plan: Plan) {
  if (plan.billing_cycle === "free") return "Free"
  if (plan.price_amount == null) return "Price not configured"
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: plan.currency || "INR", maximumFractionDigits: 0 }).format(plan.price_amount)
}

export default function SubscriptionPlanManagementPage() {
  const { data, error, isLoading, mutate } = useSWR<PlanResponse>("/api/admin/subscription-plans", fetcher)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [form, setForm] = useState<PlanForm>(blankForm())
  const [saving, setSaving] = useState(false)
  const [initializing, setInitializing] = useState(false)
  const missingPlanCodes = PLAN_CODES.filter((code) => !data?.plans.some((plan) => plan.plan_code === code))

  const startCreate = () => {
    const nextCode = missingPlanCodes[0]
    if (!nextCode) return
    setEditingPlan(null)
    setForm({
      ...blankForm(),
      plan_code: nextCode,
      name: nextCode[0].toUpperCase() + nextCode.slice(1),
      ...(nextCode === "free" ? { billing_cycle: "free", status: "active" } : {}),
    })
    setDialogOpen(true)
  }

  const startEdit = (plan: Plan) => {
    setEditingPlan(plan)
    setForm({
      plan_code: plan.plan_code,
      name: plan.name,
      description: plan.description || "",
      billing_cycle: plan.billing_cycle || "custom",
      price_amount: plan.price_amount == null ? "" : String(plan.price_amount),
      duration_days: plan.duration_days == null ? "" : String(plan.duration_days),
      publishing_limit: plan.publishing_limit == null ? "" : String(plan.publishing_limit),
      benefits: (plan.benefits || []).join("\n"),
      status: plan.status,
      display_order: String(plan.display_order ?? 0),
      featured: plan.featured,
      purchase_enabled: plan.purchase_enabled,
      refund_on_unpublish: plan.refund_on_unpublish,
    })
    setDialogOpen(true)
  }

  const updateField = <K extends keyof PlanForm>(key: K, value: PlanForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const initializeDefaults = async () => {
    setInitializing(true)
    try {
      const response = await fetch("/api/admin/subscription-plans/initialize", { method: "POST" })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not initialize plans")
      toast.success("Default plan categories are ready")
      await mutate()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not initialize plans")
    } finally {
      setInitializing(false)
    }
  }

  const savePlan = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    try {
      const body = {
        ...form,
        price_amount: form.plan_code === "free" ? 0 : form.price_amount === "" ? null : Number(form.price_amount),
        duration_days: form.duration_days === "" ? null : Number(form.duration_days),
        publishing_limit: form.plan_code === "free" || form.publishing_limit === "" ? null : Number(form.publishing_limit),
        display_order: Number(form.display_order),
        benefits: form.benefits.split("\n").map((benefit) => benefit.trim()).filter(Boolean),
      }
      const response = await fetch(editingPlan ? `/api/admin/subscription-plans/${editingPlan._id}` : "/api/admin/subscription-plans", {
        method: editingPlan ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not save plan")
      toast.success(editingPlan ? "Plan updated" : "Plan created")
      setDialogOpen(false)
      await mutate()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save plan")
    } finally {
      setSaving(false)
    }
  }

  const togglePlan = async (plan: Plan) => {
    const response = await fetch(`/api/admin/subscription-plans/${plan._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...plan, status: plan.status === "active" ? "inactive" : "active" }),
    })
    const result = await response.json()
    if (!response.ok) {
      toast.error(result.error || "Could not update plan status")
      return
    }
    toast.success(plan.status === "active" ? "Plan deactivated" : "Plan activated")
    await mutate()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Configurable publishing allowances</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Plan Management</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => mutate()} disabled={isLoading}><RefreshCw data-icon="inline-start" />Refresh</Button>
          {missingPlanCodes.length > 0 && <Button onClick={startCreate}><Plus data-icon="inline-start" />Add missing category</Button>}
        </div>
      </div>

      {error && <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error.message}</div>}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading plans">{[0, 1, 2].map((item) => <div key={item} className="h-56 animate-pulse rounded-2xl bg-muted" />)}</div>
      ) : data?.plans.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.plans.map((plan) => (
            <Card key={plan._id} className={plan.featured ? "border-primary/50 shadow-sm" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    {plan.featured && <BadgeCheck className="size-4 text-primary" aria-label="Recommended" />}
                  </div>
                  <Badge variant={plan.status === "active" ? "default" : "secondary"}>{plan.status}</Badge>
                </div>
                <CardDescription>{plan.description || "No description added."}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xl font-bold text-foreground">
                  <CircleDollarSign className="size-5 text-primary" aria-hidden="true" />
                  {formatPrice(plan)}
                  {plan.billing_cycle && !["free", "custom"].includes(plan.billing_cycle) && <span className="text-sm font-normal text-muted-foreground">/ {plan.billing_cycle}</span>}
                </div>
                <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-3 text-sm">
                  <div><p className="text-xs text-muted-foreground">Publish limit</p><p className="mt-1 font-semibold">{plan.publishing_limit ?? (plan.plan_code === "free" ? "Per-agent" : "Not set")}</p></div>
                  <div><p className="text-xs text-muted-foreground">Validity</p><p className="mt-1 font-semibold">{plan.billing_cycle === "free" ? "No expiry" : plan.billing_cycle === "custom" ? `${plan.duration_days ?? "Not set"} days` : plan.billing_cycle || "Not set"}</p></div>
                </div>
                <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                  {(plan.benefits || []).slice(0, 3).map((benefit) => <li key={benefit}>• {benefit}</li>)}
                  {!plan.benefits?.length && <li>No benefits configured.</li>}
                </ul>
                <div className="mt-auto flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => startEdit(plan)}><Pencil data-icon="inline-start" />Edit</Button>
                  <Button variant={plan.status === "active" ? "secondary" : "default"} className="flex-1" onClick={() => togglePlan(plan)}>
                    {plan.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <CircleDollarSign className="size-9 text-muted-foreground" aria-hidden="true" />
            <div><p className="font-semibold">No plan categories initialized</p><p className="mt-1 text-sm text-muted-foreground">Create the five plan categories before setting quotas and pricing.</p></div>
            <Button onClick={initializeDefaults} disabled={initializing}>{initializing ? "Creating categories…" : "Create default categories"}</Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingPlan ? `Edit ${editingPlan.name} plan` : "Create plan"}</DialogTitle>
            <DialogDescription>Prices, limits, and durations are stored as admin configuration. No paid plan activates without a verified payment integration or manual assignment.</DialogDescription>
          </DialogHeader>
          <form onSubmit={savePlan}>
            <FieldGroup className="gap-4">
              <FieldGroup className="grid gap-3 sm:grid-cols-2">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="plan-code">Plan category</FieldLabel>
                  <Select value={form.plan_code} onValueChange={(value) => setForm((current) => ({
                    ...current,
                    plan_code: value,
                    billing_cycle: value === "free" ? "free" : current.billing_cycle === "free" ? "monthly" : current.billing_cycle,
                    price_amount: value === "free" ? "0" : current.plan_code === "free" ? "" : current.price_amount,
                    publishing_limit: value === "free" ? "" : current.publishing_limit,
                    status: value === "free" ? "active" : current.plan_code === "free" ? "inactive" : current.status,
                    purchase_enabled: value === "free" ? false : current.purchase_enabled,
                  }))} disabled={Boolean(editingPlan)}>
                    <SelectTrigger id="plan-code"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectGroup>
                      {(editingPlan ? [editingPlan.plan_code] : missingPlanCodes).map((code) => <SelectItem key={code} value={code}>{code[0].toUpperCase() + code.slice(1)}</SelectItem>)}
                    </SelectGroup></SelectContent>
                  </Select>
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="plan-name">Display name</FieldLabel>
                  <Input id="plan-name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
                </Field>
              </FieldGroup>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="plan-description">Description</FieldLabel>
                <Textarea id="plan-description" value={form.description} onChange={(event) => updateField("description", event.target.value)} rows={2} />
              </Field>
              <FieldGroup className="grid gap-3 sm:grid-cols-2">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="billing-cycle">Billing / duration</FieldLabel>
                  <Select value={form.billing_cycle} onValueChange={(value) => updateField("billing_cycle", value)} disabled={form.plan_code === "free"}>
                    <SelectTrigger id="billing-cycle"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectGroup>
                      {form.plan_code === "free" ? <SelectItem value="free">Free · no expiry</SelectItem> : <><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="yearly">Yearly</SelectItem><SelectItem value="custom">Custom duration</SelectItem></>}
                    </SelectGroup></SelectContent>
                  </Select>
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="plan-price">Price (INR)</FieldLabel>
                  <Input id="plan-price" type="number" min="0" step="1" value={form.plan_code === "free" ? "0" : form.price_amount} onChange={(event) => updateField("price_amount", event.target.value)} disabled={form.plan_code === "free"} placeholder="Configure price" />
                </Field>
                {form.billing_cycle === "custom" && <Field className="gap-1.5">
                  <FieldLabel htmlFor="plan-duration">Validity (days)</FieldLabel>
                  <Input id="plan-duration" type="number" min="1" step="1" value={form.duration_days} onChange={(event) => updateField("duration_days", event.target.value)} required />
                </Field>}
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="plan-limit">Properties allowed</FieldLabel>
                  <Input id="plan-limit" type="number" min="0" step="1" value={form.plan_code === "free" ? "" : form.publishing_limit} onChange={(event) => updateField("publishing_limit", event.target.value)} disabled={form.plan_code === "free"} placeholder={form.plan_code === "free" ? "Set per agent" : "Configure limit"} />
                </Field>
              </FieldGroup>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="plan-benefits">Benefits (one per line)</FieldLabel>
                <Textarea id="plan-benefits" value={form.benefits} onChange={(event) => updateField("benefits", event.target.value)} rows={4} placeholder="Priority listing review\nDedicated support" />
              </Field>
              <FieldGroup className="grid gap-3 sm:grid-cols-2">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="plan-status">Status</FieldLabel>
                  <Select value={form.status} onValueChange={(value) => updateField("status", value)}>
                    <SelectTrigger id="plan-status"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectGroup><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectGroup></SelectContent>
                  </Select>
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="plan-order">Display order</FieldLabel>
                  <Input id="plan-order" type="number" step="1" value={form.display_order} onChange={(event) => updateField("display_order", event.target.value)} />
                </Field>
              </FieldGroup>
              <FieldSet className="grid gap-2 sm:grid-cols-2">
                <FieldLegend className="sr-only">Plan options</FieldLegend>
                <Field orientation="horizontal" className="min-h-11 items-center gap-2 rounded-lg border border-border px-3">
                  <Checkbox id="plan-featured" checked={form.featured} onCheckedChange={(checked) => updateField("featured", checked === true)} />
                  <FieldLabel htmlFor="plan-featured">Recommended plan</FieldLabel>
                </Field>
                <Field orientation="horizontal" className="min-h-11 items-center gap-2 rounded-lg border border-border px-3">
                  <Checkbox id="plan-purchase-enabled" checked={form.purchase_enabled} onCheckedChange={(checked) => updateField("purchase_enabled", checked === true)} disabled={form.plan_code === "free"} />
                  <FieldLabel htmlFor="plan-purchase-enabled">Available for purchase after payment setup</FieldLabel>
                </Field>
                <Field orientation="horizontal" className="min-h-11 items-center gap-2 rounded-lg border border-border px-3 sm:col-span-2">
                  <Checkbox id="plan-refund-on-unpublish" checked={form.refund_on_unpublish} onCheckedChange={(checked) => updateField("refund_on_unpublish", checked === true)} />
                  <FieldLabel htmlFor="plan-refund-on-unpublish">Refund one credit when a published listing is unpublished or removed</FieldLabel>
                </Field>
              </FieldSet>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save plan"}</Button>
              </DialogFooter>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

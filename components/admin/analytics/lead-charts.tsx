"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface FunnelDatum {
  status: string
  label: string
  count: number
}
interface TrendDatum {
  month: string
  label: string
  leads: number
  converted: number
}
interface SourceDatum {
  source: string
  label: string
  count: number
}
interface PriorityDatum {
  priority: string
  label: string
  count: number
}

const FUNNEL_COLORS: Record<string, string> = {
  new: "var(--chart-1)",
  contacted: "var(--chart-2)",
  qualified: "var(--chart-3)",
  converted: "var(--chart-4)",
  lost: "var(--chart-5)",
}

// ---------- Lead Funnel (horizontal bars) ----------
export function LeadFunnelChart({ data }: { data: FunnelDatum[] }) {
  const config: ChartConfig = {
    count: { label: "Leads" },
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Funnel</CardTitle>
        <CardDescription>Leads by pipeline stage</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[280px] w-full">
          <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 8, right: 32 }}>
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              axisLine={false}
              width={80}
              tick={{ fontSize: 12 }}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={4}>
              {data.map((d) => (
                <Cell key={d.status} fill={FUNNEL_COLORS[d.status] || "var(--chart-1)"} />
              ))}
              <LabelList dataKey="count" position="right" className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// ---------- Leads over time (area) ----------
export function LeadsTrendChart({ data }: { data: TrendDatum[] }) {
  const config: ChartConfig = {
    leads: { label: "Total Leads", color: "var(--chart-1)" },
    converted: { label: "Converted", color: "var(--chart-3)" },
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads Over Time</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[280px] w-full">
          <AreaChart accessibilityLayer data={data} margin={{ left: 8, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} width={32} tick={{ fontSize: 12 }} allowDecimals={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <defs>
              <linearGradient id="fillLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-leads)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="var(--color-leads)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillConverted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-converted)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="var(--color-converted)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="leads"
              type="monotone"
              fill="url(#fillLeads)"
              stroke="var(--color-leads)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="converted"
              type="monotone"
              fill="url(#fillConverted)"
              stroke="var(--color-converted)"
              strokeWidth={2}
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// ---------- Leads by source (donut) ----------
export function LeadSourceChart({ data }: { data: SourceDatum[] }) {
  const config: ChartConfig = data.reduce((acc, d, i) => {
    acc[d.source] = { label: d.label, color: `var(--chart-${(i % 5) + 1})` }
    return acc
  }, {} as ChartConfig)

  const chartData = data.map((d, i) => ({
    ...d,
    fill: `var(--chart-${(i % 5) + 1})`,
  }))

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Leads by Source</CardTitle>
        <CardDescription>Where leads originate</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">No lead data yet</p>
        ) : (
          <ChartContainer config={config} className="mx-auto aspect-square max-h-[280px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="label" hideLabel />} />
              <Pie data={chartData} dataKey="count" nameKey="label" innerRadius={55} strokeWidth={4}>
                {chartData.map((d) => (
                  <Cell key={d.source} fill={d.fill} />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="label" />}
                className="-translate-y-1 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

// ---------- Leads by priority (vertical bars) ----------
export function LeadPriorityChart({ data }: { data: PriorityDatum[] }) {
  const config: ChartConfig = {
    count: { label: "Leads", color: "var(--chart-2)" },
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads by Priority</CardTitle>
        <CardDescription>Distribution across priority levels</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[280px] w-full">
          <BarChart accessibilityLayer data={data} margin={{ top: 16 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} width={32} tick={{ fontSize: 12 }} allowDecimals={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={6}>
              <LabelList dataKey="count" position="top" className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, Pie, PieChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface TypeDatum {
  type: string
  label: string
  count: number
}
interface StatusDatum {
  status: string
  label: string
  count: number
}
interface CityDatum {
  city: string
  count: number
}

// ---------- Listings by property type (vertical bars) ----------
export function ListingTypeChart({ data }: { data: TypeDatum[] }) {
  const config: ChartConfig = {
    count: { label: "Listings", color: "var(--chart-1)" },
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Listings by Type</CardTitle>
        <CardDescription>Property type distribution</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">No listings yet</p>
        ) : (
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
        )}
      </CardContent>
    </Card>
  )
}

// ---------- Listings by status (donut) ----------
export function ListingStatusChart({ data }: { data: StatusDatum[] }) {
  const config: ChartConfig = data.reduce((acc, d, i) => {
    acc[d.status] = { label: d.label, color: `var(--chart-${(i % 5) + 1})` }
    return acc
  }, {} as ChartConfig)

  const chartData = data.map((d, i) => ({ ...d, fill: `var(--chart-${(i % 5) + 1})` }))

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Listings by Status</CardTitle>
        <CardDescription>Publication status breakdown</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">No listings yet</p>
        ) : (
          <ChartContainer config={config} className="mx-auto aspect-square max-h-[280px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="label" hideLabel />} />
              <Pie data={chartData} dataKey="count" nameKey="label" innerRadius={55} strokeWidth={4}>
                {chartData.map((d) => (
                  <Cell key={d.status} fill={d.fill} />
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

// ---------- Top cities (horizontal bars) ----------
export function TopCitiesChart({ data }: { data: CityDatum[] }) {
  const config: ChartConfig = {
    count: { label: "Listings", color: "var(--chart-4)" },
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Cities</CardTitle>
        <CardDescription>Listings by location</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">No location data yet</p>
        ) : (
          <ChartContainer config={config} className="h-[280px] w-full">
            <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 8, right: 32 }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="city"
                type="category"
                tickLine={false}
                axisLine={false}
                width={90}
                tick={{ fontSize: 12 }}
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={4}>
                <LabelList dataKey="count" position="right" className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

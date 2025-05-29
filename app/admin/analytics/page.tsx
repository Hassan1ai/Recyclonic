"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowUp,
  ArrowDown,
  Download,
  Calendar,
  MoreHorizontal,
  Recycle,
  Leaf,
  ShoppingCart,
  Users,
  Package,
  Truck,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Chart component (simplified for this example)
const Chart = ({ data, title, type = "bar" }: { data: number[]; title: string; type?: "bar" | "line" }) => {
  const max = Math.max(...data)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">{title}</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Download Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-end gap-1 h-[180px]">
        {data.map((value, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm transition-colors ${
              type === "bar" ? "bg-primary/20 hover:bg-primary/30" : ""
            }`}
            style={{
              height: `${(value / max) * 100}%`,
              ...(type === "line" && i > 0
                ? {
                    borderTop: "2px solid var(--primary)",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    backgroundColor: "transparent",
                  }
                : {}),
            }}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <div>Jan</div>
        <div>Feb</div>
        <div>Mar</div>
        <div>Apr</div>
        <div>May</div>
        <div>Jun</div>
        <div>Jul</div>
        <div>Aug</div>
        <div>Sep</div>
        <div>Oct</div>
        <div>Nov</div>
        <div>Dec</div>
      </div>
    </div>
  )
}

// Metric card component
const MetricCard = ({
  title,
  value,
  trend,
  trendValue,
  icon,
}: {
  title: string
  value: string
  trend: "up" | "down" | "none"
  trendValue?: string
  icon: React.ReactNode
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium leading-none text-muted-foreground">{title}</span>
            <span className="text-2xl font-bold">{value}</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            {icon}
          </div>
        </div>
        {trend !== "none" && trendValue && (
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            {trend === "up" ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-600 dark:text-red-400" />
            )}
            <span
              className={`font-medium ${
                trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {trendValue}
            </span>
            <span className="ml-1">vs. previous period</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [year, setYear] = useState("2023")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue={timeRange} onValueChange={(value) => setTimeRange(value)}>
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download report</span>
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
            <span className="sr-only">Date range</span>
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Sales"
          value="189,450 EGP"
          trend="up"
          trendValue="+15.3%"
          icon={<ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <MetricCard
          title="Total Orders"
          value="845"
          trend="up"
          trendValue="+12.5%"
          icon={<Package className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <MetricCard
          title="Total Users"
          value="3,257"
          trend="up"
          trendValue="+7.2%"
          icon={<Users className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <MetricCard
          title="Pickup Requests"
          value="432"
          trend="up"
          trendValue="+18.4%"
          icon={<Truck className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
      </div>

      {/* Sales & Orders Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales data for {year}</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              data={[12500, 15800, 18200, 22400, 19600, 24100, 28500, 32100, 29800, 34200, 31500, 38000]}
              title="Monthly Sales (EGP)"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders Trend</CardTitle>
            <CardDescription>Monthly order count for {year}</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={[45, 62, 75, 85, 72, 95, 110, 125, 115, 130, 120, 145]} title="Number of Orders" />
          </CardContent>
        </Card>
      </div>

      {/* Environmental Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact</CardTitle>
          <CardDescription>Overview of environmental impact metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Recycle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium">E-Waste Collected</span>
                  </div>
                  <span className="text-sm font-medium">5,280 kg</span>
                </div>
                <Progress value={78} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 kg</span>
                  <span>Annual Target: 6,800 kg</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium">E-Waste Recycled</span>
                  </div>
                  <span className="text-sm font-medium">4,150 kg</span>
                </div>
                <Progress value={83} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 kg</span>
                  <span>Annual Target: 5,000 kg</span>
                </div>
              </div>
            </div>
            <Chart
              data={[250, 320, 420, 390, 480, 530, 580, 620, 670, 640, 680, 700]}
              title="Monthly E-Waste Collection (kg)"
              type="line"
            />
          </div>
        </CardContent>
      </Card>

      {/* Product & User Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling products for {year}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Refurbished Dell Laptop", category: "Laptops", sales: 58, amount: 394400 },
                { name: "iPhone 11 Screen", category: "Phone Parts", sales: 124, amount: 148800 },
                { name: "HP Monitor 24-inch", category: "Monitors", sales: 45, amount: 99000 },
                { name: "MacBook Pro Keyboard", category: "Laptop Parts", sales: 52, amount: 78000 },
                { name: "Wireless Mouse", category: "Accessories", sales: 180, amount: 63000 },
              ].map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.amount.toLocaleString()} EGP</p>
                    <p className="text-sm text-muted-foreground">{product.sales} units</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
            <CardDescription>User distribution by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { region: "Cairo", users: 1850, percentage: 56.8 },
                { region: "Alexandria", users: 520, percentage: 16.0 },
                { region: "Giza", users: 380, percentage: 11.7 },
                { region: "Sharm El-Sheikh", users: 150, percentage: 4.6 },
                { region: "Other Regions", users: 357, percentage: 10.9 },
              ].map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{region.region}</span>
                    <span className="text-sm text-muted-foreground">
                      {region.users} users ({region.percentage}%)
                    </span>
                  </div>
                  <Progress value={region.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key metrics overview for {year}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold mb-2">Sales</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-xl font-bold">189,450 EGP</p>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <ArrowUp className="h-3 w-3 mr-1" /> 15.3% vs last year
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                  <p className="text-xl font-bold">2,240 EGP</p>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <ArrowUp className="h-3 w-3 mr-1" /> 5.8% vs last year
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">User Growth</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">New Users</p>
                  <p className="text-xl font-bold">1,240</p>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <ArrowUp className="h-3 w-3 mr-1" /> 12.5% vs last year
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Repeat Customers</p>
                  <p className="text-xl font-bold">65%</p>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <ArrowUp className="h-3 w-3 mr-1" /> 8.3% vs last year
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">E-Waste Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">CO₂ Reduced</p>
                  <p className="text-xl font-bold">3,200 kg</p>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <ArrowUp className="h-3 w-3 mr-1" /> 22.1% vs last year
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Devices Saved</p>
                  <p className="text-xl font-bold">1,250</p>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <ArrowUp className="h-3 w-3 mr-1" /> 18.6% vs last year
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

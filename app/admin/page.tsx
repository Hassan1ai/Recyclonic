"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  Users,
  Package,
  ShoppingCart,
  Truck,
  Leaf,
  Recycle,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// Chart component (simplified for this example)
const Chart = ({ data, title }: { data: number[]; title: string }) => {
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
      <div className="flex items-end gap-1 h-[80px]">
        {data.map((value, i) => (
          <div
            key={i}
            className="flex-1 bg-primary/20 rounded-sm hover:bg-primary/30 transition-colors"
            style={{ height: `${(value / max) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue={timeRange} onValueChange={(value) => setTimeRange(value)}>
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium leading-none text-muted-foreground">Total Users</span>
                <span className="text-2xl font-bold">3,257</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUp className="mr-1 h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-600 dark:text-green-400">+12%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium leading-none text-muted-foreground">Total Products</span>
                <span className="text-2xl font-bold">1,324</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUp className="mr-1 h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-600 dark:text-green-400">+8%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium leading-none text-muted-foreground">Total Orders</span>
                <span className="text-2xl font-bold">845</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <ShoppingCart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowDown className="mr-1 h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="font-medium text-red-600 dark:text-red-400">-3%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium leading-none text-muted-foreground">Pickup Requests</span>
                <span className="text-2xl font-bold">432</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                <Truck className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUp className="mr-1 h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-600 dark:text-green-400">+18%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Impact */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
            <CardDescription>Overview of e-waste collection and recycling metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
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
                  <span>Target: 6,800 kg</span>
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
                  <span>Target: 5,000 kg</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium">Devices Refurbished</span>
                  </div>
                  <span className="text-sm font-medium">1,250 units</span>
                </div>
                <Progress value={62} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 units</span>
                  <span>Target: 2,000 units</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>CO₂ Emissions Reduced</CardTitle>
            <CardDescription>Estimated environmental impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[220px]">
              <div className="text-5xl font-bold text-green-600 dark:text-green-400">3,200</div>
              <div className="text-sm text-muted-foreground mt-2">kg of CO₂</div>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Equivalent to planting approximately 160 trees
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
            <CardDescription>Overview of sales for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={[12500, 18200, 15800, 22400, 19600, 24100, 16500]} title="Sales (EGP)" />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Pickup Requests</CardTitle>
            <CardDescription>Weekly pickup request volume</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={[24, 32, 28, 41, 35, 22, 18]} title="Number of Requests" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest orders and pickup requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {[
              {
                id: "ORD-7829",
                type: "order",
                customer: "Ahmed Hassan",
                amount: "1,250 EGP",
                status: "Delivered",
                date: "2 hours ago",
              },
              {
                id: "REQ-4532",
                type: "pickup",
                customer: "Nour Ibrahim",
                device: "iPhone 11",
                status: "Scheduled",
                date: "3 hours ago",
              },
              {
                id: "ORD-7830",
                type: "order",
                customer: "Mohamed Ali",
                amount: "3,450 EGP",
                status: "Processing",
                date: "5 hours ago",
              },
              {
                id: "REQ-4533",
                type: "pickup",
                customer: "Laila Ahmed",
                device: "Dell Laptop",
                status: "Completed",
                date: "Yesterday",
              },
              {
                id: "ORD-7831",
                type: "order",
                customer: "Omar Farid",
                amount: "780 EGP",
                status: "Shipped",
                date: "Yesterday",
              },
            ].map((activity) => (
              <div key={activity.id} className="flex items-center">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      activity.type === "order" ? "bg-blue-100 dark:bg-blue-900" : "bg-amber-100 dark:bg-amber-900"
                    }`}
                  >
                    {activity.type === "order" ? (
                      <ShoppingCart className={`h-5 w-5 text-blue-600 dark:text-blue-400`} />
                    ) : (
                      <Truck className={`h-5 w-5 text-amber-600 dark:text-amber-400`} />
                    )}
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.id} - {activity.customer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.type === "order" ? `Order amount: ${activity.amount}` : `Device: ${activity.device}`}
                    </p>
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      activity.status === "Delivered" || activity.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : activity.status === "Shipped" || activity.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                    }`}
                  >
                    {activity.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-end">
            <Button variant="outline" size="sm" className="gap-1">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

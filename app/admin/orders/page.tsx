"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, MoreHorizontal, ExternalLink, FileText, Truck } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Sample order data
const orders = [
  {
    id: "ORD-7829",
    customer: "Ahmed Hassan",
    email: "ahmed.h@example.com",
    date: "2023-05-20",
    status: "Delivered",
    items: [
      {
        id: 1,
        name: "iPhone 11 Screen",
        price: 1200,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=600&auto=format&fit=crop",
      },
    ],
    total: 1200,
    address: "123 Main St, Cairo, Egypt",
    phone: "+20 123 456 7890",
  },
  {
    id: "ORD-7830",
    customer: "Nour Ibrahim",
    email: "nour@example.com",
    date: "2023-05-19",
    status: "Processing",
    items: [
      {
        id: 3,
        name: "Refurbished Dell Laptop",
        price: 6800,
        quantity: 1,
        image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: 4,
        name: "Type-C Charger Cable",
        price: 80,
        quantity: 2,
        image: "https://images.pexels.com/photos/4219863/pexels-photo-4219863.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    total: 6960,
    address: "456 Oak St, Cairo, Egypt",
    phone: "+20 123 456 7891",
  },
  {
    id: "ORD-7831",
    customer: "Mohamed Ali",
    email: "mohamed@example.com",
    date: "2023-05-18",
    status: "Shipped",
    items: [
      {
        id: 6,
        name: "Wireless Mouse",
        price: 350,
        quantity: 1,
        image: "https://images.pexels.com/photos/5082577/pexels-photo-5082577.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    total: 350,
    address: "789 Elm St, Alexandria, Egypt",
    phone: "+20 123 456 7892",
  },
  {
    id: "ORD-7832",
    customer: "Sara Mahmoud",
    email: "sara@example.com",
    date: "2023-05-17",
    status: "Delivered",
    items: [
      {
        id: 7,
        name: "HP Monitor 24-inch",
        price: 2200,
        quantity: 1,
        image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    total: 2200,
    address: "101 Pine St, Cairo, Egypt",
    phone: "+20 123 456 7893",
  },
  {
    id: "ORD-7833",
    customer: "Khaled Omar",
    email: "khaled@example.com",
    date: "2023-05-16",
    status: "Cancelled",
    items: [
      {
        id: 5,
        name: "MacBook Pro Keyboard",
        price: 1500,
        quantity: 1,
        image: "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    total: 1500,
    address: "202 Cedar St, Giza, Egypt",
    phone: "+20 123 456 7894",
  },
]

export default function OrdersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [orderDetails, setOrderDetails] = useState<(typeof orders)[0] | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "all" || order.status === statusFilter) &&
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    }
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been updated to ${newStatus}.`,
    })
  }

  const viewOrderDetails = (order: (typeof orders)[0]) => {
    setOrderDetails(order)
    setShowOrderDetails(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 border-yellow-200 dark:border-yellow-800"
          >
            Processing
          </Badge>
        )
      case "Shipped":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800"
          >
            Shipped
          </Badge>
        )
      case "Delivered":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-800"
          >
            Delivered
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border-red-200 dark:border-red-800"
          >
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Truck className="mr-2 h-4 w-4" /> Ship Selected
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="total-high">Total: High to Low</SelectItem>
                  <SelectItem value="total-low">Total: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all orders"
                    />
                  </TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={() => toggleOrderSelection(order.id)}
                          aria-label={`Select order ${order.id}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.email}</div>
                      </TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right font-medium">{order.total.toLocaleString()} EGP</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => viewOrderDetails(order)}>
                              <ExternalLink className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "Processing")}
                              disabled={order.status === "Processing"}
                            >
                              Mark as Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "Shipped")}
                              disabled={order.status === "Shipped"}
                            >
                              Mark as Shipped
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "Delivered")}
                              disabled={order.status === "Delivered"}
                            >
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "Cancelled")}
                              disabled={order.status === "Cancelled"}
                            >
                              Mark as Cancelled
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Order Details - {orderDetails?.id}</DialogTitle>
            <DialogDescription>
              Placed on {orderDetails && new Date(orderDetails.date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {orderDetails && (
            <div className="grid gap-6 py-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {orderDetails.customer}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {orderDetails.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {orderDetails.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p className="text-sm">{orderDetails.address}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="border rounded-md divide-y">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex items-center p-3 gap-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.price.toLocaleString()} EGP × {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium">{(item.price * item.quantity).toLocaleString()} EGP</div>
                    </div>
                  ))}
                  <div className="p-3 text-right">
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="font-bold text-lg">{orderDetails.total.toLocaleString()} EGP</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                {getStatusBadge(orderDetails.status)}
              </div>
            </div>
          )}

          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button variant="outline" onClick={() => setShowOrderDetails(false)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">Print Invoice</Button>
                <Button className="bg-green-600 hover:bg-green-700">Update Status</Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

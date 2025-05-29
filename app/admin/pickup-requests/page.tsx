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
import { Search, Filter, MoreHorizontal, Calendar, ExternalLink, MapPin } from "lucide-react"
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

// Sample pickup request data
const pickupRequests = [
  {
    id: "REQ-4532",
    customer: "Nour Ibrahim",
    email: "nour@example.com",
    phone: "+20 123 456 7891",
    date: "2023-05-19",
    pickupDate: "2023-05-22",
    status: "Scheduled",
    device: {
      type: "Smartphone",
      model: "iPhone 11",
      condition: "Working with minor issues",
      description: "Screen has minor scratches, battery drains quickly",
    },
    address: "456 Oak St, Cairo, Egypt",
    images: [
      "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
  {
    id: "REQ-4533",
    customer: "Laila Ahmed",
    email: "laila@example.com",
    phone: "+20 123 456 7893",
    date: "2023-05-17",
    pickupDate: "2023-05-18",
    status: "Collected",
    device: {
      type: "Laptop",
      model: "Dell XPS 13",
      condition: "Not working",
      description: "Does not power on, possibly motherboard issue",
    },
    address: "101 Pine St, Cairo, Egypt",
    images: [
      "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
  {
    id: "REQ-4534",
    customer: "Omar Farid",
    email: "omar@example.com",
    phone: "+20 123 456 7894",
    date: "2023-05-16",
    pickupDate: "2023-05-19",
    status: "Cancelled",
    device: {
      type: "Monitor",
      model: "Samsung 27-inch",
      condition: "Working with major issues",
      description: "Display has vertical lines, colors are distorted",
    },
    address: "202 Cedar St, Giza, Egypt",
    images: [
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
  {
    id: "REQ-4535",
    customer: "Hossam Mahmoud",
    email: "hossam@example.com",
    phone: "+20 123 456 7895",
    date: "2023-05-20",
    pickupDate: "",
    status: "Pending",
    device: {
      type: "Computer",
      model: "HP Desktop",
      condition: "Working perfectly",
      description: "Working perfectly but I want to upgrade to a newer model",
    },
    address: "303 Maple St, Alexandria, Egypt",
    images: [
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/3520694/pexels-photo-3520694.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
  {
    id: "REQ-4536",
    customer: "Amira Hassan",
    email: "amira@example.com",
    phone: "+20 123 456 7896",
    date: "2023-05-21",
    pickupDate: "2023-05-23",
    status: "Scheduled",
    device: {
      type: "Camera",
      model: "Canon EOS 700D",
      condition: "Working with minor issues",
      description: "Autofocus not working properly, otherwise in good condition",
    },
    address: "404 Birch St, Cairo, Egypt",
    images: [
      "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
]

export default function PickupRequestsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [requestDetails, setRequestDetails] = useState<(typeof pickupRequests)[0] | null>(null)
  const [showRequestDetails, setShowRequestDetails] = useState(false)

  const filteredRequests = pickupRequests.filter(
    (request) =>
      (statusFilter === "all" || request.status === statusFilter) &&
      (request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.device.model.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const toggleRequestSelection = (requestId: string) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId) ? prev.filter((id) => id !== requestId) : [...prev, requestId],
    )
  }

  const toggleSelectAll = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([])
    } else {
      setSelectedRequests(filteredRequests.map((request) => request.id))
    }
  }

  const handleStatusChange = (requestId: string, newStatus: string) => {
    toast({
      title: "Request Status Updated",
      description: `Request ${requestId} has been updated to ${newStatus}.`,
    })
  }

  const schedulePickup = (requestId: string) => {
    toast({
      title: "Pickup Scheduled",
      description: `A pickup has been scheduled for request ${requestId}.`,
    })
  }

  const viewRequestDetails = (request: (typeof pickupRequests)[0]) => {
    setRequestDetails(request)
    setShowRequestDetails(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 border-yellow-200 dark:border-yellow-800"
          >
            Pending
          </Badge>
        )
      case "Scheduled":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800"
          >
            Scheduled
          </Badge>
        )
      case "Collected":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-800"
          >
            Collected
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
        <h2 className="text-3xl font-bold tracking-tight">Pickup Requests</h2>
        <div className="flex items-center gap-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <Calendar className="mr-2 h-4 w-4" /> Schedule Selected
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
                  placeholder="Search requests..."
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
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Collected">Collected</SelectItem>
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
                  <SelectItem value="upcoming">Upcoming Pickups</SelectItem>
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
                      checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all requests"
                    />
                  </TableHead>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Pickup Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No pickup requests found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRequests.includes(request.id)}
                          onCheckedChange={() => toggleRequestSelection(request.id)}
                          aria-label={`Select request ${request.id}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div>{request.customer}</div>
                        <div className="text-sm text-muted-foreground">{request.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div>{request.device.model}</div>
                        <div className="text-sm text-muted-foreground">{request.device.type}</div>
                      </TableCell>
                      <TableCell>
                        {request.pickupDate ? (
                          new Date(request.pickupDate).toLocaleDateString()
                        ) : (
                          <span className="text-muted-foreground">Not scheduled</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => viewRequestDetails(request)}>
                              <ExternalLink className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {request.status === "Pending" && (
                              <DropdownMenuItem onClick={() => schedulePickup(request.id)}>
                                <Calendar className="mr-2 h-4 w-4" /> Schedule Pickup
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(request.id, "Pending")}
                              disabled={request.status === "Pending"}
                            >
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(request.id, "Scheduled")}
                              disabled={request.status === "Scheduled"}
                            >
                              Mark as Scheduled
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(request.id, "Collected")}
                              disabled={request.status === "Collected"}
                            >
                              Mark as Collected
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(request.id, "Cancelled")}
                              disabled={request.status === "Cancelled"}
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

      {/* Request Details Dialog */}
      <Dialog open={showRequestDetails} onOpenChange={setShowRequestDetails}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Pickup Request Details - {requestDetails?.id}</DialogTitle>
            <DialogDescription>
              Submitted on {requestDetails && new Date(requestDetails.date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {requestDetails && (
            <div className="grid gap-6 py-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {requestDetails.customer}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {requestDetails.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {requestDetails.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Pickup Address</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <p className="text-sm">{requestDetails.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Device Information</h3>
                <div className="space-y-1 text-sm p-4 border rounded-md bg-muted/20">
                  <p>
                    <span className="font-medium">Type:</span> {requestDetails.device.type}
                  </p>
                  <p>
                    <span className="font-medium">Model:</span> {requestDetails.device.model}
                  </p>
                  <p>
                    <span className="font-medium">Condition:</span> {requestDetails.device.condition}
                  </p>
                  <p>
                    <span className="font-medium">Description:</span> {requestDetails.device.description}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Device Images</h3>
                <div className="grid grid-cols-3 gap-4">
                  {requestDetails.images.map((image, index) => (
                    <div key={index} className="relative aspect-square border rounded-md overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${requestDetails.device.model} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                {getStatusBadge(requestDetails.status)}
                {requestDetails.pickupDate && (
                  <span className="text-sm ml-4">
                    <span className="font-medium">Pickup scheduled for:</span>{" "}
                    {new Date(requestDetails.pickupDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button variant="outline" onClick={() => setShowRequestDetails(false)}>
                Close
              </Button>
              <div className="flex gap-2">
                {requestDetails?.status === "Pending" ? (
                  <Button className="bg-green-600 hover:bg-green-700" onClick={() => schedulePickup(requestDetails.id)}>
                    Schedule Pickup
                  </Button>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700">Update Status</Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

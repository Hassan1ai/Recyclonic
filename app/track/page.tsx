"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Package, Truck, CheckCircle, Clock, Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import RTLProvider from "@/components/rtl-provider"

export default function TrackPage() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [orderId, setOrderId] = useState("")
  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState<null | {
    id: string
    type: "order" | "pickup"
    status: "processing" | "shipped" | "delivered" | "pending" | "approved" | "collected"
    date: string
    estimatedDelivery?: string
    items?: { name: string; quantity: number }[]
    device?: { type: string; model: string }
    address: string
    trackingNumber?: string
  }>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)

      if (orderId.startsWith("ORD-")) {
        // Order tracking
        setOrderData({
          id: orderId,
          type: "order",
          status: "shipped",
          date: "2023-05-15",
          estimatedDelivery: "2023-05-18",
          items: [
            { name: "iPhone 11 Screen", quantity: 1 },
            { name: "Type-C Charger Cable", quantity: 2 },
          ],
          address: "123 Main St, Cairo, Egypt",
          trackingNumber: "TRK-" + Math.floor(100000 + Math.random() * 900000),
        })
      } else if (orderId.startsWith("REQ-")) {
        // Pickup request tracking
        setOrderData({
          id: orderId,
          type: "pickup",
          status: "approved",
          date: "2023-05-14",
          device: { type: "Smartphone", model: "Samsung Galaxy S10" },
          address: "456 Elm St, Cairo, Egypt",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Invalid ID",
          description: "Please enter a valid order ID (ORD-) or request ID (REQ-).",
        })
        setOrderData(null)
      }
    }, 1000)
  }

  const getStatusStep = (status: string) => {
    if (orderData?.type === "order") {
      return status === "processing" ? 1 : status === "shipped" ? 2 : status === "delivered" ? 3 : 0
    } else {
      return status === "pending" ? 1 : status === "approved" ? 2 : status === "collected" ? 3 : 0
    }
  }

  return (
    <RTLProvider>
      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{t("track.title")}</h1>
            <p className="text-muted-foreground">{t("track.description")}</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="order-id">{t("track.orderId")}</Label>
                    <Input
                      id="order-id"
                      placeholder={t("track.placeholder")}
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 mt-auto" disabled={loading}>
                    {loading ? t("track.searching") : t("track.button")}
                    {!loading && <Search className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>

              {orderData && (
                <div className="mt-8 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {orderData.type === "order" ? "Order" : "Pickup Request"} #{orderData.id}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(orderData.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          orderData.status === "delivered" || orderData.status === "collected"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : orderData.status === "shipped" || orderData.status === "approved"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        }`}
                      >
                        {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <Tabs defaultValue="status">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="status">{t("track.status")}</TabsTrigger>
                      <TabsTrigger value="details">{t("track.details")}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="status" className="mt-4">
                      <div className="relative">
                        <div className="absolute left-8 top-0 h-full w-0.5 bg-muted-foreground/20" />

                        {orderData.type === "order" ? (
                          <>
                            <div className="relative flex items-start gap-4 pb-8">
                              <div
                                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
                                  getStatusStep(orderData.status) >= 1 ? "bg-green-100 dark:bg-green-900" : "bg-muted"
                                }`}
                              >
                                <Package
                                  className={`h-8 w-8 ${
                                    getStatusStep(orderData.status) >= 1
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              </div>
                              <div className="pt-2">
                                <h3 className="font-semibold">Processing</h3>
                                <p className="text-sm text-muted-foreground">
                                  Your order has been received and is being processed
                                </p>
                                {orderData.status === "processing" && (
                                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                                    Current Status
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="relative flex items-start gap-4 pb-8">
                              <div
                                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
                                  getStatusStep(orderData.status) >= 2 ? "bg-green-100 dark:bg-green-900" : "bg-muted"
                                }`}
                              >
                                <Truck
                                  className={`h-8 w-8 ${
                                    getStatusStep(orderData.status) >= 2
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              </div>
                              <div className="pt-2">
                                <h3 className="font-semibold">Shipped</h3>
                                <p className="text-sm text-muted-foreground">Your order is on its way to you</p>
                                {orderData.status === "shipped" && (
                                  <>
                                    <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                                      Current Status
                                    </p>
                                    {orderData.trackingNumber && (
                                      <p className="text-sm mt-1">
                                        Tracking #: <span className="font-medium">{orderData.trackingNumber}</span>
                                      </p>
                                    )}
                                    {orderData.estimatedDelivery && (
                                      <p className="text-sm mt-1">
                                        Estimated delivery:{" "}
                                        <span className="font-medium">
                                          {new Date(orderData.estimatedDelivery).toLocaleDateString()}
                                        </span>
                                      </p>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="relative flex items-start gap-4">
                              <div
                                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
                                  getStatusStep(orderData.status) >= 3 ? "bg-green-100 dark:bg-green-900" : "bg-muted"
                                }`}
                              >
                                <CheckCircle
                                  className={`h-8 w-8 ${
                                    getStatusStep(orderData.status) >= 3
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              </div>
                              <div className="pt-2">
                                <h3 className="font-semibold">Delivered</h3>
                                <p className="text-sm text-muted-foreground">Your order has been delivered</p>
                                {orderData.status === "delivered" && (
                                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                                    Delivered on {new Date(orderData.estimatedDelivery || "").toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="relative flex items-start gap-4 pb-8">
                              <div
                                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
                                  getStatusStep(orderData.status) >= 1 ? "bg-green-100 dark:bg-green-900" : "bg-muted"
                                }`}
                              >
                                <Clock
                                  className={`h-8 w-8 ${
                                    getStatusStep(orderData.status) >= 1
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              </div>
                              <div className="pt-2">
                                <h3 className="font-semibold">Pending</h3>
                                <p className="text-sm text-muted-foreground">Your pickup request is being reviewed</p>
                                {orderData.status === "pending" && (
                                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                                    Current Status
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="relative flex items-start gap-4 pb-8">
                              <div
                                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
                                  getStatusStep(orderData.status) >= 2 ? "bg-green-100 dark:bg-green-900" : "bg-muted"
                                }`}
                              >
                                <Package
                                  className={`h-8 w-8 ${
                                    getStatusStep(orderData.status) >= 2
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              </div>
                              <div className="pt-2">
                                <h3 className="font-semibold">Approved</h3>
                                <p className="text-sm text-muted-foreground">
                                  Your request has been approved and scheduled for pickup
                                </p>
                                {orderData.status === "approved" && (
                                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                                    Current Status - Pickup scheduled for tomorrow
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="relative flex items-start gap-4">
                              <div
                                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
                                  getStatusStep(orderData.status) >= 3 ? "bg-green-100 dark:bg-green-900" : "bg-muted"
                                }`}
                              >
                                <CheckCircle
                                  className={`h-8 w-8 ${
                                    getStatusStep(orderData.status) >= 3
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              </div>
                              <div className="pt-2">
                                <h3 className="font-semibold">Collected</h3>
                                <p className="text-sm text-muted-foreground">
                                  Your device has been collected and is being processed
                                </p>
                                {orderData.status === "collected" && (
                                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                                    Collected on {new Date().toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="details" className="mt-4">
                      <div className="space-y-6">
                        {orderData.type === "order" ? (
                          <>
                            <div>
                              <h3 className="font-semibold mb-2">Items</h3>
                              <div className="space-y-2">
                                {orderData.items?.map((item, index) => (
                                  <div key={index} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span>x{item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <h3 className="font-semibold mb-2">Device Information</h3>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Type</span>
                                  <span>{orderData.device?.type}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Model</span>
                                  <span>{orderData.device?.model}</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        <div>
                          <h3 className="font-semibold mb-2">
                            {orderData.type === "order" ? "Shipping" : "Pickup"} Address
                          </h3>
                          <p className="text-muted-foreground">{orderData.address}</p>
                        </div>

                        {orderData.type === "order" && orderData.trackingNumber && (
                          <div>
                            <h3 className="font-semibold mb-2">Tracking Information</h3>
                            <p>
                              Tracking Number: <span className="font-medium">{orderData.trackingNumber}</span>
                            </p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Track with Courier
                            </Button>
                          </div>
                        )}

                        <div>
                          <h3 className="font-semibold mb-2">Need Help?</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            If you have any questions about your{" "}
                            {orderData.type === "order" ? "order" : "pickup request"}, please contact our customer
                            support.
                          </p>
                          <Button variant="outline" size="sm">
                            Contact Support
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </RTLProvider>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Truck, ShieldCheck, ChevronLeft, CreditCardIcon, Wallet, Clock } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  // Sample order summary
  const orderSummary = {
    subtotal: 8700,
    shipping: 0,
    discount: 0,
    total: 8700,
    items: 3,
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Order placed successfully",
        description: "Thank you for your order! You will receive a confirmation email shortly.",
      })
      router.push("/checkout/success")
    }, 2000)
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-green-600" /> Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Governorate</Label>
                      <Input id="state" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Postal Code</Label>
                      <Input id="zip" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCardIcon className="h-5 w-5 text-green-600" /> Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                      <TabsTrigger value="wallet">E-Wallet</TabsTrigger>
                      <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
                    </TabsList>
                    <TabsContent value="credit-card" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input id="card-name" required />
                      </div>
                    </TabsContent>
                    <TabsContent value="wallet" className="pt-4">
                      <div className="space-y-4">
                        <RadioGroup defaultValue="fawry">
                          <div className="flex items-center space-x-2 border p-4 rounded-md">
                            <RadioGroupItem value="fawry" id="fawry" />
                            <Label htmlFor="fawry" className="flex items-center gap-2">
                              <Wallet className="h-5 w-5 text-blue-500" /> Fawry
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border p-4 rounded-md">
                            <RadioGroupItem value="vodafone-cash" id="vodafone-cash" />
                            <Label htmlFor="vodafone-cash" className="flex items-center gap-2">
                              <Wallet className="h-5 w-5 text-red-500" /> Vodafone Cash
                            </Label>
                          </div>
                        </RadioGroup>
                        <div className="space-y-2">
                          <Label htmlFor="wallet-number">Wallet Number</Label>
                          <Input id="wallet-number" placeholder="01xxxxxxxxx" required />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="cod" className="pt-4">
                      <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md">
                        <div className="flex items-start gap-2">
                          <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-800 dark:text-yellow-300">
                              Cash on Delivery Information
                            </p>
                            <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                              Please have the exact amount ready at the time of delivery. Our delivery person will
                              provide a receipt upon payment.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/cart">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Cart
                  </Link>
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items ({orderSummary.items})</span>
                <span>{orderSummary.subtotal.toLocaleString()} EGP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{orderSummary.shipping === 0 ? "Free" : `${orderSummary.shipping.toLocaleString()} EGP`}</span>
              </div>
              {orderSummary.discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>-{orderSummary.discount.toLocaleString()} EGP</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{orderSummary.total.toLocaleString()} EGP</span>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping on orders over 5,000 EGP</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span>All products come with warranty</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Truck, CreditCard, ShieldCheck, Trash2, Plus, Minus } from "lucide-react"

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: "iPhone 11 Screen",
    price: 1200,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Iphone Xs",
    price: 450,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1512439408685-2e399291a4e6?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Type-C Charger Cable",
    price: 80,
    quantity: 1,
    image: "https://images.pexels.com/photos/4219863/pexels-photo-4219863.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 50 : 0
  const total = subtotal + shipping

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-32 h-32">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <CardContent className="flex-1 p-4 flex flex-col sm:flex-row justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-green-600 dark:text-green-400 font-medium">
                          {item.price.toLocaleString()} EGP
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 sm:mt-0">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Your cart is empty</h2>
                <p className="text-muted-foreground">Looks like you haven't added any items to your cart yet.</p>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/marketplace">Browse Marketplace</Link>
                </Button>
              </div>
            </Card>
          )}

          {cartItems.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 flex flex-col items-center text-center">
                <Truck className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over 2000 EGP</p>
              </Card>
              <Card className="p-4 flex flex-col items-center text-center">
                <CreditCard className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">Multiple payment options</p>
              </Card>
              <Card className="p-4 flex flex-col items-center text-center">
                <ShieldCheck className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium">Warranty</h3>
                <p className="text-sm text-muted-foreground">30-day warranty on all products</p>
              </Card>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subtotal.toLocaleString()} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping.toLocaleString()} EGP</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{total.toLocaleString()} EGP</span>
                </div>

                <div className="pt-4">
                  <label htmlFor="promo" className="block text-sm font-medium mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="promo"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => router.push("/checkout")}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

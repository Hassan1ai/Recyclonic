"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Wallet, ChevronLeft, ShieldCheck, Save } from "lucide-react"

type PaymentMethod = {
  id: string
  type: string
  last4?: string
  expiry?: string
  name?: string
  number?: string
  isDefault: boolean
}

function getIdFromPath() {
  if (typeof window !== 'undefined') {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[pathSegments.length - 1];
  }
  return '';
}

export default function PaymentMethodDetailsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Simulate fetching payment method details
  useEffect(() => {
    // This would be an API call in a real application
    const fetchPaymentMethod = () => {
      const id = getIdFromPath();
      
      // Check if it's a card or wallet based on ID prefix
      if (id.startsWith("card")) {
        setPaymentMethod({
          id: id,
          type: "visa",
          last4: "4242",
          expiry: "12/25",
          name: "John Doe",
          isDefault: true,
        })
      } else if (id.startsWith("wallet")) {
        setPaymentMethod({
          id: id,
          type: "fawry",
          number: "01012345678",
          isDefault: true,
        })
      } else {
        // Handle invalid ID
        toast({
          title: "Error",
          description: "Payment method not found",
          variant: "destructive",
        })
        router.push("/payment-methods")
      }
    }

    fetchPaymentMethod()
  }, [router, toast])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setIsEditing(false)
      toast({
        title: "Payment method updated",
        description: "Your payment method has been successfully updated.",
      })
    }, 1000)
  }

  if (!paymentMethod) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p>Loading payment method details...</p>
        </div>
      </div>
    )
  }

  const isCard = paymentMethod.id.startsWith("card")

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="mr-2">
          <Link href="/payment-methods">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">
          {isCard ? "Card Details" : "E-Wallet Details"}
        </h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isCard ? (
                <>
                  <CreditCard className="h-5 w-5 text-green-600" /> Credit/Debit Card
                </>
              ) : (
                <>
                  <Wallet className="h-5 w-5 text-green-600" /> E-Wallet
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave}>
              <div className="space-y-6">
                {/* Display current payment method info */}
                <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div
                    className={`rounded-md bg-white dark:bg-slate-800 p-2 ${!isCard && paymentMethod.type === "fawry" ? "text-blue-500" : !isCard ? "text-red-500" : "text-green-600"}`}
                  >
                    {isCard ? <CreditCard className="h-6 w-6" /> : <Wallet className="h-6 w-6" />}
                  </div>
                  <div>
                    <p className="font-medium">
                      {isCard
                        ? `${paymentMethod.type === "visa" ? "Visa" : "Mastercard"} •••• ${paymentMethod.last4}`
                        : `${paymentMethod.type === "fawry" ? "Fawry" : "Vodafone Cash"}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isCard
                        ? `Expires ${paymentMethod.expiry} • ${paymentMethod.name}`
                        : paymentMethod.number}
                    </p>
                    {paymentMethod.isDefault && (
                      <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Default
                      </span>
                    )}
                  </div>
                </div>

                {/* Edit form fields */}
                {isEditing ? (
                  <div className="space-y-4">
                    {isCard ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            defaultValue={paymentMethod.expiry}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input id="card-name" defaultValue={paymentMethod.name} required />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="wallet-number">Wallet Number</Label>
                        <Input
                          id="wallet-number"
                          defaultValue={paymentMethod.number}
                          placeholder="01xxxxxxxxx"
                          required
                        />
                      </div>
                    )}
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch id="make-default" defaultChecked={paymentMethod.isDefault} />
                      <Label htmlFor="make-default">Make default payment method</Label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Payment Details</h3>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Details
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {isCard ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Card Type</span>
                            <span>{paymentMethod.type === "visa" ? "Visa" : "Mastercard"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Card Number</span>
                            <span>•••• •••• •••• {paymentMethod.last4}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Expiry Date</span>
                            <span>{paymentMethod.expiry}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Name on Card</span>
                            <span>{paymentMethod.name}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Wallet Type</span>
                            <span>{paymentMethod.type === "fawry" ? "Fawry" : "Vodafone Cash"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Wallet Number</span>
                            <span>{paymentMethod.number}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Default Payment Method</span>
                        <span>{paymentMethod.isDefault ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                {isEditing && (
                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : (
                        <>
                          <Save className="mr-2 h-4 w-4" /> Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Security notice */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mt-6">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Secure Payment Processing</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your payment information is encrypted and securely stored. We never share your payment details with
                        sellers or third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
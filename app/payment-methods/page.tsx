"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Wallet, Plus, Trash2, Edit, ChevronLeft, ShieldCheck } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function PaymentMethodsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showAddCardDialog, setShowAddCardDialog] = useState(false)
  const [showAddWalletDialog, setShowAddWalletDialog] = useState(false)
  
  // Sample saved payment methods
  const [savedCards, setSavedCards] = useState([
    {
      id: "card1",
      type: "visa",
      last4: "4242",
      expiry: "12/25",
      name: "John Doe",
      isDefault: true,
    },
    {
      id: "card2",
      type: "mastercard",
      last4: "8888",
      expiry: "09/26",
      name: "John Doe",
      isDefault: false,
    },
  ])

  const [savedWallets, setSavedWallets] = useState([
    {
      id: "wallet1",
      type: "fawry",
      number: "01012345678",
      isDefault: true,
    },
  ])

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newCard = {
        id: `card${savedCards.length + 1}`,
        type: "visa",
        last4: "1234",
        expiry: "01/28",
        name: "John Doe",
        isDefault: false,
      }

      setSavedCards([...savedCards, newCard])
      setLoading(false)
      setShowAddCardDialog(false)
      toast({
        title: "Card added successfully",
        description: "Your new payment method has been added.",
      })
    }, 1000)
  }

  const handleAddWallet = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newWallet = {
        id: `wallet${savedWallets.length + 1}`,
        type: "vodafone-cash",
        number: "01098765432",
        isDefault: false,
      }

      setSavedWallets([...savedWallets, newWallet])
      setLoading(false)
      setShowAddWalletDialog(false)
      toast({
        title: "Wallet added successfully",
        description: "Your new payment method has been added.",
      })
    }, 1000)
  }

  const handleDeleteCard = (id: string) => {
    setSavedCards(savedCards.filter((card) => card.id !== id))
    toast({
      title: "Card removed",
      description: "The payment method has been removed from your account.",
    })
  }

  const handleDeleteWallet = (id: string) => {
    setSavedWallets(savedWallets.filter((wallet) => wallet.id !== id))
    toast({
      title: "Wallet removed",
      description: "The payment method has been removed from your account.",
    })
  }

  const handleSetDefaultCard = (id: string) => {
    setSavedCards(
      savedCards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    )
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    })
  }

  const handleSetDefaultWallet = (id: string) => {
    setSavedWallets(
      savedWallets.map((wallet) => ({
        ...wallet,
        isDefault: wallet.id === id,
      }))
    )
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    })
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="mr-2">
          <Link href="/profile">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Payment Methods</h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="cards" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Credit/Debit Cards
            </TabsTrigger>
            <TabsTrigger value="wallets" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" /> E-Wallets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Saved Cards</h2>
              <Dialog open={showAddCardDialog} onOpenChange={setShowAddCardDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" /> Add New Card
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Card</DialogTitle>
                    <DialogDescription>
                      Add a new credit or debit card to your account.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddCard}>
                    <div className="space-y-4 py-4">
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
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch id="make-default" />
                        <Label htmlFor="make-default">Make default payment method</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setShowAddCardDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                        {loading ? "Adding..." : "Add Card"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {savedCards.length > 0 ? (
              <div className="space-y-4">
                {savedCards.map((card) => (
                  <Card key={card.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div className="rounded-md bg-slate-100 dark:bg-slate-800 p-2">
                            <CreditCard className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {card.type === "visa" ? "Visa" : "Mastercard"} •••• {card.last4}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Expires {card.expiry} • {card.name}
                            </p>
                            {card.isDefault && (
                              <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!card.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefaultCard(card.id)}
                            >
                              Set as Default
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteCard(card.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">You don't have any saved cards yet.</p>
                </CardContent>
              </Card>
            )}

            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Secure Payment Processing</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your payment information is encrypted and securely stored. We never share your card details with
                    sellers or third parties.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wallets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Saved E-Wallets</h2>
              <Dialog open={showAddWalletDialog} onOpenChange={setShowAddWalletDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" /> Add New Wallet
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New E-Wallet</DialogTitle>
                    <DialogDescription>Add a new e-wallet to your account.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddWallet}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-4">
                        <Label>Wallet Type</Label>
                        <RadioGroup defaultValue="fawry">
                          <div className="flex items-center space-x-2 border p-4 rounded-md">
                            <RadioGroupItem value="fawry" id="add-fawry" />
                            <Label htmlFor="add-fawry" className="flex items-center gap-2">
                              <Wallet className="h-5 w-5 text-blue-500" /> Fawry
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border p-4 rounded-md">
                            <RadioGroupItem value="vodafone-cash" id="add-vodafone-cash" />
                            <Label htmlFor="add-vodafone-cash" className="flex items-center gap-2">
                              <Wallet className="h-5 w-5 text-red-500" /> Vodafone Cash
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wallet-number">Wallet Number</Label>
                        <Input id="wallet-number" placeholder="01xxxxxxxxx" required />
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch id="make-default-wallet" />
                        <Label htmlFor="make-default-wallet">Make default payment method</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setShowAddWalletDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                        {loading ? "Adding..." : "Add Wallet"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {savedWallets.length > 0 ? (
              <div className="space-y-4">
                {savedWallets.map((wallet) => (
                  <Card key={wallet.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div
                            className={`rounded-md bg-slate-100 dark:bg-slate-800 p-2 ${wallet.type === "fawry" ? "text-blue-500" : "text-red-500"}`}
                          >
                            <Wallet className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {wallet.type === "fawry" ? "Fawry" : "Vodafone Cash"}
                            </p>
                            <p className="text-sm text-muted-foreground">{wallet.number}</p>
                            {wallet.isDefault && (
                              <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!wallet.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefaultWallet(wallet.id)}
                            >
                              Set as Default
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteWallet(wallet.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">You don't have any saved e-wallets yet.</p>
                </CardContent>
              </Card>
            )}

            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Secure Wallet Processing</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your e-wallet information is encrypted and securely stored. We use secure connections when processing
                    payments through your e-wallet providers.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
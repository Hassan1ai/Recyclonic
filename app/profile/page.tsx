"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Edit, Save, User } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import RTLProvider from "@/components/rtl-provider"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    firstName: "Ahmed",
    lastName: "Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+20 123 456 7890",
    address: "123 Green Street, Cairo, Egypt",
    bio: "Passionate about technology and environmental sustainability. I regularly recycle my old devices and love finding refurbished tech gems.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setEditMode(false)
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1500)
  }

  return (
    <RTLProvider>
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t("profile.title")}</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="profile">{t("profile.information")}</TabsTrigger>
              <TabsTrigger value="orders">{t("profile.orders")}</TabsTrigger>
              <TabsTrigger value="devices">{t("profile.devices")}</TabsTrigger>
              <TabsTrigger value="payment">{t("profile.payment") || "Payment Methods"}</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader className="relative pb-0">
                  <div className="absolute right-6 top-6">
                    {editMode ? (
                      <Button variant="ghost" size="sm" onClick={() => setEditMode(false)}>
                        {t("profile.cancel")}
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                        <Edit className="mr-2 h-4 w-4" /> {t("profile.edit")}
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={userData.avatar || "/placeholder.svg"}
                          alt={`${userData.firstName} ${userData.lastName}`}
                        />
                        <AvatarFallback>
                          <User className="h-12 w-12" />
                        </AvatarFallback>
                      </Avatar>
                      {editMode && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background"
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Change avatar</span>
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2 text-center sm:text-left">
                      <CardTitle className="text-2xl">
                        {userData.firstName} {userData.lastName}
                      </CardTitle>
                      <CardDescription>{t("profile.member")} January 2023</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSaveProfile}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t("profile.firstName")}</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleInputChange}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t("profile.lastName")}</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={userData.lastName}
                          onChange={handleInputChange}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("profile.email")}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("profile.phone")}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">{t("profile.address")}</Label>
                        <Input
                          id="address"
                          name="address"
                          value={userData.address}
                          onChange={handleInputChange}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="bio">{t("profile.bio")}</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={userData.bio}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    {editMode && (
                      <div className="mt-6 flex justify-end">
                        <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                          <Save className="mr-2 h-4 w-4" />
                          {loading ? t("profile.saving") : t("profile.save")}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>{t("profile.orders")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="p-8 text-center">
                      <h3 className="text-lg font-medium">{t("profile.noOrders")}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{t("profile.noOrders.description")}</p>
                      <Button
                        className="mt-4 bg-green-600 hover:bg-green-700"
                        onClick={() => router.push("/marketplace")}
                      >
                        {t("profile.browse")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices">
              <Card>
                <CardHeader>
                  <CardTitle>{t("profile.devices")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="p-8 text-center">
                      <h3 className="text-lg font-medium">{t("profile.noDevices")}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{t("profile.noDevices.description")}</p>
                      <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={() => router.push("/sell")}>
                        {t("profile.sell")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>{t("profile.payment") || "Payment Methods"}</CardTitle>
                  <CardDescription>
                    {t("profile.payment.description") || "Manage your saved payment methods for faster checkout"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-4">
                        <div className="rounded-md bg-slate-100 dark:bg-slate-800 p-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-green-100 text-green-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                <line x1="2" x2="22" y1="10" y2="10" />
                              </svg>
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="font-medium">Visa •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Default
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-4">
                        <div className="rounded-md bg-slate-100 dark:bg-slate-800 p-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M18.5 13.2c.2 1.6-.2 3-1.1 4.2" />
                                <path d="M9.5 6.8c-.2-1.6.2-3 1.1-4.2" />
                                <path d="M9.5 17.2c-.2 1.6.2 3 1.1 4.2" />
                                <path d="M18.5 6.8c.2-1.6-.2-3-1.1-4.2" />
                                <path d="M14 6.5c1.1.1 2.2.5 3 1.2" />
                                <path d="M14 17.5c1.1-.1 2.2-.5 3-1.2" />
                                <path d="M10 17.5c-1.1-.1-2.2-.5-3-1.2" />
                                <path d="M10 6.5c-1.1.1-2.2.5-3 1.2" />
                                <circle cx="14" cy="14" r="1" />
                                <circle cx="10" cy="10" r="1" />
                              </svg>
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="font-medium">Fawry</p>
                          <p className="text-sm text-muted-foreground">01012345678</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => router.push("/payment-methods")}
                    >
                      Manage Payment Methods
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RTLProvider>
  )
}

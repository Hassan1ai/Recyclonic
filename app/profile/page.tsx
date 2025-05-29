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
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">{t("profile.information")}</TabsTrigger>
              <TabsTrigger value="orders">{t("profile.orders")}</TabsTrigger>
              <TabsTrigger value="devices">{t("profile.devices")}</TabsTrigger>
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
          </Tabs>
        </div>
      </div>
    </RTLProvider>
  )
}

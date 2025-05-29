"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Key, User, Shield, Save, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import RTLProvider from "@/components/rtl-provider"

export default function SettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  // Mock settings data
  const [accountSettings, setAccountSettings] = useState({
    email: "ahmed.hassan@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    marketplaceUpdates: true,
    orderUpdates: true,
    promotionalEmails: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    dataSharing: false,
    activityTracking: true,
  })

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handlePrivacyChange = (name: string, checked: boolean) => {
    setPrivacySettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleLanguageChange = (value: "en" | "ar") => {
    setLanguage(value)
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
      })
    }, 1500)
  }

  return (
    <RTLProvider>
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t("settings.title")}</h1>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="account">
                <User className="mr-2 h-4 w-4" />
                {t("settings.account")}
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                {t("settings.notifications")}
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Shield className="mr-2 h-4 w-4" />
                {t("settings.privacy")}
              </TabsTrigger>
              <TabsTrigger value="language">
                <Globe className="mr-2 h-4 w-4" />
                {t("settings.language")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.account.title")}</CardTitle>
                  <CardDescription>{t("settings.account.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveSettings}>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("settings.email")}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={accountSettings.email}
                          onChange={handleAccountChange}
                        />
                      </div>

                      <div className="pt-4 border-t">
                        <h3 className="text-lg font-medium flex items-center mb-4">
                          <Key className="mr-2 h-4 w-4" />
                          {t("settings.changePassword")}
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">{t("settings.currentPassword")}</Label>
                            <Input
                              id="currentPassword"
                              name="currentPassword"
                              type="password"
                              value={accountSettings.currentPassword}
                              onChange={handleAccountChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">{t("settings.newPassword")}</Label>
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              value={accountSettings.newPassword}
                              onChange={handleAccountChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">{t("settings.confirmPassword")}</Label>
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={accountSettings.confirmPassword}
                              onChange={handleAccountChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                          <Save className="mr-2 h-4 w-4" />
                          {loading ? t("settings.saving") : t("settings.saveChanges")}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">{/* Notifications content */}</TabsContent>

            <TabsContent value="privacy">{/* Privacy content */}</TabsContent>

            <TabsContent value="language">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.language.title")}</CardTitle>
                  <CardDescription>{t("settings.language.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveSettings}>
                    <div className="space-y-6">
                      <RadioGroup
                        defaultValue={language}
                        onValueChange={(value) => handleLanguageChange(value as "en" | "ar")}
                        className="flex flex-col space-y-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="en" id="english" />
                          <Label htmlFor="english" className="flex items-center">
                            <img
                              src="https://flagcdn.com/w40/us.png"
                              width={24}
                              height={16}
                              alt="English"
                              className="mr-2"
                            />
                            {t("settings.language.english")}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ar" id="arabic" />
                          <Label htmlFor="arabic" className="flex items-center">
                            <img
                              src="https://flagcdn.com/w40/sa.png"
                              width={24}
                              height={16}
                              alt="Arabic"
                              className="mr-2"
                            />
                            {t("settings.language.arabic")}
                          </Label>
                        </div>
                      </RadioGroup>

                      <div className="flex justify-end">
                        <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                          <Save className="mr-2 h-4 w-4" />
                          {loading ? t("settings.saving") : t("settings.saveChanges")}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RTLProvider>
  )
}

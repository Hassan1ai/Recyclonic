"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Phone, Mail, MapPin, MessageSquare, Send } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import RTLProvider from "@/components/rtl-provider"

export default function ContactPage() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
      })

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  return (
    <RTLProvider>
      <div className="container py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("contact.title")}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("contact.description")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("contact.phone")}</h3>
                <p className="text-muted-foreground">{t("contact.phone.description")}</p>
                <a href="tel:+201234567890" className="mt-2 font-medium text-green-600 dark:text-green-400">
                  +20 109 995 49075
                </a>
                <p className="text-sm text-muted-foreground mt-1">Available Sunday-Thursday, 9am-5pm</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("contact.email")}</h3>
                <p className="text-muted-foreground">{t("contact.email.description")}</p>
                <a href="mailto:info@reacyclonic.com" className="mt-2 font-medium text-green-600 dark:text-green-400">
                  info@reacyclonic.com
                </a>
                <p className="text-sm text-muted-foreground mt-1">We typically respond within 24 hours</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("contact.visit")}</h3>
                <p className="text-muted-foreground">{t("contact.visit.description")}</p>
                <address className="mt-2 font-medium text-green-600 dark:text-green-400 not-italic">
                  123 Green Street, Cairo, Egypt
                </address>
                <p className="text-sm text-muted-foreground mt-1">Open Sunday-Thursday, 9am-5pm</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {t("contact.message")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.name")}</Label>
                    <Input id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.email.address")}</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{t("contact.subject")}</Label>
                  <Input id="subject" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.message.text")}</Label>
                  <Textarea id="message" className="min-h-[150px]" required />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("contact.sending")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {t("contact.send")}
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("contact.faq")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">How does the pickup process work?</h3>
                <p className="text-sm text-muted-foreground">
                  After submitting your device details, our team will contact you to arrange a convenient pickup time.
                  Our courier will come to your location to collect the device.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">How do you determine the value of my device?</h3>
                <p className="text-sm text-muted-foreground">
                  We evaluate devices based on their model, age, condition, and current market value. Our team will
                  provide you with a fair estimate after reviewing your submission.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Do you offer warranty on refurbished products?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, all our refurbished products come with a warranty ranging from 3 to 12 months, depending on the
                  item. Details are provided on each product page.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">How do you ensure data privacy?</h3>
                <p className="text-sm text-muted-foreground">
                  We follow strict data wiping protocols for all devices we receive. All storage media are securely
                  erased using industry-standard methods to protect your privacy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RTLProvider>
  )
}

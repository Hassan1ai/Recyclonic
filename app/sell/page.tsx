"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Upload, Camera, Smartphone, Laptop, Monitor, Cpu, HardDrive, Trash2 } from "lucide-react"

// Sample device images for demonstration
const sampleDeviceImages = [
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400&auto=format&fit=crop",
]

export default function SellPage() {
  const { toast } = useToast()
  const [deviceType, setDeviceType] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload these files to a server
      // For demo purposes, we'll use the sample images
      const newImages = Array.from(e.target.files).map((_, index) => {
        // Cycle through sample images
        return sampleDeviceImages[index % sampleDeviceImages.length]
      })
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setStep(3) // Move to confirmation step
      toast({
        title: "Request Submitted Successfully",
        description: "We'll contact you soon to arrange a pickup.",
      })
    }, 1500)
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Sell Your Device</h1>
          <p className="text-muted-foreground">Turn your unused electronics into cash while helping the environment</p>
        </div>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Sell a Device</TabsTrigger>
            <TabsTrigger value="info">How It Works</TabsTrigger>
          </TabsList>
          <TabsContent value="form" className="mt-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { icon: Smartphone, label: "Smartphone", value: "smartphone" },
                    { icon: Laptop, label: "Laptop", value: "laptop" },
                    { icon: Monitor, label: "Monitor", value: "monitor" },
                    { icon: Cpu, label: "Computer", value: "computer" },
                    { icon: HardDrive, label: "Hard Drive", value: "harddrive" },
                    { icon: Camera, label: "Camera", value: "camera" },
                  ].map((device) => (
                    <Card
                      key={device.value}
                      className={`cursor-pointer transition-all ${
                        deviceType === device.value
                          ? "border-green-600 dark:border-green-400 bg-green-50 dark:bg-green-900/20"
                          : "hover:border-green-200 dark:hover:border-green-800"
                      }`}
                      onClick={() => setDeviceType(device.value)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                        <device.icon className="h-8 w-8 mb-2 text-green-600 dark:text-green-400" />
                        <span>{device.label}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setStep(2)} disabled={!deviceType} className="bg-green-600 hover:bg-green-700">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="device-model">Device Model</Label>
                    <Input id="device-model" placeholder="e.g., iPhone 11, Dell XPS 13" required />
                  </div>

                  <div>
                    <Label htmlFor="device-condition">Condition</Label>
                    <Select required>
                      <SelectTrigger id="device-condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="working">Working perfectly</SelectItem>
                        <SelectItem value="minor-issues">Working with minor issues</SelectItem>
                        <SelectItem value="major-issues">Has major issues</SelectItem>
                        <SelectItem value="not-working">Not working</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="problem-description">Problem Description</Label>
                    <Textarea
                      id="problem-description"
                      placeholder="Describe any issues with your device..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label>Upload Photos</Label>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Device image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      {images.length < 5 && (
                        <div className="aspect-square flex items-center justify-center border border-dashed rounded-md">
                          <Label
                            htmlFor="image-upload"
                            className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                          >
                            <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Add Photo</span>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </Label>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Upload up to 5 clear photos of your device from different angles
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="contact-name">Your Name</Label>
                    <Input id="contact-name" required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-phone">Phone Number</Label>
                      <Input id="contact-phone" type="tel" required />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pickup-address">Pickup Address</Label>
                    <Textarea
                      id="pickup-address"
                      placeholder="Enter your full address for device pickup..."
                      className="min-h-[80px]"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Request Submitted Successfully!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for choosing to recycle with Recyclonic. Our team will review your request and contact you
                    within 24 hours to arrange a pickup.
                  </p>
                  <div className="bg-muted p-4 rounded-md mb-6">
                    <p className="font-medium">
                      Your request ID:{" "}
                      <span className="text-green-600 dark:text-green-400">
                        REQ-{Math.floor(100000 + Math.random() * 900000)}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">Keep this ID for tracking your request</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setStep(1)
                        setDeviceType("")
                        setImages([])
                      }}
                    >
                      Sell Another Device
                    </Button>
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <a href="/track">Track Your Request</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="info" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 shrink-0">
                      <span className="font-bold text-green-600 dark:text-green-400">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Submit Your Device Details</h3>
                      <p className="text-muted-foreground">
                        Fill out the form with information about your device, including its type, model, condition, and
                        any issues it might have. Upload clear photos to help us evaluate it accurately.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 shrink-0">
                      <span className="font-bold text-green-600 dark:text-green-400">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Get an Estimate</h3>
                      <p className="text-muted-foreground">
                        Our team will review your submission and provide an estimated value for your device based on its
                        condition, age, and market value. We'll contact you within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 shrink-0">
                      <span className="font-bold text-green-600 dark:text-green-400">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Schedule a Pickup</h3>
                      <p className="text-muted-foreground">
                        If you accept our offer, we'll arrange for a convenient pickup time from your location. Our team
                        will come to collect the device directly from you.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 shrink-0">
                      <span className="font-bold text-green-600 dark:text-green-400">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Get Paid</h3>
                      <p className="text-muted-foreground">
                        Once we receive and verify your device, you'll receive payment through your preferred method
                        (bank transfer, mobile wallet, or store credit with bonus value).
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-semibold mb-2">What happens to your device?</h3>
                    <p className="text-sm text-muted-foreground">
                      Depending on the condition, we either refurbish it for resale (extending its life and reducing
                      e-waste) or responsibly recycle it through our certified recycling partners, ensuring harmful
                      materials don't end up in landfills.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

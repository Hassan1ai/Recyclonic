"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Recycle, ShoppingBag, Truck, BarChart3, Leaf } from "lucide-react"
import StatsCounter from "@/components/stats-counter"
import TestimonialCard from "@/components/testimonial-card"
import { useLanguage } from "@/contexts/language-context"
import RTLProvider from "@/components/rtl-provider"

export default function Home() {
  const { t } = useLanguage()

  return (
    <RTLProvider>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 py-16 md:py-24">
          <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t("home.hero.title").split(",")[0]},{" "}
                <span className="text-green-600 dark:text-green-400">{t("home.hero.title").split(",")[1]}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">{t("home.hero.description")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/sell">{t("home.hero.sell")}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/marketplace">{t("home.hero.browse")}</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <Image
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop"
                width={500}
                height={500}
                alt={t("home.hero.title")}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("home.how.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.how.description")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-green-100 dark:border-green-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                      <Recycle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t("home.how.step1.title")}</h3>
                    <p className="text-muted-foreground">{t("home.how.step1.description")}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-100 dark:border-green-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                      <Truck className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t("home.how.step2.title")}</h3>
                    <p className="text-muted-foreground">{t("home.how.step2.description")}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-100 dark:border-green-800">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                      <ShoppingBag className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t("home.how.step3.title")}</h3>
                    <p className="text-muted-foreground">{t("home.how.step3.description")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Environmental Impact */}
        <section className="py-16 bg-green-50 dark:bg-green-950">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("home.impact.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.impact.description")}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatsCounter
                icon={<Recycle className="h-8 w-8 text-green-600 dark:text-green-400" />}
                value={5280}
                label={t("home.impact.waste")}
              />
              <StatsCounter
                icon={<Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />}
                value={4150}
                label={t("home.impact.recycled")}
              />
              <StatsCounter
                icon={<ShoppingBag className="h-8 w-8 text-green-600 dark:text-green-400" />}
                value={1250}
                label={t("home.impact.devices")}
              />
              <StatsCounter
                icon={<BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400" />}
                value={3200}
                label={t("home.impact.co2")}
              />
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">{t("home.products.title")}</h2>
              <Button asChild variant="outline">
                <Link href="/marketplace">{t("home.products.viewAll")}</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: 1,
                  name: "iPhone 11 Screen",
                  description: "Original, Grade A",
                  price: 1200,
                  image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=600&auto=format&fit=crop",
                },
                {
                  id: 2,
                  name: "Iphone Xs",
                  description: "Compatible Replacement",
                  price: 450,
                  image:
                   "https://images.unsplash.com/photo-1512439408685-2e399291a4e6?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  id: 3,
                  name: "Refurbished Dell Laptop",
                  description: "Core i5, 8GB RAM, SSD",
                  price: 6800,
                  image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
                },
                {
                  id: 4,
                  name: "Type-C Charger Cable",
                  description: "1.5m, Fast Charging",
                  price: 80,
                  image:
                    "https://images.pexels.com/photos/4219863/pexels-photo-4219863.jpeg?auto=compress&cs=tinysrgb&w=600",
                },
              ].map((product) => (
                <Link key={product.id} href={`/marketplace/${product.id}`} className="group">
                  <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                    <div className="aspect-square relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      <p className="mt-2 font-bold text-green-600 dark:text-green-400">
                        {product.price.toLocaleString()} EGP
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-green-50 dark:bg-green-950">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("home.testimonials.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.testimonials.description")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                name="Ahmed Hassan"
                role="Regular Customer"
                content="I've sold several old phones through Recyclonic. The process was incredibly smooth, and I love knowing my e-waste is being handled responsibly."
                avatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
              />
              <TestimonialCard
                name="Nour Ibrahim"
                role="Tech Enthusiast"
                content="The refurbished laptop I bought works perfectly and was half the price of a new one. Great value and environmentally friendly!"
                avatar="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200"
              />
              <TestimonialCard
                name="Mohamed Ali"
                role="Business Owner"
                content="We partnered with Recyclonic for our company's e-waste disposal. Their professional approach and environmental commitment impressed us."
                avatar="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-green-600 dark:bg-green-800 text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("home.cta.title")}</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">{t("home.cta.description")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/sell">{t("home.cta.sell")}</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Link href="/marketplace">{t("home.cta.shop")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </RTLProvider>
  )
}

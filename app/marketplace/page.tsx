"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, SlidersHorizontal, Plus } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/contexts/language-context"
import RTLProvider from "@/components/rtl-provider"

const products = [
  {
    id: 1,
    name: "iPhone 11 Screen",
    description: "Original, Grade A",
    price: 1200,
    category: "Phone Parts",
    condition: "New",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Iphone Xs",
    description: "Compatible Replacement",
    price: 450,
    category: "Phone Parts",
    condition: "New",
    image: "https://images.unsplash.com/photo-1512439408685-2e399291a4e6?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Refurbished Dell Laptop",
    description: "Core i5, 8GB RAM, SSD",
    price: 6800,
    category: "Laptops",
    condition: "Refurbished",
    image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Type-C Charger Cable",
    description: "1.5m, Fast Charging",
    price: 80,
    category: "Accessories",
    condition: "New",
    image: "https://images.pexels.com/photos/4219863/pexels-photo-4219863.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "MacBook Pro Keyboard",
    description: "2019-2021 Models",
    price: 1500,
    category: "Laptop Parts",
    condition: "Refurbished",
    image: "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Wireless Mouse",
    description: "Ergonomic Design",
    price: 350,
    category: "Accessories",
    condition: "New",
    image: "https://images.pexels.com/photos/5082577/pexels-photo-5082577.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    name: "HP Monitor 24-inch",
    description: "Full HD IPS Display",
    price: 2200,
    category: "Monitors",
    condition: "Refurbished",
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    name: "Lenovo ThinkPad",
    description: "i7, 16GB RAM, 512GB SSD",
    price: 8500,
    category: "Laptops",
    condition: "Refurbished",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
]

export default function MarketplacePage() {
  const { t } = useLanguage()

  return (
    <RTLProvider>
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("marketplace.title")}</h1>
            <p className="text-muted-foreground">{t("marketplace.description")}</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder={t("marketplace.search")} className="pl-8" />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">{t("marketplace.filter")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="space-y-6 py-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t("marketplace.category")}</h3>
                    <div className="space-y-3">
                      {["Phone Parts", "Laptop Parts", "Laptops", "Accessories", "Monitors"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox id={`category-${category}`} />
                          <Label htmlFor={`category-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t("marketplace.condition")}</h3>
                    <div className="space-y-3">
                      {["New", "Refurbished", "Used"].map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox id={`condition-${condition}`} />
                          <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t("marketplace.price")}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="min-price">Min</Label>
                        <Input id="min-price" type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label htmlFor="max-price">Max</Label>
                        <Input id="max-price" type="number" placeholder="10000" />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">{t("marketplace.apply")}</Button>
                </div>
              </SheetContent>
            </Sheet>
            <Select defaultValue="featured">
              <SelectTrigger className="w-[180px] hidden md:flex">
                <SelectValue placeholder={t("marketplace.sort")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/marketplace/add-product">
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{t("marketplace.addProduct")}</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("marketplace.category")}</h3>
              <div className="space-y-3">
                {["Phone Parts", "Laptop Parts", "Laptops", "Accessories", "Monitors"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`desktop-category-${category}`} />
                    <Label htmlFor={`desktop-category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("marketplace.condition")}</h3>
              <div className="space-y-3">
                {["New", "Refurbished", "Used"].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox id={`desktop-condition-${condition}`} />
                    <Label htmlFor={`desktop-condition-${condition}`}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("marketplace.price")}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="desktop-min-price">Min</Label>
                  <Input id="desktop-min-price" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="desktop-max-price">Max</Label>
                  <Input id="desktop-max-price" type="number" placeholder="10000" />
                </div>
              </div>
            </div>
            <Button className="w-full">{t("marketplace.apply")}</Button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/marketplace/${product.id}`} className="group">
                  <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                    <div className="aspect-square relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full">
                              {product.category}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
                              {product.condition}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {product.price.toLocaleString()} EGP
                        </p>
                        <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RTLProvider>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight, ShoppingCart, Heart, Share2, ArrowLeft, ArrowRight } from "lucide-react"

// This would normally come from a database
const product = {
  id: 3,
  name: "Refurbished Dell Laptop",
  description: "Core i5, 8GB RAM, SSD",
  longDescription:
    "This refurbished Dell laptop has been thoroughly tested and restored to like-new condition. It features an Intel Core i5 processor, 8GB of RAM, and a fast 256GB SSD for smooth performance. Perfect for work, study, or everyday use.",
  price: 6800,
  category: "Laptops",
  condition: "Refurbished",
  warranty: "6 months",
  specifications: [
    { name: "Processor", value: "Intel Core i5-8265U" },
    { name: "RAM", value: "8GB DDR4" },
    { name: "Storage", value: "256GB SSD" },
    { name: "Display", value: "14-inch Full HD (1920 x 1080)" },
    { name: "Graphics", value: "Intel UHD Graphics" },
    { name: "Operating System", value: "Windows 10 Pro" },
    { name: "Battery", value: "4-cell, up to 8 hours" },
    { name: "Ports", value: "2x USB 3.0, 1x USB-C, HDMI, SD card reader" },
  ],
  images: [
    "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
  relatedProducts: [
    {
      id: 5,
      name: "MacBook Pro Keyboard",
      description: "2019-2021 Models",
      price: 1500,
      image: "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 7,
      name: "HP Monitor 24-inch",
      description: "Full HD IPS Display",
      price: 2200,
      image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 8,
      name: "Lenovo ThinkPad",
      description: "i7, 16GB RAM, 512GB SSD",
      price: 8500,
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-8 md:py-12">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/marketplace">Marketplace</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground mt-2">{product.description}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full">
                {product.category}
              </span>
              <span className="text-sm px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
                {product.condition}
              </span>
              <span className="text-sm px-2 py-0.5 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 rounded-full">
                {product.warranty} Warranty
              </span>
            </div>
          </div>

          <div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {product.price.toLocaleString()} EGP
            </p>
            <p className="text-sm text-muted-foreground">Including taxes and free shipping within Cairo</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-semibold text-lg mb-4">Description</h2>
            <p className="text-muted-foreground">{product.longDescription}</p>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-semibold text-lg mb-4">Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-muted-foreground">{spec.name}:</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <Link key={relatedProduct.id} href={`/marketplace/${relatedProduct.id}`} className="group">
              <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                <div className="aspect-square relative">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{relatedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{relatedProduct.description}</p>
                  <p className="mt-2 font-bold text-green-600 dark:text-green-400">
                    {relatedProduct.price.toLocaleString()} EGP
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

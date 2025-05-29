"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, ShoppingCart, User, Sun, Moon, LogIn, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import RTLProvider from "@/components/rtl-provider"
import logo from '../app/assets/logo.png'


export default function Navbar() {

  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { toast } = useToast()
  const [cartCount, setCartCount] = useState(3) // Set to 3 to show cart items
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t, language } = useLanguage()

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add this function to handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    toast({
      title: "Logged in successfully",
      description: "Welcome back to Recyclonic!",
    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    toast({
      title: "Logged out successfully",
      description: "You have been logged out from Recyclonic.",
    })
  }

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.marketplace"), href: "/marketplace" },
    { name: t("nav.sell"), href: "/sell" },
    { name: t("nav.track"), href: "/track" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  return (
    <RTLProvider>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={language === "ar" ? "right" : "left"} className="pr-0">
                <Link href="/" className="flex items-center gap-2 pb-6">
                  <Image
                    src={logo}
                    width={32}
                    height={32}
                    alt="Recyclonic Logo"
                    className="rounded-md"
                  />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium ${
                        isActive(link.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                width={32}
                height={32}
                alt="Recyclonic Logo"
                className="rounded-md"
                style={{ width: "80px", height: "55px" }}
              />
              <span className="hidden font-bold sm:inline-block">Recyclonic</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${
                  isActive(link.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {mounted && (
              <Button variant="outline" size="icon" onClick={toggleTheme} className="mr-2" aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            <Link href="/settings">
              <Button variant="outline" size="icon" className="mr-2" aria-label="Settings">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/profile">
              <Button variant="outline" size="icon" className="mr-2" aria-label="Profile">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>

            {!isLoggedIn && (
              <Button variant="default" size="sm" onClick={() => router.push("/login")}>
                <LogIn className="mr-2 h-4 w-4" />
                {t("nav.login")}
              </Button>
            )}
          </div>
        </div>
      </header>
    </RTLProvider>
  )
}

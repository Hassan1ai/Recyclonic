"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import RTLProvider from "@/components/rtl-provider"
import logo from "../app/assets/logo.png"
export default function Footer() {
  const { t } = useLanguage()

  return (
    <RTLProvider>
      <footer className="bg-green-50 dark:bg-green-950 border-t">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
            
                <span className="font-bold text-xl">Recyclonic</span>
              </div>
              <p className="text-muted-foreground">{t("footer.about.description")}</p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("footer.links")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary">
                    {t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="text-muted-foreground hover:text-primary">
                    {t("nav.marketplace")}
                  </Link>
                </li>
                <li>
                  <Link href="/sell" className="text-muted-foreground hover:text-primary">
                    {t("nav.sell")}
                  </Link>
                </li>
                <li>
                  <Link href="/track" className="text-muted-foreground hover:text-primary">
                    {t("nav.track")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary">
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary">
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("footer.support")}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 mt-0.5 text-primary" />
                  <span>+20 109 995 49075</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 mt-0.5 text-primary" />
                  <span>info@recyclonic.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                  <span>123 Green Street, Cairo, Egypt</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("footer.newsletter")}</h3>
              <p className="text-muted-foreground mb-4">{t("footer.newsletter.description")}</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("footer.subscribe.placeholder")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  {t("footer.subscribe")}
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border">
            <p className="text-center text-muted-foreground">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </RTLProvider>
  )
}

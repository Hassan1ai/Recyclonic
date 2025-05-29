"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  avatar: string
}

export default function TestimonialCard({ name, role, content, avatar }: TestimonialCardProps) {
  const { language } = useLanguage()

  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <img src={avatar || "/placeholder.svg"} alt={name} className="w-12 h-12 rounded-full object-cover mr-4" />
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
        <p className="text-muted-foreground flex-1">{content}</p>
        <div className="flex mt-4">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Recycle, Users, Building, Award, Leaf } from "lucide-react"
import StatsCounter from "@/components/stats-counter"
import mohammeIslamImg from '../assets/m.jpg'
import hassan from '../assets/Hassanm.jpg'
import omar from '../assets/omar.jpg'
import shahd from '../assets/shahd photo.jpg'



export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center mb-16">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Recyclonic</h1>
          <p className="text-lg text-muted-foreground mb-6">
            We're on a mission to reduce electronic waste in Egypt through innovative recycling and refurbishing
            solutions.
          </p>
          <p className="text-muted-foreground mb-6">
            Founded in 2020, Recyclonic has grown from a small startup to a leading e-waste management company in Egypt.
            We believe in creating a circular economy where electronic devices are given a second life or properly
            recycled to minimize environmental impact.
          </p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
        <div className="flex-1">
          <Image
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop"
            width={600}
            height={400}
            alt="Recyclonic team working on e-waste recycling"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Our Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="border-green-100 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground flex-1">
                To reduce electronic waste in Egypt by creating an accessible platform for collecting, refurbishing, and
                responsibly recycling electronic devices, while educating the public about the importance of e-waste
                management.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground flex-1">
                To become the leading e-waste management solution in the Middle East, creating a world where electronic
                devices are never wasted, but instead are part of a sustainable cycle that benefits both people and the
                planet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=600&auto=format&fit=crop"
                fill
                alt="Recyclonic beginnings"
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">The Beginning</h3>
            <p className="text-muted-foreground">
              Recyclonic started in a small workshop in Cairo, with a team of three passionate engineers who saw the
              growing problem of e-waste in Egypt and wanted to make a difference.
            </p>
          </div>
          <div className="space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                fill
                alt="Recyclonic growth"
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">Growth & Expansion</h3>
            <p className="text-muted-foreground">
              By 2022, we had expanded our operations to include a dedicated refurbishing facility and partnerships with
              major electronics retailers and manufacturers across Egypt.
            </p>
          </div>
          <div className="space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=600&auto=format&fit=crop"
                fill
                alt="Recyclonic today"
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">Recyclonic Today</h3>
            <p className="text-muted-foreground">
              Today, we operate a comprehensive e-waste management system with collection points across major cities, a
              state-of-the-art refurbishing center, and partnerships with certified recycling facilities.
            </p>
          </div>
        </div>
      </div>

      {/* Our Impact */}
      <div className="mb-16 bg-green-50 dark:bg-green-950 py-12 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Environmental Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Since our founding, we've made significant progress in reducing e-waste and its environmental impact in
            Egypt.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          <StatsCounter
            icon={<Recycle className="h-8 w-8 text-green-600 dark:text-green-400" />}
            value={5280}
            label="KG of E-Waste Collected"
          />
          <StatsCounter
            icon={<Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />}
            value={4150}
            label="KG of E-Waste Recycled"
          />
          <StatsCounter
            icon={<Users className="h-8 w-8 text-green-600 dark:text-green-400" />}
            value={3500}
            label="Happy Customers"
          />
          <StatsCounter
            icon={<Building className="h-8 w-8 text-green-600 dark:text-green-400" />}
            value={15}
            label="Business Partners"
          />
        </div>
      </div>

      {/* Our Partners */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Partners</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          We collaborate with leading organizations and companies to maximize our impact and reach.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=300&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560179304-6fc1d8749b23?q=80&w=300&auto=format&fit=crop",
            "https://eerc-group.com/wp-content/uploads/2024/08/logo.png",
          ].map((image, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border"
            >
              <Image src={image || "/placeholder.svg"} width={160} height={80} alt={`Partner ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Interested in partnering with us? We're always looking for organizations that share our vision.
          </p>
          <Button asChild variant="outline">
            <Link href="/contact">Become a Partner</Link>
          </Button>
        </div>
      </div>

      {/* Our Team */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          Our dedicated team of professionals is passionate about creating a sustainable future.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Mohammed Islam",
              role: "Founder & CEO",
              bio: "Mohammed Stack developer with a passion for sustainability and technology. He founded Recyclonic to tackle the growing e-waste problem in Egypt.",
              image: mohammeIslamImg,
            },
            {
              name: "Hassan Mohammed",
              role: "Head of Operations",
              bio: "Hassan oversees our day-to-day operations, ensuring that our collection, refurbishing, and recycling processes run smoothly.",
              image:hassan ,
            },
            {
              name: "omar Fouad",
              role: "Technical Director",
              bio: "Omar leads our technical team, developing innovative solutions for refurbishing and recycling electronic components.",
              image: omar,
            },
            {
              name: "Shahd Sayed",
              role: "Technical Director",
              bio: "Omar leads our technical team, developing innovative solutions for refurbishing and recycling electronic components.",
              image:shahd ,
            },
           
          ].map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                <p className="text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

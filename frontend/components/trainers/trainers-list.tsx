import Link from "next/link"
import { Mail, Phone, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data
const trainers = [
  {
    id: "T001",
    name: "Marcus Johnson",
    image: "/placeholder.svg?height=300&width=300",
    initials: "MJ",
    specialties: ["HIIT", "Strength Training", "Nutrition"],
    rating: 4.9,
    reviews: 124,
    email: "marcus.j@fittrackpro.com",
    phone: "(555) 123-4567",
    availability: "Mon-Fri, 6AM-2PM",
    clients: 28,
    bio: "Certified personal trainer with 8 years of experience specializing in high-intensity training and strength conditioning. Passionate about helping clients achieve their fitness goals through personalized programs.",
  },
  {
    id: "T002",
    name: "Sophia Rodriguez",
    image: "/placeholder.svg?height=300&width=300",
    initials: "SR",
    specialties: ["Cycling", "Cardio", "Weight Loss"],
    rating: 4.8,
    reviews: 98,
    email: "sophia.r@fittrackpro.com",
    phone: "(555) 234-5678",
    availability: "Mon-Wed-Fri, 8AM-6PM",
    clients: 22,
    bio: "Former professional cyclist with a passion for helping others achieve their cardio and endurance goals. Specializes in weight loss programs and building sustainable fitness habits.",
  },
  {
    id: "T003",
    name: "David Kim",
    image: "/placeholder.svg?height=300&width=300",
    initials: "DK",
    specialties: ["Bodybuilding", "Powerlifting", "Nutrition"],
    rating: 4.7,
    reviews: 87,
    email: "david.k@fittrackpro.com",
    phone: "(555) 345-6789",
    availability: "Tue-Thu-Sat, 7AM-7PM",
    clients: 18,
    bio: "Competitive bodybuilder and certified strength coach with expertise in muscle building and powerlifting techniques. Focuses on proper form and nutrition for optimal results.",
  },
  {
    id: "T004",
    name: "Aisha Patel",
    image: "/placeholder.svg?height=300&width=300",
    initials: "AP",
    specialties: ["Yoga", "Pilates", "Meditation"],
    rating: 5.0,
    reviews: 156,
    email: "aisha.p@fittrackpro.com",
    phone: "(555) 456-7890",
    availability: "Mon-Fri, 9AM-5PM",
    clients: 35,
    bio: "Certified yoga instructor with 12 years of experience in various yoga styles, pilates, and mindfulness practices. Specializes in holistic wellness and stress reduction techniques.",
  },
  {
    id: "T005",
    name: "James Wilson",
    image: "/placeholder.svg?height=300&width=300",
    initials: "JW",
    specialties: ["Rehabilitation", "Senior Fitness", "Functional Training"],
    rating: 4.9,
    reviews: 112,
    email: "james.w@fittrackpro.com",
    phone: "(555) 567-8901",
    availability: "Mon-Wed-Fri, 10AM-6PM",
    clients: 20,
    bio: "Physical therapist and certified trainer specializing in rehabilitation and functional fitness. Expert in designing programs for seniors and individuals recovering from injuries.",
  },
  {
    id: "T006",
    name: "Maria Lopez",
    image: "/placeholder.svg?height=300&width=300",
    initials: "ML",
    specialties: ["Zumba", "Dance Fitness", "Aerobics"],
    rating: 4.8,
    reviews: 143,
    email: "maria.l@fittrackpro.com",
    phone: "(555) 678-9012",
    availability: "Tue-Thu-Sat, 4PM-9PM",
    clients: 32,
    bio: "Professional dancer and certified fitness instructor specializing in dance-based workouts. Creates high-energy, fun classes that make fitness enjoyable for everyone.",
  },
  {
    id: "T007",
    name: "Ryan Thompson",
    image: "/placeholder.svg?height=300&width=300",
    initials: "RT",
    specialties: ["CrossFit", "Functional Fitness", "Sports Performance"],
    rating: 4.7,
    reviews: 76,
    email: "ryan.t@fittrackpro.com",
    phone: "(555) 789-0123",
    availability: "Mon-Wed-Fri, 5AM-1PM",
    clients: 24,
    bio: "CrossFit Level 3 trainer and former college athlete specializing in functional fitness and sports performance. Focuses on building strength, endurance, and agility.",
  },
  {
    id: "T008",
    name: "Emma Wilson",
    image: "/placeholder.svg?height=300&width=300",
    initials: "EW",
    specialties: ["Meditation", "Wellness Coaching", "Stress Management"],
    rating: 4.9,
    reviews: 92,
    email: "emma.w@fittrackpro.com",
    phone: "(555) 890-1234",
    availability: "Tue-Thu, 9AM-7PM",
    clients: 26,
    bio: "Certified wellness coach and meditation instructor specializing in stress management and mindfulness practices. Helps clients achieve balance in their physical and mental wellbeing.",
  },
]

export function TrainersList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {trainers.map((trainer) => (
        <Card key={trainer.id} className="overflow-hidden">
          <div className="aspect-square w-full overflow-hidden">
            <img
              src={trainer.image || "/placeholder.svg"}
              alt={trainer.name}
              className="h-full w-full object-cover transition-all hover:scale-105"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src={trainer.image} alt={trainer.name} />
                  <AvatarFallback>{trainer.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{trainer.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                    {trainer.rating} ({trainer.reviews})
                  </div>
                </div>
              </div>
              <Badge variant="outline">{trainer.clients} clients</Badge>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex flex-wrap gap-1">
                {trainer.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground mt-2">{trainer.bio}</p>
              <div className="mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{trainer.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{trainer.phone}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full">
              <Link href={`/trainers/${trainer.id}`}>View Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


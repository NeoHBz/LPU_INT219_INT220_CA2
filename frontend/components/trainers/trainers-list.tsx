'use client'
import Link from "next/link"
import { Mail, Phone, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { TrainerType } from "@/types/Trainer"
import { useAllTrainersQuery } from "@/lib/user"


export function TrainersList() {
    const [trainers, setTrainers] = useState<TrainerType[]>([]);
    const { data: trainerData } = useAllTrainersQuery("");
    useEffect(() => {
        if (trainerData && trainerData.length > 0) {
            setTrainers(trainerData);
        }
    }, [trainerData])
    
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
                  <AvatarFallback>{trainer.name}</AvatarFallback>
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


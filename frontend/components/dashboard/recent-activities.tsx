import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { recentActivities } from "@/types/recent-activities"
import { useEffect, useState } from "react"



export function RecentActivities() {
    const [activities, setActivities] = useState<recentActivities[]>([])
    useEffect(() => {
        fetch(`http://localhost:9876/api/recent-activities`, {
            method: "GET"
        }).then((res) => res.json()).then((data) => {
            setActivities(data)
        }
      )
    }, [])
    
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.image} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.activity} - {activity.location}
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}


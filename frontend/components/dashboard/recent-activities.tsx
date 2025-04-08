import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      image: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    activity: "Checked in",
    time: "2 minutes ago",
    location: "Main Gym",
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      image: "/placeholder.svg?height=32&width=32",
      initials: "SW",
    },
    activity: "Attended Yoga Class",
    time: "15 minutes ago",
    location: "Studio 2",
  },
  {
    id: 3,
    user: {
      name: "Michael Chen",
      image: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    activity: "Completed Personal Training",
    time: "32 minutes ago",
    location: "Training Area",
  },
  {
    id: 4,
    user: {
      name: "Emily Rodriguez",
      image: "/placeholder.svg?height=32&width=32",
      initials: "ER",
    },
    activity: "Renewed Membership",
    time: "1 hour ago",
    location: "Reception",
  },
  {
    id: 5,
    user: {
      name: "David Kim",
      image: "/placeholder.svg?height=32&width=32",
      initials: "DK",
    },
    activity: "Booked Spinning Class",
    time: "1 hour ago",
    location: "Mobile App",
  },
]

export function RecentActivities() {
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


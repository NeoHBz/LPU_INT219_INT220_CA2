export interface UpcomingClasses{
    id: number;
    name: string;
    time: string;
    instructor: {
        name: string;
        image: string;
        initials: string;
    };
    location: string;
    attendees: number;
    capacity: number;
    status: string;
}
export interface recentActivities{
    id: number;
    user: {
        name: string;
        image: string;
        initials: string;
    };
    activity: string;
    time: string;
    location: string;

}
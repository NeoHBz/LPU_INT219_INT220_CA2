export interface MembershipPlansType{
    id: string;
    membershipType: string;
    price: number;
    duration: string;
    description: string;
    features: string[];
    popular: boolean;
    members: number;
}

export interface MemberShipSubscribers{
    id: string;
    member: {
        id: string;
        name: string;
        image: string;
        
    },
    plan: string
    startDate:string;
    expiryDate:string;
    paymentStatus:string;
    paymentMethod:string;
    amount:string;
    autoRenew: boolean;
}
export interface MemberType {
    id: string;
    user: {
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
    };
    plan: {
        id: string;
        plan_name: string;
        membership_type: string;
        price: number;
    };
    membershipType: string;
    status: string;
    joinDate: string;
    expiry_date: string;
    image: string;    
}
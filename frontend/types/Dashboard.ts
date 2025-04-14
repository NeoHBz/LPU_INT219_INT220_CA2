export interface Dashboard {
    totalMembers: Number;
    percentMemberIncrease?: Number;
    totalMemberDecrease?: Number;
    activeClasses: Number;
    newClassesThisWeak?: Number;
    revenue: Number;
    activeTrainers: Number;
    newTrainers: Number;
    percentageRevenueIncrease?: Number;
    totalRevenueDecrease?: Number;
    peakHours: String; // 5am - 7am
    peakHoursAverageActivity: Number; // check in that time frame. 
    mostUsedEquipmentName:String; // treadmill
    
}
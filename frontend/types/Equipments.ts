

export interface EquipmentType {
    id: string;
    name: string;
    model: string;
    serialNumber: string;
    location: string;
    purchaseDate: string;
    lastMaintenance: string;
    nextMaintenance: string;
    status: string;
    usageHours: number,
}

export interface MaintainaceEquipmentType{
    id:string;
    equipmentId:string;
    equipmentName:string;
    type:string;
    scheduledDate: string;
    completeData?: string;
    technician:string;
    status:string;
    notes:string;
}
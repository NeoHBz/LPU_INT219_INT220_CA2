import { TrainerType } from "@/types/Trainer";

export interface ClassesList{
    id: string;
    name: string;
    trainer: Pick<TrainerType, "id" | "name" | "image">;
    type: string;
    schedule: string[];
    time: string;
    location: string;
    capacity: number;
    enrolled: number;
    status: string;
    days: number[];
}
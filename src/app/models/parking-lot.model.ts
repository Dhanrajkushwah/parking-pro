// src/app/models/parking-lot.model.ts
import { Slot } from './slot.model';

export interface ParkingLot {
  id: string;
  floors: number;
  slotsPerFloor: Slot[][];
}

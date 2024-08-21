// src/app/models/slot.model.ts
export interface Slot {
    slotNumber: number;
    vehicleType: 'car' | 'bike' | 'truck';
    occupied: boolean;
    ticket?: string;
  }
  
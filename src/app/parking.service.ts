// src/app/parking.service.ts
import { Injectable } from '@angular/core';
import { ParkingLot } from './models/parking-lot.model';
import { Slot } from './models/slot.model';


@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private parkingLot: ParkingLot;

  constructor() {
    this.parkingLot = this.initializeParkingLot('PR123', 3, 10); // Example with 3 floors and 10 slots per floor
  }

  private initializeParkingLot(id: string, floors: number, slotsPerFloor: number): ParkingLot {
    const slots: Slot[][] = [];

    for (let i = 0; i < floors; i++) {
      const floorSlots: Slot[] = [];
      for (let j = 1; j <= slotsPerFloor; j++) {
        const slot: Slot = {
          slotNumber: j,
          vehicleType: j === 1 ? 'truck' : j <= 3 ? 'bike' : 'car',
          occupied: false,
        };
        floorSlots.push(slot);
      }
      slots.push(floorSlots);
    }

    return { id, floors, slotsPerFloor: slots };
  }

  parkVehicle(vehicleType: 'car' | 'bike' | 'truck'): string | null {
    for (let floor = 0; floor < this.parkingLot.floors; floor++) {
      const availableSlot = this.parkingLot.slotsPerFloor[floor].find(
        (slot) => slot.vehicleType === vehicleType && !slot.occupied
      );
      if (availableSlot) {
        availableSlot.occupied = true;
        availableSlot.ticket = `${this.parkingLot.id}_${floor + 1}_${availableSlot.slotNumber}`;
        return availableSlot.ticket;
      }
    }
    return null;
  }

  unparkVehicle(ticket: string): boolean {
    const [id, floorStr, slotStr] = ticket.split('_');
    const floor = parseInt(floorStr) - 1;
    const slotNumber = parseInt(slotStr);

    if (id === this.parkingLot.id && this.parkingLot.slotsPerFloor[floor]) {
      const slot = this.parkingLot.slotsPerFloor[floor].find(
        (s) => s.slotNumber === slotNumber && s.ticket === ticket
      );
      if (slot) {
        slot.occupied = false;
        slot.ticket = undefined;
        return true;
      }
    }
    return false;
  }

  getAvailableSlots(vehicleType: 'car' | 'bike' | 'truck'): Slot[] {
    return this.parkingLot.slotsPerFloor
      .flat()
      .filter((slot) => slot.vehicleType === vehicleType && !slot.occupied);
  }

  getParkingLot(): ParkingLot {
    return this.parkingLot;
  }
}

// src/app/parking-form/parking-form.component.ts
import { Component } from '@angular/core';
import { ParkingService } from '../parking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.css'],
})
export class ParkingFormComponent {
  vehicleType: 'car' | 'bike' | 'truck' = 'car';
  ticket: string = '';

  constructor(private parkingService: ParkingService) {}

  parkVehicle() {
    const ticket = this.parkingService.parkVehicle(this.vehicleType);
    if (ticket) {
      // Swal alert for vehicle parked
      Swal.fire({
        icon: 'success',
        title: 'Vehicle parked!',
        text: `Vehicle data added successfully. Ticket: ${ticket}`,
        confirmButtonText: 'OK'
      });
    } else {
      // Swal alert for no available slot
      Swal.fire({
        icon: 'error',
        title: 'No Available Slot',
        text: 'No available slot for this vehicle type.',
        confirmButtonText: 'OK'
      });
    }
  }
  
  unparkVehicle() {
    const success = this.parkingService.unparkVehicle(this.ticket);
    if (success) {
      // Swal alert for successful unparking
      Swal.fire({
        icon: 'success',
        title: 'Vehicle unparked!',
        text: 'Vehicle unparked successfully!',
        confirmButtonText: 'OK'
      });
    } else {
      // Swal alert for invalid ticket
      Swal.fire({
        icon: 'error',
        title: 'Invalid Ticket',
        text: 'The ticket provided is invalid.',
        confirmButtonText: 'OK'
      });
    }
  }
}
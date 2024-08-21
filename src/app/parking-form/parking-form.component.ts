import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParkingService } from '../parking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.css'],
})
export class ParkingFormComponent implements OnInit {
  parkingForm!: FormGroup;

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.parkingForm = new FormGroup({
      vehicleType: new FormControl('car', Validators.required),
      ticket: new FormControl('', Validators.required),
    });
  }

  parkVehicle() {
    const vehicleType = this.parkingForm.get('vehicleType')?.value;
    const ticket = this.parkingService.parkVehicle(vehicleType);

    if (ticket) {
      // Swal alert for vehicle parked
      Swal.fire({
        icon: 'success',
        title: 'Vehicle parked!',
        text: `Vehicle data added successfully. Ticket: ${ticket}`,
        confirmButtonText: 'OK'
      });
      this.parkingForm.reset();
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
    const ticket = this.parkingForm.get('ticket')?.value;
    const success = this.parkingService.unparkVehicle(ticket);

    if (success) {
      // Swal alert for successful unparking
      Swal.fire({
        icon: 'success',
        title: 'Vehicle unparked!',
        text: 'Vehicle unparked successfully!',
        confirmButtonText: 'OK'
      });
      this.parkingForm.reset();
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

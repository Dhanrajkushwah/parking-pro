// src/app/parking-lot/parking-lot.component.ts
import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../parking.service';
import { ParkingLot } from '../models/parking-lot.model';


@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.css'],
})
export class ParkingLotComponent implements OnInit {
  parkingLot!: ParkingLot;

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.parkingLot = this.parkingService.getParkingLot();
  }
}

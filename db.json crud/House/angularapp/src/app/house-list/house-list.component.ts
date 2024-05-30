import { Component, OnInit } from '@angular/core';
import { House } from '../model/house.model'; // Importing the House interface
import { HouseService } from '../services/house.service'; // Importing the HouseService

@Component({
  selector: 'app-house-list', // Changed the component selector to app-house-list
  templateUrl: './house-list.component.html', // Assuming the template file is updated to house-list.component.html
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  houses: House[] = []; // Using the House interface

  constructor(private houseService: HouseService) { } // Injecting the HouseService

  ngOnInit(): void {
    this.getHouses(); // Changed the method name to getHouses
  }

  getHouses(): void {
    try {
      this.houseService.getHouses() // Fetching houses using HouseService
        .subscribe((res) => {
          console.log(res);
          this.houses = res; // Assigning the response to houses
        }, (err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("Err", err);
    }
  }

  deleteHouse(id: any): void { // Changed the method name to deleteHouse
    this.houseService.deleteHouse(id) // Deleting a house using HouseService
      .subscribe(() => {
        // Remove the deleted house from the list
        this.houses = this.houses.filter(house => house.id !== id);
      });
  }
}

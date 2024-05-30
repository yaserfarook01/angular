import { Component, OnInit } from '@angular/core';
import { Laptop } from '../model/laptop.model'; // Importing the Laptop interface
import { LaptopService } from '../services/laptop.service'; // Importing the LaptopService

@Component({
  selector: 'app-laptop-list', // Changed the component selector to app-laptop-list
  templateUrl: './laptop-list.component.html', // Assuming the template file is updated to laptop-list.component.html
  styleUrls: ['./laptop-list.component.css']
})
export class LaptopListComponent implements OnInit {
  laptops: Laptop[] = []; // Using the Laptop interface

  constructor(private laptopService: LaptopService) { } // Injecting the LaptopService

  ngOnInit(): void {
    this.getLaptops(); // Changed the method name to getLaptops
  }

  getLaptops(): void {
    try {
      this.laptopService.getLaptops() // Fetching laptops using LaptopService
        .subscribe((res) => {
          console.log(res);
          this.laptops = res; // Assigning the response to laptops
        }, (err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("Err", err);
    }
  }

  deleteLaptop(id: any): void { // Changed the method name to deleteLaptop
    this.laptopService.deleteLaptop(id) // Deleting a laptop using LaptopService
      .subscribe(() => {
        // Remove the deleted laptop from the list
        this.laptops = this.laptops.filter(laptop => laptop.id !== id);
      });
  }
}

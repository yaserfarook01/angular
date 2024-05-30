import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    try{
    this.carService.getCars()
      .subscribe((res) => {
       console.log(res)
        this.cars = res
      },(err)=>{
        console.log(err)
      });
  }catch(err){
    console.log("Err",err)
  }
}

  deleteCar(id: any): void {
    this.carService.deleteCar(id)
      .subscribe(() => {
        // Remove the deleted car from the list
        this.cars = this.cars.filter(car => car.id !== id);
      });
  }
}

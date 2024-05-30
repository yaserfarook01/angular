import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
 
  carForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private carService: CarService,
    private router: Router) {
// Define the form group with the necessary form controls and validators
this.carForm = this.formBuilder.group({
  model: ['', [Validators.required, Validators.maxLength(75)]],
  make: ['', Validators.required],
  year: ['', Validators.required],
  color: ['', Validators.required],
  mileage: ['', Validators.required],
});

}
  ngOnInit(): void {
  }
  addNewCar() {
    if (this.carForm.valid) {
        console.log(this.carForm.value);
        this.carService.addCar(this.carForm.value)
            .subscribe(
                (res) => {
                    console.log(res);
                    // Navigate to cars page only after successful addition
                    this.router.navigateByUrl('/cars');
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}


}


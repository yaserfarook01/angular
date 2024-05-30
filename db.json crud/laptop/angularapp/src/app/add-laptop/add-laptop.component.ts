import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LaptopService } from '../services/laptop.service'; // Importing the LaptopService

@Component({
  selector: 'app-add-laptop',
  templateUrl: './add-laptop.component.html',
  styleUrls: ['./add-laptop.component.css']
})
export class AddLaptopComponent implements OnInit {

  laptopForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private laptopService: LaptopService, // Assuming you have a LaptopService
    private router: Router
  ) {
    // Define the form group with the necessary form controls and validators
    this.laptopForm = this.formBuilder.group({
      brand: ['', [Validators.required, Validators.maxLength(50)]],
      model: ['', Validators.required],
      screenSize: ['', Validators.required],
      ram: ['', Validators.required],
      storage: ['', Validators.required],
      processor: ['', Validators.required],
      graphicsCard: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  addNewLaptop(): void {
    if (this.laptopForm.valid) {
        console.log(this.laptopForm.value);
        this.laptopService.addLaptop(this.laptopForm.value)
            .subscribe(
                (res) => {
                    console.log(res);
                    // Navigate to laptops page only after successful addition
                    this.router.navigateByUrl('/laptops');
                },
                (err) => {
                    console.log(err);
                }
            );
    }
  }
}

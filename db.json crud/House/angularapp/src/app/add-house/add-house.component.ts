import { Component, OnInit } from '@angular/core';
import { HouseService } from '../services/house.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit {

  houseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService,
    private router: Router
  ) {
    // Define the form group with the necessary form controls and validators
    this.houseForm = this.formBuilder.group({
      address: ['', [Validators.required, Validators.maxLength(75)]],
      type: ['', Validators.required],
      yearBuilt: ['', Validators.required],
      color: ['', Validators.required],
      size: ['', Validators.required],
      bedrooms: ['', Validators.required],  // Add bedrooms control
      bathrooms: ['', Validators.required] // Add bathrooms control
    });
  }

  ngOnInit(): void {}

  addNewHouse(): void {
    if (this.houseForm.valid) {
        console.log(this.houseForm.value);
        this.houseService.addHouse(this.houseForm.value)
            .subscribe(
                (res) => {
                    console.log(res);
                    // Navigate to houses page only after successful addition
                    this.router.navigateByUrl('/houses');
                },
                (err) => {
                    console.log(err);
                }
            );
    }
  }
}

// add-stock.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../services/stock.service'; // Importing the StockService

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  stockForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService, // Assuming you have a StockService
    private router: Router
  ) {
    // Define the form group with the necessary form controls and validators
    this.stockForm = this.formBuilder.group({
      symbol: ['', [Validators.required, Validators.maxLength(10)]],
      companyName: ['', Validators.required],
      price: ['', Validators.required],
      change: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  addNewStock(): void {
    if (this.stockForm.valid) {
      console.log(this.stockForm.value);
      this.stockService.addStock(this.stockForm.value)
        .subscribe(
          (res) => {
            console.log(res);
            // Navigate to stocks page only after successful addition
            this.router.navigateByUrl('/stocks');
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}

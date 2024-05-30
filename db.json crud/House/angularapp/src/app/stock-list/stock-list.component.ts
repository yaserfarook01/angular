// stock-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock.model';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(
        (stocks: Stock[]) => {
          this.stocks = stocks;
        },
        (error) => {
          console.error('Error fetching stocks:', error);
        }
      );
  }

  deleteStock(id: number): void {
    this.stockService.deleteStock(id)
      .subscribe(
        () => {
          this.stocks = this.stocks.filter(stock => stock.id !== id);
        },
        (error) => {
          console.error('Error deleting stock:', error);
        }
      );
  }
}

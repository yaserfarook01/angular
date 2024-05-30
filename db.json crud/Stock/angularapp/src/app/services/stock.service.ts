// stock.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private backendUrl = 'https://ide-adbcaabfacacdfbabefaaddbafbefbdcbddbeb.premiumproject.examly.io/proxy/3001/stocks'; // Update with your stock API endpoint

  constructor(private http: HttpClient) { }

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.backendUrl);
  }

  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.backendUrl, stock);
  }

  deleteStock(id: number): Observable<void> {
    const url = `${this.backendUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

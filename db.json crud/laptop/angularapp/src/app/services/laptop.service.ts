import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laptop } from '../model/laptop.model'; // Assuming you have a Laptop model

@Injectable({
  providedIn: 'root'
})
export class LaptopService {
  private backendUrl = 'https://ide-adbcaabfacacdfbabefaaddbafbefbdcbddbeb.premiumproject.examly.io/proxy/3001/laptops'; // Update with your laptop API endpoint

  constructor(private http: HttpClient) { }

  getLaptops(): Observable<Laptop[]> {
    return this.http.get<Laptop[]>(this.backendUrl);
  }

  addLaptop(laptop: Laptop): Observable<Laptop> {
    return this.http.post<Laptop>(this.backendUrl, laptop);
  }

  // Delete a laptop from the backend
  deleteLaptop(id: number): Observable<void> {
    const url = `${this.backendUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

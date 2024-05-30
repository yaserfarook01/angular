import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../model/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private backendUrl = 'https://ide-adbcaabfacacdfbabefaaddbafbefbdcbddbeb.premiumproject.examly.io/proxy/3001/cars'; 

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.backendUrl);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.backendUrl, car);
  }

  // Delete a car from the backend
  deleteCar(id: number): Observable<void> {
    const url = `${this.backendUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

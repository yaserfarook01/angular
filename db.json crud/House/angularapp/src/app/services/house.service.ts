import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House } from '../model/house.model';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private backendUrl = 'https://ide-adbcaabfacacdfbabefaaddbafbefbdcbddbeb.premiumproject.examly.io/proxy/3001/houses'; 

  constructor(private http: HttpClient) { }

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.backendUrl);
  }

  addHouse(house: House): Observable<House> {
    return this.http.post<House>(this.backendUrl, house);
  }

  // Delete a house from the backend
  deleteHouse(id: number): Observable<void> {
    const url = `${this.backendUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

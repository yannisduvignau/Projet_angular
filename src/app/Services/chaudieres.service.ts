import { Injectable } from '@angular/core';
import { chaudiere } from '../models/chaudiere.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChaudieresService {
  private serverURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getChaudieres(): Observable<chaudiere[]> {
    return this.http.get<chaudiere[]>(`${this.serverURL}/Chaudiere`);
  }

  getChaudById(id: number): Observable<chaudiere> {
    return this.http.get<chaudiere>(`${this.serverURL}/Chaudiere/${id}`);
  }
}

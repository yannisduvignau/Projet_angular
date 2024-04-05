import { Injectable } from '@angular/core';
import { intervention } from '../models/intervention.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, switchMap } from 'rxjs';
import { chaudiere } from '../models/chaudiere.model';

@Injectable({
  providedIn: 'root'
})
export class InterventionsService {
  private serverURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getInterventions(): Observable<intervention[]> {
    return this.http.get<intervention[]>(`${this.serverURL}/Intervention`);
  }

  getInterById(id: number): Observable<intervention> {
    return this.http.get<intervention>(`${this.serverURL}/Intervention/${id}`);
  }

  // Méthode pour récupérer la liste des chaudières
  getChaudiereList(): Observable<chaudiere[]> {
    return this.http.get<chaudiere[]>(`${this.serverURL}/Chaudiere`);
  }

  // Méthode pour récupérer la liste des chaudières
  getChaudiereById(id: number): Observable<chaudiere> {
    return this.http.get<chaudiere>(`${this.serverURL}/Chaudiere/${id}`);
  }

  // Méthode pour créer une nouvelle intervention
  createIntervention(newIntervention: intervention): Observable<intervention> {
    return this.getInterventions().pipe(
      switchMap(interventions =>
      {
      let maxId = 0;
      interventions.forEach (intervention => { maxId = (intervention.id > maxId ? intervention.id : maxId); } );
      newIntervention.id = maxId+1;
      return this.http.post<intervention>(`${this.serverURL}/Intervention`, newIntervention);
      }
     ));
  }

  //Méthode pour modifier une intervention
  modifInter(modifInter: intervention): Observable<intervention> {
    const url = `${this.serverURL}/Intervention/${modifInter.id}`;
    return this.http.put<intervention>(url, modifInter)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Méthode pour supprimer une intervention
  deleteIntervention(id: number): Observable<void> {
    return this.http.delete<void>(`${this.serverURL}/Intervention/${id}`);
  }

  // Fonction de gestion des erreurs
  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    throw error;
  }
}

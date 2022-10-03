import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Reclamo } from '../models/reclamo';

@Injectable({
    providedIn: 'root'
})
export class ReclamoService {
    private url = 'Reclamo';
  
    constructor(private http: HttpClient) {}
  
    public getReclamos(): Observable<Reclamo[]> {
      return this.http.get<Reclamo[]>(`${environment.apiUrl}/${this.url}`);
    }
  
    public updateReclamo(Reclamo: Reclamo): Observable<Reclamo[]> {
      return this.http.put<Reclamo[]>(
        `${environment.apiUrl}/${this.url}`,
        Reclamo
      );
    }
  
    public createReclamo(Reclamo: Reclamo): Observable<Reclamo[]> {
      return this.http.post<Reclamo[]>(
        `${environment.apiUrl}/${this.url}`,
        Reclamo
      );
    }
  
    public deleteReclamo(id: number): Observable<Reclamo[]> {
      return this.http.delete<Reclamo[]>(
        `${environment.apiUrl}/${this.url}/${id}`
      );
    }

    public getReclamoById(id: number): Observable<Reclamo> {
        return this.http.get<Reclamo>(`${environment.apiUrl}/${this.url}/ObtenerReclamo?id=${id}`);
    }
  }
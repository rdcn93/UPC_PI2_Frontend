import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Promocion } from '../models/promocion';

@Injectable({
    providedIn: 'root'
})
export class PromocionService {
    private url = 'Promocion';
  
    constructor(private http: HttpClient) {}
  
    public getPromociones(): Observable<Promocion[]> {
      return this.http.get<Promocion[]>(`${environment.apiUrl}/${this.url}`);
    }
  
    public updatePromocion(Promocion: Promocion): Observable<Promocion[]> {
      return this.http.put<Promocion[]>(
        `${environment.apiUrl}/${this.url}`,
        Promocion
      );
    }
  
    public createPromocion(Promocion: Promocion): Observable<Promocion[]> {
      return this.http.post<Promocion[]>(
        `${environment.apiUrl}/${this.url}`,
        Promocion
      );
    }
  
    public deletePromocion(id: number): Observable<Promocion[]> {
      return this.http.delete<Promocion[]>(
        `${environment.apiUrl}/${this.url}/${id}`
      );
    }

    public getPromocionById(id: number): Observable<Promocion> {
        return this.http.get<Promocion>(`${environment.apiUrl}/${this.url}/ObtenerPromocion?id=${id}`);
    }
  }
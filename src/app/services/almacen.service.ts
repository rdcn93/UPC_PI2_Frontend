import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Almacen } from '../models/almacen';

@Injectable({
    providedIn: 'root'
})
export class AlmacenService {
    private url = 'Almacen';
  
    constructor(private http: HttpClient) {}
  
    public getAlmacenes(): Observable<Almacen[]> {
      return this.http.get<Almacen[]>(`${environment.apiUrl}/${this.url}`);
    }
  
    public updateAlmacen(almacen: Almacen): Observable<Almacen[]> {
      return this.http.put<Almacen[]>(
        `${environment.apiUrl}/${this.url}`,
        almacen
      );
    }
  
    public createAlmacen(almacen: Almacen): Observable<Almacen[]> {
      return this.http.post<Almacen[]>(
        `${environment.apiUrl}/${this.url}`,
        almacen
      );
    }
  
    public deleteAlmacen(id: number): Observable<Almacen[]> {
      return this.http.delete<Almacen[]>(
        `${environment.apiUrl}/${this.url}/${id}`
      );
    }

    public getAlmacenById(id: number): Observable<Almacen> {
        return this.http.get<Almacen>(`${environment.apiUrl}/${this.url}/ObtenerAlmacen?id=${id}`);
    }
  }
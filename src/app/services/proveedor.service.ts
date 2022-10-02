import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../models/proveedor';

@Injectable({
    providedIn: 'root'
})
export class ProveedorService {
    private url = 'proveedor';
  
    constructor(private http: HttpClient) {}
  
    public getProveedores(): Observable<Proveedor[]> {
      return this.http.get<Proveedor[]>(`${environment.apiUrl}/${this.url}`);
    }
  
    public updateProveedor(Proveedor: Proveedor): Observable<Proveedor[]> {
      return this.http.put<Proveedor[]>(
        `${environment.apiUrl}/${this.url}`,
        Proveedor
      );
    }
  
    public createProveedor(Proveedor: Proveedor): Observable<Proveedor[]> {
      return this.http.post<Proveedor[]>(
        `${environment.apiUrl}/${this.url}`,
        Proveedor
      );
    }
  
    public deleteProveedor(id: number): Observable<Proveedor[]> {
      return this.http.delete<Proveedor[]>(
        `${environment.apiUrl}/${this.url}/${id}`
      );
    }

    public getProveedorById(id: number): Observable<Proveedor> {
        return this.http.get<Proveedor>(`${environment.apiUrl}/${this.url}/ObtenerProveedor?id=${id}`);
    }
  }
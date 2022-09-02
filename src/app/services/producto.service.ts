import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private url = 'Producto';
  
    constructor(private http: HttpClient) {}
  
    public getProductos(): Observable<Producto[]> {
      return this.http.get<Producto[]>(`${environment.apiUrl}/${this.url}`);
    }
  
    public updateProducto(Producto: Producto): Observable<Producto[]> {
      return this.http.put<Producto[]>(
        `${environment.apiUrl}/${this.url}`,
        Producto
      );
    }
  
    public createProducto(Producto: Producto): Observable<Producto[]> {
      console.log(Producto);
      return this.http.post<Producto[]>(
        `${environment.apiUrl}/${this.url}`,
        Producto
      );
    }
  
    public deleteProducto(id: number): Observable<Producto[]> {
      return this.http.delete<Producto[]>(
        `${environment.apiUrl}/${this.url}/${id}`
      );
    }

    public getProductoById(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${environment.apiUrl}/${this.url}/ObtenerProducto?id=${id}`);
    }
  }
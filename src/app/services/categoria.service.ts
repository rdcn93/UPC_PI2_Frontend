import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private url = 'categoria';
  
    constructor(private http: HttpClient) {}
  
    public getCategorias(): Observable<Categoria[]> {
      return this.http.get<Categoria[]>(`${environment.apiUrl}/${this.url}`);
    }
  
    public updateCategoria(Categoria: Categoria): Observable<Categoria[]> {
      return this.http.put<Categoria[]>(
        `${environment.apiUrl}/${this.url}`,
        Categoria
      );
    }
  
    public createCategoria(Categoria: Categoria): Observable<Categoria[]> {
      return this.http.post<Categoria[]>(
        `${environment.apiUrl}/${this.url}`,
        Categoria
      );
    }
  
    public deleteCategoria(id: number): Observable<Categoria[]> {
      return this.http.delete<Categoria[]>(
        `${environment.apiUrl}/${this.url}/${id}`
      );
    }

    public getCategoriaById(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${environment.apiUrl}/${this.url}/ObtenerCategoria?id=${id}`);
    }
  }
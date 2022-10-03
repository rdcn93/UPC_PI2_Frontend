import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private url = 'Usuario';
  
    constructor(private http: HttpClient) {}
  
    public getUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(`${environment.apiUrl}/${this.url}`);
    }
  
    public updateUsuario(usuario: Usuario): Observable<Usuario[]> {
      return this.http.put<Usuario[]>(
        `${environment.apiUrl}/${this.url}`,
        usuario
      );
    }
  
    public createUsuario(usuario: Usuario): Observable<Usuario[]> {
      
      return this.http.post<Usuario[]>(
        `${environment.apiUrl}/${this.url}`,
        usuario
      );
    }
  
    public deleteUsuario(id: number): Observable<Usuario[]> {
      return this.http.delete<Usuario[]>(
        `${environment.apiUrl}/${this.url}/${id}`
      );
    }

    public getUsuarioById(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${environment.apiUrl}/${this.url}/ObtenerUsuario?id=${id}`);
    }
  }
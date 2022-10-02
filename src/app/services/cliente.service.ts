import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private url = 'Cliente';
  
    constructor(private http: HttpClient) {}
  
    public getClientes(): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(`${environment.apiUrl}/${this.url}`);
    }
  
    public updateCliente(cliente: Cliente): Observable<Cliente[]> {
      return this.http.put<Cliente[]>(
        `${environment.apiUrl}/${this.url}`,
        cliente
      );
    }
  
    public createCliente(cliente: Cliente): Observable<Cliente[]> {
      return this.http.post<Cliente[]>(
        `${environment.apiUrl}/${this.url}`,
        cliente
      );
    }
  
    public deleteCliente(id: number): Observable<Cliente[]> {
      return this.http.delete<Cliente[]>(
        `${environment.apiUrl}/${this.url}/${id}`
      );
    }

    public getClienteById(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${environment.apiUrl}/${this.url}/ObtenerCliente?id=${id}`);
    }
  }
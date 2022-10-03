import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol';
import { TipoDocumento } from '../models/tipoDocumento';

@Injectable({
    providedIn: 'root'
})
export class TipoDocumentoService {
    private url = 'TipoDocumento';
  
    constructor(private http: HttpClient) {}
  
    public getTipoDocumentos(): Observable<TipoDocumento[]> {
      return this.http.get<TipoDocumento[]>(`${environment.apiUrl}/${this.url}`);
    }
  }
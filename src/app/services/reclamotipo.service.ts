import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ReclamoTipo } from '../models/reclamoTipo';

@Injectable({
    providedIn: 'root'
})
export class ReclamoTipoService {
    private url = 'ReclamoTipo';
  
    constructor(private http: HttpClient) {}
  
    public getReclamoTipos(): Observable<ReclamoTipo[]> {
      return this.http.get<ReclamoTipo[]>(`${environment.apiUrl}/${this.url}`);
    }
  }
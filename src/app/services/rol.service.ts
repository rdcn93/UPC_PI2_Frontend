import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol';

@Injectable({
    providedIn: 'root'
})
export class RolService {
    private url = 'Rol';
  
    constructor(private http: HttpClient) {}
  
    public getRoles(): Observable<Rol[]> {
      return this.http.get<Rol[]>(`${environment.apiUrl}/${this.url}`);
    }
  }
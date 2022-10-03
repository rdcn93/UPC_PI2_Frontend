import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HTTP_OPTIONS_EXCEL } from '../helper/headers';
import { FiltroReporte } from '../models/filtroReporte';
import { ReporteReclamos } from '../models/reportes/reporteReclamos';

@Injectable({
    providedIn: 'root'
})
export class ReporteService {
    private url = 'Reporte';
  
    constructor(private http: HttpClient) {}
  
    public ObtenerReporteVentas(filtro: FiltroReporte): Observable<ReporteReclamos[]> {
      return this.http.post<ReporteReclamos[]>(
        `${environment.apiUrl}/${this.url}/ObtenerReporteVentas`,
        filtro
      );
    }

    public ObtenerReportePedidos(filtro: FiltroReporte): Observable<ReporteReclamos[]> {
      return this.http.post<ReporteReclamos[]>(
        `${environment.apiUrl}/${this.url}/ObtenerReportePedidos`,
        filtro
      );
    }

    public ObtenerReporteStock(filtro: FiltroReporte): Observable<ReporteReclamos[]> {
      return this.http.post<ReporteReclamos[]>(
        `${environment.apiUrl}/${this.url}/ObtenerReporteStock`,
        filtro
      );
    }

    public ObtenerReporteReclamos(filtro: FiltroReporte): Observable<ReporteReclamos[]> {
      return this.http.post<ReporteReclamos[]>(
        `${environment.apiUrl}/${this.url}/ObtenerReporteReclamos`,
        filtro
      );
    }
    
    public DescargarReporteReclamos(filtro: FiltroReporte) {
      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      return this.http.post(`${environment.apiUrl}/${this.url}/ObtenerReporteReclamos`,filtro,
        {
          headers: headers,
          responseType: "arraybuffer"
        }
      )
    }

    public DescargarReporteReclamos1(filtro: FiltroReporte) {
      return this.http.post<any>(`${environment.apiUrl}/${this.url}/ObtenerReporteReclamos`,
      filtro, HTTP_OPTIONS_EXCEL);
    }

    public ObtenerReporteDelivery(filtro: FiltroReporte): Observable<ReporteReclamos[]> {
      return this.http.post<ReporteReclamos[]>(
        `${environment.apiUrl}/${this.url}/ObtenerReporteDelivery`,
        filtro
      );
    }

  
  }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HTTP_OPTIONS_EXCEL } from '../helper/headers';
import { FiltroReporte } from '../models/filtroReporte';
import { ReporteDelivery } from '../models/reportes/reporteDelivery';
import { ReportePedidos } from '../models/reportes/reportePedidos';
import { ReporteReclamos } from '../models/reportes/reporteReclamos';
import { ReporteStock } from '../models/reportes/reporteStock';
import { ReporteVentas } from '../models/reportes/reporteVentas';

@Injectable({
    providedIn: 'root'
})
export class ReporteService {
    private url = 'Reporte';
  
    constructor(private http: HttpClient) {}
  
    public ObtenerReporteVentas(filtro: FiltroReporte): Observable<ReporteVentas[]> {
      return this.http.post<ReporteVentas[]>(
        `${environment.apiUrl}/${this.url}/ObtenerReporteVentas`,
        filtro
      );
    }

    public DescargarReporteVentas(filtro: FiltroReporte) { 
      return this.http.post(`${environment.apiUrl}/${this.url}/ExcelReporteVentas`,  filtro,
      {
        // reportProgress: true,
        observe: 'response',
        responseType: 'blob'
      }); 
    }

    public ObtenerReportePedidos(filtro: FiltroReporte): Observable<ReportePedidos[]> {
      return this.http.post<ReportePedidos[]>(
        `${environment.apiUrl}/${this.url}/ObtenerReportePedidos`,
        filtro
      );
    }

    public DescargarReportePedidos(filtro: FiltroReporte) { 
      return this.http.post(`${environment.apiUrl}/${this.url}/ExcelReportePedidos`,  filtro,
      {
        // reportProgress: true,
        observe: 'response',
        responseType: 'blob'
      }); 
    }

    public ObtenerReporteStock(filtro: FiltroReporte): Observable<ReporteStock[]> {
      return this.http.post<ReporteStock[]>(
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

    public ObtenerReporteDelivery(filtro: FiltroReporte): Observable<ReporteDelivery[]> {
      return this.http.post<ReporteDelivery[]>(
        `${environment.apiUrl}/${this.url}/ObtenerReporteDelivery`,
        filtro
      );
    }

  }
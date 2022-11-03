import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Migracion } from '../models/migracion';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  private url = 'Archivos';

  constructor(private http: HttpClient) { }

  public getArchivos(): Observable<Migracion[]> {
    return this.http.get<Migracion[]>(`${environment.apiUrl}/${this.url}`);
  }

  public uploadFile(file: any): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(`${environment.apiUrl}/${this.url}`, formData);
  }

  public download(fileName: string) {
    return this.http.get(`${environment.apiUrl}/${this.url}/DownloadFile?fileName=${fileName}`, {
      // reportProgress: true,
      observe: 'response',
      responseType: 'blob'
    });
  }

  public deleteArchivo(fileName: string): Observable<Migracion[]> {
    return this.http.delete<Migracion[]>(
      `${environment.apiUrl}/${this.url}/${fileName}`
    );
  }

  public ProcesarMigracion(fileName: string) {
    return this.http.post(
      `${environment.apiUrl}/${this.url}/ProcesarMigracion`,
      fileName
    );
  }
}
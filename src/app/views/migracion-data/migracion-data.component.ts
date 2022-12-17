import { HttpClient, HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { Migracion } from 'src/app/models/migracion';
import { ArchivoService } from 'src/app/services/archivo.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-migracion-data',
  templateUrl: './migracion-data.component.html',
  styleUrls: ['./migracion-data.component.scss']
})
export class MigracionDataComponent implements OnInit {
  private url = 'Archivos';
  puedeProcesar: boolean = true;
  progress: number = 0;
  message: string = "";
  ListaArchivos?: Observable<Migracion[]>;
  ListaArchivos1?: Observable<Migracion[]>;
  ModalVisible = false;
  successMessageSuccess = "";
  successMessageError = "";
  @Output() public onUploadFinished = new EventEmitter();
  @Input()
  fileUrl!: string;
  @ViewChild('file')
  file!: ElementRef;

  @BlockUI()
  blockUI!: NgBlockUI;

  constructor(private http: HttpClient,
    private archivoService: ArchivoService,
    private toastr: ToastrService) {

    // this.blockUI.start('Loading...'); // Start blocking

    // setTimeout(() => {
    //   this.blockUI.stop(); // Stop blocking
    // }, 5000);
  }

  ngOnInit(): void {
    this.getProductosList();

  }

  getProductosList() {
    this.ListaArchivos1 = this.archivoService.getArchivos();
    this.ListaArchivos = this.ListaArchivos1;

    this.ListaArchivos1.subscribe(archivos => {
      // var iniciados = archivos.filter(e => e.idEstado === 2);
      // this.puedeProcesar = iniciados.length > 0 ? false : true;
    });

  }

  uploadFile = (files: any) => {
    debugger;
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(`${environment.apiUrl}/${this.url}`, formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            // this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);

            this.ClearFile();
            this.toastr.success('Archivo subido correctamente');
            this.getProductosList();
          }
        },
        error: (err: HttpErrorResponse) => {

          this.ClearFile();

          if (err != undefined && err != null) {
            err.error.forEach((e: string | undefined) => {
              this.toastr.success(e);
            });
          }

        }
      });
  }

  downloadFile(fileName: string): void {
    // this.bloquearPagina("Descargando Archivo");

    this.archivoService.download(fileName).subscribe(response => {
      let fileNameD = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
      let blob: Blob = response.body as Blob;
      if (fileName != undefined) {
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
        document.body.removeChild(a);
      }
      // this.desbloquearPagina();

    });
  }

  // download = (fileName: string) => {
  //   this.archivoService.download(fileName).subscribe((event: any) => {
  //     if (event.type === HttpEventType.UploadProgress)
  //       this.progress = Math.round((100 * event.loaded) / event.total);
  //     else if (event.type === HttpEventType.Response) {
  //       debugger;
  //       this.message = 'Download success.';
  //       // this.downloadFile(event);
  //       const downloadedFile = new Blob([event.body], { type: event.body.type });
  //       const a = document.createElement('a');
  //       a.setAttribute('style', 'display:none;');
  //       document.body.appendChild(a);
  //       a.download = this.fileUrl;
  //       a.href = URL.createObjectURL(downloadedFile);
  //       a.target = '_blank';
  //       a.click();
  //       document.body.removeChild(a);
  //     }
  //   });
  // }

  public DeleteArchivo = (fileName: string) => {
    if (confirm('Quieres eliminar este Producto?')) {
      this.archivoService.deleteArchivo(fileName)
        .subscribe({
          next: (_) => {
            debugger;
            // this.successMessageSuccess = 'Archivo eliminado correctamente';
            this.toastr.success('Archivo eliminado correctamente');
            this.getProductosList();
          },
          error: (err: HttpErrorResponse) => {
            debugger;
            this.toastr.success('Ocurrió un error al eliminar el producto');
          }
        })
    }
  }

  ProcesarMigracion = () => {
    this.archivoService.ProcesarMigracion("").subscribe({
      next: () => {        
        this.toastr.success('Migración procesada correctamente','Mensaje', { progressBar: true });
        this.getProductosList();
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    }); 
  }

  public ClearFile() {
    this.progress = 0;
    this.file.nativeElement.value = null;
  }

  public bloquearPagina(message?: string){
    this.blockUI.start(message);
  }

  public desbloquearPagina(){
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
    }, 1000);
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { TipoDocumento } from 'src/app/models/tipoDocumento';
import { TipoDocumentoService } from 'src/app/services/tipoDocumento.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cliente-add-edit',
  templateUrl: './cliente-add-edit.component.html',
  styleUrls: ['./cliente-add-edit.component.scss']
})
export class ClienteAddEditComponent implements OnInit {
  TipoDocumentos?: Observable<TipoDocumento[]>;
  TipoDocumentos2?: TipoDocumento[];
  productForm: any;
  nuevoCliente: boolean = true;
  ClienteId = 0;
  titulo = "Registrar Cliente";
  tipoDocId = 0;

  constructor(
    private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ClienteService: ClienteService,
    private TipoDocumentoService: TipoDocumentoService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.ClienteId = this.route.snapshot.params['id'];

    if(this.ClienteId != undefined && this.ClienteId != 0){
      this.nuevoCliente = false;
      this.titulo = "Editar Cliente";
      this.ProductDetailsToEdit(this.ClienteId);
    }

    this.productForm = this.formbulider.group({
      nombre: ['', [Validators.required]],
      apePaterno: ['', [Validators.required]],
      apeMaterno: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      idTipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
      enviarPromociones: ['', ''],
    });

    this.getTipoDocumentosList();

    this.productForm.controls['idTipoDocumento'].setValue(this.tipoDocId != 0 ? this.tipoDocId : 1);
    this.productForm.controls['enviarPromociones'].setValue(false);  
  }

  getTipoDocumentosList() {
    this.TipoDocumentos = this.TipoDocumentoService.getTipoDocumentos();    
  }

  PostProduct(product: Cliente) {
    if(this.productForm.invalid){
      alert("Formulario incorrecto");
      return;

    }
    const product_Master = this.productForm.value;
    
  
    this.ClienteService.createCliente(product_Master).subscribe({
      next: () => {
        this.router.navigate(['./','cliente']);
        this.toastr.success('Cliente registrado correctamente');
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    }); 
  }


  Clear(product: Cliente){
    this.nuevoCliente = true;
    this.productForm.reset();
  }

  ProductDetailsToEdit(id: number) {
    this.nuevoCliente = false;
    this.ClienteService.getClienteById(id).subscribe(productResult => {      
      this.ClienteId = productResult.id;
      this.productForm.controls['nombre'].setValue(productResult.nombre);     
      this.productForm.controls['apePaterno'].setValue(productResult.apePaterno);
      this.productForm.controls['apeMaterno'].setValue(productResult.apeMaterno);
      this.productForm.controls['direccion'].setValue(productResult.direccion);
      this.productForm.controls['telefono'].setValue(productResult.telefono);
      this.productForm.controls['idTipoDocumento'].setValue(productResult.idTipoDocumento);
      this.productForm.controls['numeroDocumento'].setValue(productResult.numeroDocumento);
      this.productForm.controls['enviarPromociones'].setValue(productResult.enviarPromociones);

      this.tipoDocId = productResult.idTipoDocumento;
    });
  }

  UpdateProduct(Cliente: Cliente) {
    Cliente.id = this.ClienteId;
    const product_Master = this.productForm.value;
  

    this.ClienteService.updateCliente(Cliente).subscribe({
      next: () => {
        this.toastr.success('Cliente actualizado correctamente');
        this.router.navigateByUrl('/cliente');
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    });
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}

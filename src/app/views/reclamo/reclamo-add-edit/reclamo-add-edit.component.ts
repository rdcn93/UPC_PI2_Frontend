import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Reclamo } from 'src/app/models/reclamo';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ReclamoTipo } from 'src/app/models/reclamoTipo';
import { ReclamoTipoService } from 'src/app/services/reclamotipo.service';

@Component({
  selector: 'app-reclamo-add-edit',
  templateUrl: './reclamo-add-edit.component.html',
  styleUrls: ['./reclamo-add-edit.component.scss']
})
export class ReclamoAddEditComponent implements OnInit {
  TiposReclamo?: Observable<ReclamoTipo[]>;
  TiposReclamo2?: ReclamoTipo[];
  productForm: any;
  nuevoReclamo: boolean = true;
  ReclamoId = 0;
  titulo = "Registrar Reclamo";
  tipoReclamoId = 0;
  constructor(
    private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ReclamoService: ReclamoService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService,
    private ReclamoTipoService: ReclamoTipoService
    ) { }

  ngOnInit(): void {
    this.ReclamoId = this.route.snapshot.params['id'];

    if(this.ReclamoId != undefined && this.ReclamoId != 0){
      this.nuevoReclamo = false;
      this.titulo = "Editar Reclamo";
      this.ProductDetailsToEdit(this.ReclamoId);
    }

    this.productForm = this.formbulider.group({
      idUsuario: ['', [Validators.required]],
      idTipoReclamo: ['', [Validators.required]],
      idPedido: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      respuesta: ['',''],
    });

    this.getRiposReclamoList();

    if(this.tipoReclamoId != 0){
      this.productForm.controls['idTipoReclamo'].setValue(this.tipoReclamoId);  
    }
  }

  getRiposReclamoList() {
    this.TiposReclamo = this.ReclamoTipoService.getReclamoTipos();    
  }

  PostProduct(product: Reclamo) {
    if(this.productForm.invalid){
      alert("Formulario incorrecto");
      return;

    }
    const product_Master = this.productForm.value;
    
   

    this.ReclamoService.createReclamo(product_Master).subscribe({
      next: () => {
        this.router.navigate(['./','reclamo']);
        this.toastr.success('Reclamo registrado correctamente');
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    }); 
  }

  Clear(product: Reclamo){
    this.nuevoReclamo = true;
    this.productForm.reset();
  }

  ProductDetailsToEdit(id: number) {
    this.nuevoReclamo = false;
    this.ReclamoService.getReclamoById(id).subscribe(productResult => {      
      this.ReclamoId = productResult.id;
      this.productForm.controls['idUsuario'].setValue(productResult.idUsuario);     
      this.productForm.controls['idPedido'].setValue(productResult.idPedido);
      this.productForm.controls['idTipoReclamo'].setValue(productResult.idTipoReclamo);
      this.productForm.controls['detalle'].setValue(productResult.detalle);
      this.productForm.controls['respuesta'].setValue(productResult.respuesta);

      this.tipoReclamoId = productResult.idTipoReclamo;
    });
  }

  UpdateProduct(Reclamo: Reclamo) {
    Reclamo.id = this.ReclamoId;
    const product_Master = this.productForm.value;


    this.ReclamoService.updateReclamo(Reclamo).subscribe({
      next: () => {
        this.toastr.success('Reclamo actualizado correctamente');
        this.router.navigateByUrl('/reclamo');
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

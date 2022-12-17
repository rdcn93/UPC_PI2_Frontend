import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { FormBuilder, Validators } from '@angular/forms';
import { FiltroReporte } from 'src/app/models/filtroReporte';
import { ReporteService } from 'src/app/services/reporte.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ReporteReclamos } from 'src/app/models/reportes/reporteReclamos';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-consulta-reclamos',
  templateUrl: './consulta-pedidos.component.html',
  styleUrls: ['./consulta-pedidos.component.scss']
})
export class ConsultaPedidosComponent implements OnInit {
  ResultReporte?: any;
  productForm: any;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  destroySubject$: Subject<void> = new Subject();
  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reporteService: ReporteService,
    private toastr: ToastrService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      fecInicio: ['', [Validators.required]],
      fecFin: ['', [Validators.required]],
      idPedido: ['', ''],
    });
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
      date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
      this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  GenerarReporte(filtro: FiltroReporte) {
    // if(this.productForm.invalid){
    //   alert("Formulario incorrecto");
    //   return;
    // }
    const user = this.productForm.value;
    const fecIni = this.fromDate;
    const fecFin = this.toDate;

    if (fecIni != null && fecIni != undefined) {
      user.fecInicio = new Date(fecIni.year, fecIni.month - 1, fecIni.day);
    } else {
      user.fecInicio = new Date()
    }

    if (fecFin != null && fecFin != undefined) {
      user.fecFin = new Date(fecFin.year, fecFin.month - 1, fecFin.day);
    } else {
      user.fecFin = new Date()
    }

    user.idPedido = user.idPedido == "" ? 0 : user.idPedido;
    user.producto = "";
    
    this.ResultReporte = this.reporteService.ObtenerReportePedidos(user);

  }

  DescargarReporte(filtro: FiltroReporte): void {
    const user = this.productForm.value;
    const fecIni = this.fromDate;
    const fecFin = this.toDate;

    if (fecIni != null && fecIni != undefined) {
      user.fecInicio = new Date(fecIni.year, fecIni.month - 1, fecIni.day);
    } else {
      user.fecInicio = new Date()
    }

    if (fecFin != null && fecFin != undefined) {
      user.fecFin = new Date(fecFin.year, fecFin.month - 1, fecFin.day);
    } else {
      user.fecFin = new Date()
    }

    user.idPedido = user.idPedido == "" ? 0 : user.idPedido;

    this.reporteService.DescargarReportePedidos(user).subscribe(response => {
      let fileNameD = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
      let blob: Blob = response.body as Blob;
      if (fileNameD != undefined) {
        let a = document.createElement('a');
        a.download = fileNameD;
        a.href = window.URL.createObjectURL(blob);
        a.click();
        document.body.removeChild(a);
      }

    });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }
}

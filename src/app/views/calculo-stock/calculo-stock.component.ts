import { Component, OnInit } from '@angular/core';
// import { Chart, registerables } from 'chart.js';
// import Chart from 'chart.js/auto';
import { Observable, Subject } from 'rxjs';
import { FiltroReporte } from 'src/app/models/filtroReporte';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { NgbDate, NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ReclamoTipo } from 'src/app/models/reclamoTipo';
import { ReporteService } from 'src/app/services/reporte.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculo-stock',
  templateUrl: './calculo-stock.component.html',
  styleUrls: ['./calculo-stock.component.scss']
})
export class CalculoStockComponent implements OnInit {
  result: any;
  cantidadReal: any;
  cantidadPronostico: any;
  fechasPronostico: any;
  chart: any = [];
  ListaProductos?: Observable<Producto[]>;
  ListaProductos1?: Observable<Producto[]>;

  ResultReporte?: any;
  productForm: any;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  TiposReclamo: ReclamoTipo[] = [{id: 0, nombre :"-- Seleccione --", descripcion : ""}];
  TiposReclamo2?: ReclamoTipo[];

  destroySubject$: Subject<void> = new Subject();

  constructor(private calendar: NgbCalendar,
      private productoService: ProductoService,
      private reporteService: ReporteService,
      public formatter: NgbDateParserFormatter,
      private formbuilder: FormBuilder) {
    // Chart.register(...registerables);
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
   }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      fecInicio: ['', [Validators.required]],
      fecFin: ['', [Validators.required]],
      idPedido: ['', ''],
      idTipoReclamo: ['', ''],
    });


    this.obtenerPronosticos();
  }

  obtenerPronosticos(){
    this.productoService.getProductos().subscribe(productResult => {  
      this.fechasPronostico = productResult.map((coins: any) => coins.nombre);
      this.cantidadPronostico = productResult.map((coins: any) => coins.precio);
      this.cantidadReal = productResult.map((coins: any) => coins.id);

      this.createChart();
    });

    
  }

  createChart(){
    
    // this.chart = new Chart('canvas', {
    //   type: 'line',
    //   data: {
    //     labels: this.coinName,
    //     datasets: [
    //       {
    //         data: this.coinPrice,
    //         borderColor: '#3e95cd',
    //         fill: false,
    //         label: 'Coin Price',
    //         backgroundColor: 'rgba(93, 175, 89, 0.1)',
    //         borderWidth: 3,
    //       },
    //     ],
    //   },
    // });


    // this.chart = {
    //   type: 'bar', //this denotes tha type of chart

    //   data: {// values on X-Axis
    //     labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
		// 						 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	  //      datasets: [
    //       {
    //         label: "Sales",
    //         data: ['467','576', '572', '79', '92',
		// 						 '574', '573', '576'],
    //         backgroundColor: 'blue'
    //       },
    //       {
    //         label: "Profit",
    //         data: ['542', '542', '536', '327', '17',
		// 							 '0.00', '538', '541'],
    //         backgroundColor: 'limegreen'
    //       }  
    //     ]
    //   },
    //   options: {
    //     aspectRatio:2.5
    //   }
      
    // };
    
    this.chart = {
      labels: this.fechasPronostico,
      datasets: [
        {
          label: 'Cantidad Pronóstico',
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
          borderColor: 'rgba(220, 220, 220, 1)',
          pointBackgroundColor: 'rgba(220, 220, 220, 1)',
          pointBorderColor: '#fff',
          data: this.cantidadPronostico
        }
        ,
        {
          label: 'Cantidad Real',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: 'rgba(151, 187, 205, 1)',
          pointBackgroundColor: 'rgba(151, 187, 205, 1)',
          pointBorderColor: '#fff',
          data: this.cantidadReal
        }
      ]
    };
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
    user.idTipoReclamo = user.idTipoReclamo == "" ? 0 : user.idTipoReclamo;

    this.ResultReporte = this.reporteService.ObtenerReporteReclamos(user);

  }

  DescargarReporte(filtro: FiltroReporte) {
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

    
  }

}

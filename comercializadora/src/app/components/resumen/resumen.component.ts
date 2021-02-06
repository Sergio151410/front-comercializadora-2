import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';

export interface IDetalle {
  venta:IVenta[];
}



@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  DETALLE_DATA: IDetalle[] = [
  ];

  date:Date;
  checked = false;
  adeudo = false;
  disabled = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public detalle:{detalle:IVenta[]}, 
  @Inject(MAT_DIALOG_DATA) public empleado:{empleado:Empleado}, 
  @Inject(MAT_DIALOG_DATA) public cliente:{cliente:Cliente},
  @Inject(MAT_DIALOG_DATA) public gTotal:{gTotal:number},
    public ventaService:VentaService) { 
    
    this.DETALLE_DATA.push({venta: this.detalle.detalle});
  }

  ngOnInit(): void {
    console.log('alias '+ JSON.stringify(this.DETALLE_DATA));
    console.log('empleado '+ JSON.stringify(this.empleado));
    console.log('cliente '+ JSON.stringify(this.cliente));
    this.date = new Date();
  }

  displayedColumns: string[] = ['No','Des','Cantidad','Costo','Total'];
  dataSource = this.DETALLE_DATA;

  finalizarVenta() {  
    Swal.fire({
      title: 'Generando Venta...'
    });
   Swal.showLoading();
   setTimeout(() => {
    let result = this.ventaService.generarVenta(this.detalle);
    console.info(result);
    Swal.fire({
      title: 'Venta Realizada',
      icon: 'success'
    });
   }, 1000);
   
  }
}
export interface IFruta {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
}
export interface IVenta {
  id: number;
  fruta: IFruta;
  costo: number;
  cantidad: number;
  total: number;
  }

  export interface Empleado {
    id: number;
    nombre: string;
  }
  export interface Cliente {
    id: number;
    nombre: string;
  }
  
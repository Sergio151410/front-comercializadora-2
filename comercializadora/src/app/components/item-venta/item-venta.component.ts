import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ObservadorService} from 'src/app/services/observador.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ResumenComponent } from '../resumen/resumen.component';

@Component({
  selector: 'app-item-venta',
  templateUrl: './item-venta.component.html',
  styleUrls: ['./item-venta.component.css']
})


export class ItemVentaComponent implements OnInit {
  
  @Input() flagVenta;

  frutas: IFruta[] = [
    {id: 1, nombre: 'Naranja', precio: 30.0, imagen: '../../assets/img/fresa.jpg'},
    {id: 1, nombre: 'Guayaba', precio: 10.0, imagen: '../../assets/img/fresa.jpg'},
    {id: 1, nombre: 'Uva', precio: 32.0, imagen: '../../assets/img/producto_1.png'},
    {id: 1, nombre: 'Sandia', precio: 10.0, imagen: '../../assets/img/producto_1.png'},
    {id: 1, nombre: 'Durazno', precio: 20.0, imagen: '../../assets/img/producto_1.png'},
    {id: 1, nombre: 'Fresa', precio: 20.0, imagen: '../../assets/img/producto_1.png'},
    {id: 1, nombre: 'Mandarina', precio: 25.0, imagen: '../../assets/img/fresa.jpg'},
    {id: 1, nombre: 'Jitomate', precio: 34.0, imagen: '../../assets/img/fresa.jpg'}
  ];
  
  

  venta: IVenta[] = [];
  gTotal: number = 0;
  empleado: Empleado;
  cliente: Cliente;
  
  empleados:Empleado[] = [{id:1, nombre:'Maricruz Gonzalez'},{id:2, nombre:'Maricruz Gonzalez'}];
  clientes: Cliente[] = [{id:1, nombre:'Maricruz Gonzalez'},{id:2, nombre:'Maricruz Gonzalez'}];

  constructor(public dialog: MatDialog) {
   }
  

  ngOnInit(): void { 
    console.log(this.flagVenta);
    this.creaVenta(this.flagVenta);

    //this.empleado = {id:0,nombre:"Seleccionar Empleado"};
    //this.cliente = {id:0,nombre:"Seleccionar Cliente"};

    this.validaLocalStorage();
    
  }


  
  creaVenta(noVenta) {
    this.flagVenta = 'v'+(parseInt(noVenta)+1);
    console.log('Estoy en la venta {}',this.flagVenta);
  }
  

  validaLocalStorage() {
     if (localStorage.getItem(this.flagVenta) !== undefined && localStorage.getItem(this.flagVenta)) {
      let tmpV = JSON.parse(localStorage.getItem(this.flagVenta));
      this.venta = JSON.parse(localStorage.getItem(this.flagVenta))[0];
      this.gTotal = tmpV[1];
      this.empleado = tmpV[2];
      this.cliente = tmpV[3];
    }
  }
  async verFruta(e, fruta) {
    this.muestraModal(fruta);
  }

  async muestraModal(fruta:IFruta)   {
    const { value: formValues } = await Swal.fire({
      title: fruta.nombre,
      html:
        '<img src="'+fruta.imagen+'" class="frutaImg" style="width:150px; height:150px;">' +
        '<br><br><br>'+
        '<h3 style="text-align:start; 0 -13px -10px -13px;">Ingresa el precio de venta:</h3>' +
        '<input id="precioInput" autocomplete="off" class="swal2-input" style="width:60px; position:absolute; margin:-46px 0px 0 60px;">' +
        '<h3 style="text-align:start; 0 -13px -10px -13px;">Ingresa la cantidad de Kg:</h3>' +
        '<input id="cantidadInput" class="swal2-input" autocomplete="off" style="width:60px;position:absolute; margin:-46px 0px 0 60px;">' +
        '<br><br>'+
        '<div style="text-align:start; 0 -13px -10px -13px;"> <label>Utilizar precio actual: <strong>$'+fruta.precio+'</strong></label> '+
        '<input type="checkbox" id="flagPrecioActual"  onChange="isCheck($event)" class="swal2-input" style="width:60px;position:absolute; margin: -11px 0px 0 0px; color:blue!important;"/> </div>'+
        '<br><br>'+
        '<div id="validaciones"></div>',

      focusConfirm: false,
      confirmButtonText: "Agregar",
      preConfirm: () => {
        let precio = (document.getElementById("precioInput") as HTMLTextAreaElement).value; 
        let cantidad = (document.getElementById("cantidadInput") as HTMLTextAreaElement).value; 
        let precioActual = ((document.getElementById("flagPrecioActual") as HTMLInputElement).checked).toString();           
          return [
            precio,
            cantidad,
            precioActual
          ]
        
        
      }
    })
    
    if (formValues) {
      this.agregarCanasta(formValues, fruta);
      this.setLocalStorageVenta();
    }
  }

  
  agregarCanasta(formValues:string[], fruta:IFruta) {
    let costo = 0;
    let flagCosto = formValues[2];
    if (flagCosto === 'true') {
      costo = fruta.precio;
    } else {
      costo = parseFloat(formValues[0]);
    }
    let cantidad = parseFloat(formValues[1]);
    let total = costo * cantidad;
    let id = this.venta.length;
    
    let row:IVenta = {
      id: id,
      fruta: fruta,
      costo: costo,
      cantidad : cantidad,
      total: total
    }
    if (this.exist(fruta)) {
      if (this.validaMismoPrecio(costo, fruta)) {
          this.actualizaRegistro(row);
      } else {
          this.agregaCanastaDiferentePrecio(row);
      }
    } else {
      this.venta.push(row);
      Swal.fire(
        'Registro Agregado',
        'Se agregó el producto a la canasta',
        'success'
      )
    }
    this.gTotal = this.granTotal();
  }

  actualizaRegistro(row:IVenta) {
    let registroTemporal:IVenta;
    let index;
    let banderaCheck = false;
    this.venta.forEach(function(element, i)  {
      if (element.costo === row.costo && element.fruta.nombre === row.fruta.nombre) {
        registroTemporal = element;
        index = i;
        banderaCheck = true;
        }
    });

    if (banderaCheck) {
      row.cantidad += registroTemporal.cantidad;
      let total = row.costo * row.cantidad;
      row.total = total;
      this.venta[index] = row;
      Swal.fire(
        'Registro Actualizado',
        'Se actualizó el producto a la canasta',
        'success'
      )
    }
  }
  actualizaRegistroIndex(row:IVenta, ind) {
    let registroTemporal:IVenta;
    let index;
    let banderaCheck = false;
    this.venta.forEach(function(element, i)  {
      if (element.costo === row.costo && element.fruta.nombre === row.fruta.nombre && ind === i) {
        registroTemporal = element;
        index = i;
        banderaCheck = true;
        }
    });

    if (banderaCheck) {
      row.cantidad += registroTemporal.cantidad;
      let total = row.costo * row.cantidad;
      row.total = total;
      this.venta[index] = row;
      Swal.fire(
        'Registro Actualizado',
        'Se actualizó el producto a la canasta',
        'success'
      )
    }
  }
  agregaCanastaDiferentePrecio(row) {
    Swal.fire({
      title: 'El registro ya existe en la canasta',
      text: "¿Agregar este producto con diferente precio?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {   
        this.venta.push(row);
        this.setLocalStorageVenta();
        Swal.fire(
          'Registro Agregado',
          'Se agregó el producto a la canasta',
          'success'
        )
      }
    });
      
  }
  validaMismoPrecio(costo, fruta) {
    let is = false;
      this.venta.forEach(element => {
        if (element.costo === costo && element.fruta.nombre === fruta.nombre) {
          is = true;
        }
      });
      return is;
  }

  validaMismoPrecioIndex(prod, index) {
    let is = false;
      this.venta.forEach(function (element, i) {
        if (element.costo === prod.costo && element.fruta.nombre === prod.fruta.nombre && index != i){
          is = true;
        }
      });
      return is;
  }
  modificarCanasta(producto:IVenta, index) {
    if (this.validaMismoPrecioIndex(producto,index)) {
      let indexActualizar = this.getIndex(producto, index);
      this.actualizaRegistroIndex(producto, indexActualizar);
      this.venta.splice(index, 1);
      this.gTotal = this.granTotal();
    } else {
      this.venta[index] = producto;
      this.gTotal = this.granTotal();
    }    
  }

  getIndex(prod, index) {
    let ind;
    this.venta.forEach(function (element, i) {
      if (element.costo === prod.costo && element.fruta.nombre === prod.fruta.nombre && index != i){
        ind = i;
      }
    });
    return ind;
  }
  vaciarCanasta() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Se quitaran los productos agregados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Limpiar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.venta = [];
        this.eliminarLocalStorage();
        Swal.fire(
          'Canasta vacia',
          'Se han quitado los productos',
          'success'
        )
      }
    });
  }
  
  exist(fruta:IFruta){
      let nombre = fruta.nombre;
      let is = false;
      this.venta.forEach(element => {
        if (element.fruta.nombre === nombre) {
          is = true;
        }
      });
      return is;
  }

  findId(fruta:IFruta){
    let nombre = fruta.nombre;
    let index;
    this.venta.forEach(element => {
      if (element.fruta.nombre === nombre) {
        index = element.id;
      }
    });
    return index;
}


  granTotal() {
    this.gTotal = 0;
    this.venta.forEach(i => this.gTotal+=(i.costo * i.cantidad));
    return this.gTotal;
  }

  setLocalStorageVenta() {
    let tmp = [];
    tmp.push(this.venta);
    tmp.push(this.gTotal);
    tmp.push(this.empleado);
    tmp.push(this.cliente);
    localStorage.setItem(this.flagVenta, JSON.stringify(tmp));
  }
  eliminarLocalStorage() {
    if (localStorage.getItem(this.flagVenta) !== undefined && localStorage.getItem(this.flagVenta)) {
      localStorage.removeItem(this.flagVenta);
      this.gTotal = 0;
  }
}
eliminarProducto(v:IVenta) {
  Swal.fire({
    title: '¿Eliminar este producto?',
    text: 'Se quitara ' + v.fruta.nombre + ' de la canasta',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      let index;
      this.venta.forEach((element, i) => {
      if (element === v) {
       index = i;
       this.venta.splice(index, 1);
       }
      });
      this.gTotal = this.granTotal();
      this.setLocalStorageVenta();
      Swal.fire(
        'Realizado',
        'Se ha quitado el producto',
        'success'
      )
    }
  });
}
async modificarProducto(producto:IVenta, index:number) {
  const { value: formValues } = await Swal.fire({
    title: producto.fruta.nombre,
    html:
    '<img src="'+producto.fruta.imagen+'" class="frutaImg" style="width:150px; height:150px;">' +
    '<br><br><br>'+
    '<h3 style="text-align:start; 0 -13px -10px -13px;">Ingresa el precio de venta:</h3>' +
    '<input id="precioInput" autocomplete="off" class="swal2-input" style="width:60px; position:absolute; margin:-46px 0px 0 60px;" value="'+producto.costo+'">' +
    '<h3 style="text-align:start; 0 -13px -10px -13px;">Ingresa la cantidad de Kg:</h3>' +
    '<input id="cantidadInput" class="swal2-input" autocomplete="off" style="width:60px;position:absolute; margin:-46px 0px 0 60px;" value="'+producto.cantidad+'">' + 
    '<br><br>'+
    '<div id="validaciones"></div>',
    focusConfirm: false,
    confirmButtonText: "Modificar",
    preConfirm: () => {
      let precio = (document.getElementById("precioInput") as HTMLTextAreaElement).value; 
      let cantidad = (document.getElementById("cantidadInput") as HTMLTextAreaElement).value; 
      return [
        precio,
        cantidad,
      ]
    }
  })
  
  if (formValues) {
    producto.cantidad = parseFloat(formValues[1]);
    producto.costo = parseFloat(formValues[0]);
    producto.total = producto.cantidad * producto.costo;
    this.modificarCanasta(producto, index);
    this.setLocalStorageVenta();
  }
}

selectEmpleado() {
  this.empleado = this.empleado;
  console.log(this.empleado);
  this.setLocalStorageVenta();
}
selectCliente() {
  this.cliente = this.cliente;
  this.setLocalStorageVenta();
}
resumenVenta() {
  if (this.empleado.id === 0) {
    Swal.fire(
      'Faltan Datos',
      'Seleccione un Empleado',
      'error'
    )
  } else if (this.cliente.id === 0) {
    Swal.fire(
      'Faltan Datos',
      'Seleccione un Cliente',
      'error'
    )
  } else {
  let dialogRef = this.dialog.open(ResumenComponent, {
        width: '50%',
        minHeight: 'calc(100vh - 90px)',
        height : 'auto',
        data: {detalle: this.venta, empleado:this.empleado, cliente:this.cliente, gTotal:this.gTotal},
    });
  }
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

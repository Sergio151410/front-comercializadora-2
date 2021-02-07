
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor() { }

  generarVenta(venta:any)  {
    console.info("Genera Venta Service");
    return true;
  }
}

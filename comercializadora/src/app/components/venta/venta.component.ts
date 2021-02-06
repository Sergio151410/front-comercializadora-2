import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {ObservadorService} from 'src/app/services/observador.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})



export class VentaComponent implements OnInit{


  flagVenta:string = '0';

  v1 = true;
  v2 = false;
  v3 = false;
  v4 = false;
  v5 = false;

  constructor(private obs : ObservadorService) { }
  

  ngOnInit(): void {
    this.initVenta(0);

  }

  handleVenta($event) {
    this.flagVenta = $event.index;  
    this.initVenta($event.index);
  }

  initVenta(venta:number) {
    venta++;
    switch (venta) {
      case 1:
          this.v1 = true;
          this.v2 = false;
          this.v3 = false;
          this.v4 = false;
          this.v5 = false;
        break;
        case 2:
          this.v1 = false;
          this.v2 = true;
          this.v3 = false;
          this.v4 = false;
          this.v5 = false;
        break;
        case 3:
          this.v1 = false;
          this.v2 = false;
          this.v3 = true;
          this.v4 = false;
          this.v5 = false;
        break;
        case 4:
          this.v1 = false;
          this.v2 = false;
          this.v3 = false;
          this.v4 = true;
          this.v5 = false;
        break;
        case 5:
          this.v1 = false;
          this.v2 = false;
          this.v3 = false;
          this.v4 = false;
          this.v5 = true;
        break;
    
      default:
        break;
    }
    this.obs.event$.emit(venta);
  }
}


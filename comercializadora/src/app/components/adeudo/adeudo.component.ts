import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adeudo',
  templateUrl: './adeudo.component.html',
  styleUrls: ['./adeudo.component.css']
})
export class AdeudoComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router : Router) { }


  adeudosClientes: IAdeudosClientes[] = [
    {id: 1, nombre: 'Daniel Martinez', cantidad: 30.0},
    {id: 2, nombre: 'Maricruz Gonzalez', cantidad: 10.0},
    {id: 3, nombre: 'Alfonso Hernandez', cantidad: 32.0 },
    {id: 4, nombre: 'Diego Guerrero', cantidad: 100.00}
   ];
  ngOnInit(): void {
  }

  goToListaAdeudos(clientId:any)
  {
    this._router.navigate(['/listaAdeudos',clientId]); 
  }


}
  
export interface IAdeudosClientes {
  id: number;
  nombre: string;
  cantidad: number;
}
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




export interface UserData {
  id: string;
  nombre: string;
}


const NAMES: string[] = [
  'Mari', 'Sergio', 'Poncho', 'Maria', 
];

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent  implements AfterViewInit {
  displayedColumns: string[] = ['nombre','opciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  
  constructor(private router:Router) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }



  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  agregar(e) {
    this.router.navigate(["/cliente/agregar"]);
  }
  editar(e, id) {
    this.router.navigate(["/cliente/editar",id]);
  }

  eliminar(e, id, nombre) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Se eliminará el siguiente cliente:'+ `${nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Elimando!',
          'El cliente '+ `<strong>${nombre}</strong>` + ' ha sido eliminado',
          'success'
        )
      }
    })
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const nombre = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    nombre: nombre,  
  };

}

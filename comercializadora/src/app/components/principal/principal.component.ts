import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  loader:boolean;
  constructor() {
    this.loader = true;
   }

  ngOnInit(): void {
    this.loader = false;
  }

   prueba(e){
    Swal.fire({
      title: 'Sweet!',
      text: 'Modal with a custom image.',
      imageUrl: '../../assets/img/empleado.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      input:"text",
    }).then((result)=>{
      if (result.value) {
        console.log(result.value);
      }
    });
  }
}
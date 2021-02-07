import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservadorService {


  event$ = new EventEmitter<number>();

  constructor() { }

}

import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuEvento$  = new EventEmitter<string>();
  constructor() { }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  events: string[] = [];
  opened: boolean;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(private menuService:MenuService,private router:Router) { }

  ngOnInit(): void {
    
  }
  
  toggle(url) {
    this.menuService.menuEvento$.emit("Cambio de pestaña");
    this.router.navigate([url]);
  }
}

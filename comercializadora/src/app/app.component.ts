import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'comercializadora';
  @ViewChild('sidenav') sidenav: MatSidenav;
  
  reason = '';

close(reason: string) {
  this.reason = reason;
  this.sidenav.close();
}

constructor(private menuService:MenuService) {

}
  ngOnInit(): void {
    this.menuService.menuEvento$.subscribe(result => {
      this.sidenav.close();
      
    });
  }

  
}


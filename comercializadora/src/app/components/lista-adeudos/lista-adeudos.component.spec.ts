import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdeudosComponent } from './lista-adeudos.component';

describe('ListaAdeudosComponent', () => {
  let component: ListaAdeudosComponent;
  let fixture: ComponentFixture<ListaAdeudosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAdeudosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAdeudosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

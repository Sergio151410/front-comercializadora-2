import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoAMComponent } from './empleado-am.component';

describe('EmpleadoAMComponent', () => {
  let component: EmpleadoAMComponent;
  let fixture: ComponentFixture<EmpleadoAMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoAMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

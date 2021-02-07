import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAMComponent } from './producto-am.component';

describe('ProductoAMComponent', () => {
  let component: ProductoAMComponent;
  let fixture: ComponentFixture<ProductoAMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoAMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAMComponent } from './cliente-am.component';

describe('ClienteAMComponent', () => {
  let component: ClienteAMComponent;
  let fixture: ComponentFixture<ClienteAMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteAMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteAMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

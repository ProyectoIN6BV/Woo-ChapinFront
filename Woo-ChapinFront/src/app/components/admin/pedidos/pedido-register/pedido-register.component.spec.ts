import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoRegisterComponent } from './pedido-register.component';

describe('PedidoRegisterComponent', () => {
  let component: PedidoRegisterComponent;
  let fixture: ComponentFixture<PedidoRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

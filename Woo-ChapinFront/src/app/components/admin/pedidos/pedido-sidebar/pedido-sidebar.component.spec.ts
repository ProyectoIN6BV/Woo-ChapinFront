import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoSidebarComponent } from './pedido-sidebar.component';

describe('PedidoSidebarComponent', () => {
  let component: PedidoSidebarComponent;
  let fixture: ComponentFixture<PedidoSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

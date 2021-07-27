import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdRegisterComponent } from './prod-register.component';

describe('ProdRegisterComponent', () => {
  let component: ProdRegisterComponent;
  let fixture: ComponentFixture<ProdRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

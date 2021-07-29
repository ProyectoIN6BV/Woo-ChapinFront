import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneRegisterComponent } from './zone-register.component';

describe('ZoneRegisterComponent', () => {
  let component: ZoneRegisterComponent;
  let fixture: ComponentFixture<ZoneRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

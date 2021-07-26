import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdSidebarComponent } from './prod-sidebar.component';

describe('ProdSidebarComponent', () => {
  let component: ProdSidebarComponent;
  let fixture: ComponentFixture<ProdSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

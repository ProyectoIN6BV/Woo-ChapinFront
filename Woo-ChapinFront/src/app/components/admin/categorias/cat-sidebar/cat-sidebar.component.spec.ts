import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSidebarComponent } from './cat-sidebar.component';

describe('CatSidebarComponent', () => {
  let component: CatSidebarComponent;
  let fixture: ComponentFixture<CatSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

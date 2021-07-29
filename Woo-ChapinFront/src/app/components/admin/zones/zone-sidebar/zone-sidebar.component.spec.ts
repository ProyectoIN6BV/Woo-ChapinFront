import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneSidebarComponent } from './zone-sidebar.component';

describe('ZoneSidebarComponent', () => {
  let component: ZoneSidebarComponent;
  let fixture: ComponentFixture<ZoneSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

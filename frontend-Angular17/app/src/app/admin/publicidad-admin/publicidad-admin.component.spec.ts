import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadAdminComponent } from './publicidad-admin.component';

describe('PublicidadAdminComponent', () => {
  let component: PublicidadAdminComponent;
  let fixture: ComponentFixture<PublicidadAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicidadAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicidadAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

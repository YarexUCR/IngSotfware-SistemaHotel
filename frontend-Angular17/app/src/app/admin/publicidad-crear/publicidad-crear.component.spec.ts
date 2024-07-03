import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadCrearComponent } from './publicidad-crear.component';

describe('PublicidadCrearComponent', () => {
  let component: PublicidadCrearComponent;
  let fixture: ComponentFixture<PublicidadCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicidadCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicidadCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

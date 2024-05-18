import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservacionRealizadaComponent } from './reservacion-realizada.component';

describe('ReservacionRealizadaComponent', () => {
  let component: ReservacionRealizadaComponent;
  let fixture: ComponentFixture<ReservacionRealizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservacionRealizadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservacionRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

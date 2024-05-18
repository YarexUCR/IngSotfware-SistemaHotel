import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarTipoHabitacionComponent } from './cargar-tipo-habitacion.component';

describe('CargarTipoHabitacionComponent', () => {
  let component: CargarTipoHabitacionComponent;
  let fixture: ComponentFixture<CargarTipoHabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarTipoHabitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargarTipoHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

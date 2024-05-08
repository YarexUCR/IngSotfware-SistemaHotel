import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOfertaComponent } from './agregar-oferta.component';

describe('AgregarOfertaComponent', () => {
  let component: AgregarOfertaComponent;
  let fixture: ComponentFixture<AgregarOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarOfertaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

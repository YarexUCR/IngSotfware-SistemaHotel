import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSobreNosotrosComponent } from './modificar-sobre-nosotros.component';

describe('ModificarSobreNosotrosComponent', () => {
  let component: ModificarSobreNosotrosComponent;
  let fixture: ComponentFixture<ModificarSobreNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarSobreNosotrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarSobreNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

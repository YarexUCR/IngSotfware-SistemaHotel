import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPaginasComponent } from './modificar-paginas.component';

describe('ModificarPaginasComponent', () => {
  let component: ModificarPaginasComponent;
  let fixture: ComponentFixture<ModificarPaginasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarPaginasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

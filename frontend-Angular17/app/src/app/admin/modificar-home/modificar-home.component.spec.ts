import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarHomeComponent } from './modificar-home.component';

describe('ModificarHomeComponent', () => {
  let component: ModificarHomeComponent;
  let fixture: ComponentFixture<ModificarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

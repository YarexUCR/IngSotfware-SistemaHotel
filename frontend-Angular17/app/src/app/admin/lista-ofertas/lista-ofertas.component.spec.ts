import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOfertasComponent } from './lista-ofertas.component';

describe('ListaOfertasComponent', () => {
  let component: ListaOfertasComponent;
  let fixture: ComponentFixture<ListaOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaOfertasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

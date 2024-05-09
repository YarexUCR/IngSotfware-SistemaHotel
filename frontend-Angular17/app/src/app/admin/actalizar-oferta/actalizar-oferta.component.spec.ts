import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActalizarOfertaComponent } from './actalizar-oferta.component';

describe('ActalizarOfertaComponent', () => {
  let component: ActalizarOfertaComponent;
  let fixture: ComponentFixture<ActalizarOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActalizarOfertaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActalizarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

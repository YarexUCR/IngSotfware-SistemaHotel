import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporadaUpdateComponent } from './temporada-update.component';

describe('TemporadaUpdateComponent', () => {
  let component: TemporadaUpdateComponent;
  let fixture: ComponentFixture<TemporadaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemporadaUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemporadaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

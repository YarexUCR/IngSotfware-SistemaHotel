import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporadaAddComponent } from './temporada-add.component';

describe('TemporadaAddComponent', () => {
  let component: TemporadaAddComponent;
  let fixture: ComponentFixture<TemporadaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemporadaAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemporadaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

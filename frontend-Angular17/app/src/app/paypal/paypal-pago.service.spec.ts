import { TestBed } from '@angular/core/testing';

import { PaypalPagoService } from './paypal-pago.service';

describe('PaypalPagoService', () => {
  let service: PaypalPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaypalPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

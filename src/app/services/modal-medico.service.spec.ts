import { TestBed } from '@angular/core/testing';

import { ModalMedicoService } from './modal-medico.service';

describe('ModalMedicoService', () => {
  let service: ModalMedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalMedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

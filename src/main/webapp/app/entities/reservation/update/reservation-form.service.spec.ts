import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../reservation.test-samples';

import { ReservationFormService } from './reservation-form.service';

describe('Reservation Form Service', () => {
  let service: ReservationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationFormService);
  });

  describe('Service methods', () => {
    describe('createReservationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReservationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            checkInDate: expect.any(Object),
            checkOutDate: expect.any(Object),
            totalAmount: expect.any(Object),
            status: expect.any(Object),
            payment: expect.any(Object),
            room: expect.any(Object),
            responsible: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });

      it('passing IReservation should create a new form with FormGroup', () => {
        const formGroup = service.createReservationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            checkInDate: expect.any(Object),
            checkOutDate: expect.any(Object),
            totalAmount: expect.any(Object),
            status: expect.any(Object),
            payment: expect.any(Object),
            room: expect.any(Object),
            responsible: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });
    });

    describe('getReservation', () => {
      it('should return NewReservation for default Reservation initial value', () => {
        const formGroup = service.createReservationFormGroup(sampleWithNewData);

        const reservation = service.getReservation(formGroup) as any;

        expect(reservation).toMatchObject(sampleWithNewData);
      });

      it('should return NewReservation for empty Reservation initial value', () => {
        const formGroup = service.createReservationFormGroup();

        const reservation = service.getReservation(formGroup) as any;

        expect(reservation).toMatchObject({});
      });

      it('should return IReservation', () => {
        const formGroup = service.createReservationFormGroup(sampleWithRequiredData);

        const reservation = service.getReservation(formGroup) as any;

        expect(reservation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReservation should not enable id FormControl', () => {
        const formGroup = service.createReservationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReservation should disable id FormControl', () => {
        const formGroup = service.createReservationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

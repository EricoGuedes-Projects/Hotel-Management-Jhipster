import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IReservation, NewReservation } from '../reservation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReservation for edit and NewReservationFormGroupInput for create.
 */
type ReservationFormGroupInput = IReservation | PartialWithRequiredKeyOf<NewReservation>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IReservation | NewReservation> = Omit<T, 'checkInDate' | 'checkOutDate'> & {
  checkInDate?: string | null;
  checkOutDate?: string | null;
};

type ReservationFormRawValue = FormValueOf<IReservation>;

type NewReservationFormRawValue = FormValueOf<NewReservation>;

type ReservationFormDefaults = Pick<NewReservation, 'id' | 'checkInDate' | 'checkOutDate'>;

type ReservationFormGroupContent = {
  id: FormControl<ReservationFormRawValue['id'] | NewReservation['id']>;
  checkInDate: FormControl<ReservationFormRawValue['checkInDate']>;
  checkOutDate: FormControl<ReservationFormRawValue['checkOutDate']>;
  totalAmount: FormControl<ReservationFormRawValue['totalAmount']>;
  status: FormControl<ReservationFormRawValue['status']>;
  payment: FormControl<ReservationFormRawValue['payment']>;
  room: FormControl<ReservationFormRawValue['room']>;
  responsible: FormControl<ReservationFormRawValue['responsible']>;
  user: FormControl<ReservationFormRawValue['user']>;
};

export type ReservationFormGroup = FormGroup<ReservationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReservationFormService {
  createReservationFormGroup(reservation: ReservationFormGroupInput = { id: null }): ReservationFormGroup {
    const reservationRawValue = this.convertReservationToReservationRawValue({
      ...this.getFormDefaults(),
      ...reservation,
    });
    return new FormGroup<ReservationFormGroupContent>({
      id: new FormControl(
        { value: reservationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      checkInDate: new FormControl(reservationRawValue.checkInDate, {
        validators: [Validators.required],
      }),
      checkOutDate: new FormControl(reservationRawValue.checkOutDate, {
        validators: [Validators.required],
      }),
      totalAmount: new FormControl(reservationRawValue.totalAmount, {
        validators: [Validators.required],
      }),
      status: new FormControl(reservationRawValue.status, {
        validators: [Validators.required],
      }),
      payment: new FormControl(reservationRawValue.payment),
      room: new FormControl(reservationRawValue.room),
      responsible: new FormControl(reservationRawValue.responsible),
      user: new FormControl(reservationRawValue.user),
    });
  }

  getReservation(form: ReservationFormGroup): IReservation | NewReservation {
    return this.convertReservationRawValueToReservation(form.getRawValue() as ReservationFormRawValue | NewReservationFormRawValue);
  }

  resetForm(form: ReservationFormGroup, reservation: ReservationFormGroupInput): void {
    const reservationRawValue = this.convertReservationToReservationRawValue({ ...this.getFormDefaults(), ...reservation });
    form.reset(
      {
        ...reservationRawValue,
        id: { value: reservationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ReservationFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      checkInDate: currentTime,
      checkOutDate: currentTime,
    };
  }

  private convertReservationRawValueToReservation(
    rawReservation: ReservationFormRawValue | NewReservationFormRawValue,
  ): IReservation | NewReservation {
    return {
      ...rawReservation,
      checkInDate: dayjs(rawReservation.checkInDate, DATE_TIME_FORMAT),
      checkOutDate: dayjs(rawReservation.checkOutDate, DATE_TIME_FORMAT),
    };
  }

  private convertReservationToReservationRawValue(
    reservation: IReservation | (Partial<NewReservation> & ReservationFormDefaults),
  ): ReservationFormRawValue | PartialWithRequiredKeyOf<NewReservationFormRawValue> {
    return {
      ...reservation,
      checkInDate: reservation.checkInDate ? reservation.checkInDate.format(DATE_TIME_FORMAT) : undefined,
      checkOutDate: reservation.checkOutDate ? reservation.checkOutDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}

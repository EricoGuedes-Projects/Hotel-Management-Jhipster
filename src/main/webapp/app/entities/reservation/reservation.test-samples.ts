import dayjs from 'dayjs/esm';

import { IReservation, NewReservation } from './reservation.model';

export const sampleWithRequiredData: IReservation = {
  id: 30105,
  checkInDate: dayjs('2025-01-23T14:19'),
  checkOutDate: dayjs('2025-01-23T00:51'),
  totalAmount: 30164.54,
  status: 'CONFIRMED',
};

export const sampleWithPartialData: IReservation = {
  id: 8852,
  checkInDate: dayjs('2025-01-23T17:23'),
  checkOutDate: dayjs('2025-01-23T11:53'),
  totalAmount: 12667.82,
  status: 'CONFIRMED',
};

export const sampleWithFullData: IReservation = {
  id: 27073,
  checkInDate: dayjs('2025-01-23T06:49'),
  checkOutDate: dayjs('2025-01-23T13:06'),
  totalAmount: 4400.88,
  status: 'CONFIRMED',
};

export const sampleWithNewData: NewReservation = {
  checkInDate: dayjs('2025-01-23T08:17'),
  checkOutDate: dayjs('2025-01-23T20:06'),
  totalAmount: 14607.71,
  status: 'CONFIRMED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

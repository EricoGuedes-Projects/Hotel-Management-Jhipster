import dayjs from 'dayjs/esm';

import { IPayment, NewPayment } from './payment.model';

export const sampleWithRequiredData: IPayment = {
  id: 4942,
  paymentDate: dayjs('2025-01-23T13:47'),
  amount: 13212.06,
  paymentMethod: 'CASH',
};

export const sampleWithPartialData: IPayment = {
  id: 24156,
  paymentDate: dayjs('2025-01-23T05:19'),
  amount: 26734.6,
  paymentMethod: 'DEBIT_CARD',
};

export const sampleWithFullData: IPayment = {
  id: 28239,
  paymentDate: dayjs('2025-01-23T08:27'),
  amount: 14590.51,
  paymentMethod: 'CREDIT_CARD',
};

export const sampleWithNewData: NewPayment = {
  paymentDate: dayjs('2025-01-23T05:36'),
  amount: 3833.56,
  paymentMethod: 'CASH',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

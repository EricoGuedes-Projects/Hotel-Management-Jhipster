import dayjs from 'dayjs/esm';
import { PaymentMethod } from 'app/entities/enumerations/payment-method.model';

export interface IPayment {
  id: number;
  paymentDate?: dayjs.Dayjs | null;
  amount?: number | null;
  paymentMethod?: keyof typeof PaymentMethod | null;
}

export type NewPayment = Omit<IPayment, 'id'> & { id: null };

import dayjs from 'dayjs/esm';
import { IPayment } from 'app/entities/payment/payment.model';
import { IRoom } from 'app/entities/room/room.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { IUser } from 'app/entities/user/user.model';
import { ReservationStatus } from 'app/entities/enumerations/reservation-status.model';

export interface IReservation {
  id: number;
  checkInDate?: dayjs.Dayjs | null;
  checkOutDate?: dayjs.Dayjs | null;
  totalAmount?: number | null;
  status?: keyof typeof ReservationStatus | null;
  payment?: IPayment | null;
  room?: IRoom | null;
  responsible?: IEmployee | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewReservation = Omit<IReservation, 'id'> & { id: null };

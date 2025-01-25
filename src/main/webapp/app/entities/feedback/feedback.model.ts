import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { IReservation } from 'app/entities/reservation/reservation.model';

export interface IFeedback {
  id: number;
  feedbackDate?: dayjs.Dayjs | null;
  rating?: number | null;
  comments?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
  reservation?: IReservation | null;
}

export type NewFeedback = Omit<IFeedback, 'id'> & { id: null };

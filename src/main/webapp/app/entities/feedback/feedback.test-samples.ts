import dayjs from 'dayjs/esm';

import { IFeedback, NewFeedback } from './feedback.model';

export const sampleWithRequiredData: IFeedback = {
  id: 16297,
  feedbackDate: dayjs('2025-01-23T06:45'),
  rating: 4,
};

export const sampleWithPartialData: IFeedback = {
  id: 26360,
  feedbackDate: dayjs('2025-01-23T22:15'),
  rating: 4,
};

export const sampleWithFullData: IFeedback = {
  id: 18312,
  feedbackDate: dayjs('2025-01-23T16:57'),
  rating: 2,
  comments: 'now while',
};

export const sampleWithNewData: NewFeedback = {
  feedbackDate: dayjs('2025-01-23T06:49'),
  rating: 5,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

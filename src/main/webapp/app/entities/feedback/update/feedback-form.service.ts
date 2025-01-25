import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFeedback, NewFeedback } from '../feedback.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFeedback for edit and NewFeedbackFormGroupInput for create.
 */
type FeedbackFormGroupInput = IFeedback | PartialWithRequiredKeyOf<NewFeedback>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFeedback | NewFeedback> = Omit<T, 'feedbackDate'> & {
  feedbackDate?: string | null;
};

type FeedbackFormRawValue = FormValueOf<IFeedback>;

type NewFeedbackFormRawValue = FormValueOf<NewFeedback>;

type FeedbackFormDefaults = Pick<NewFeedback, 'id' | 'feedbackDate'>;

type FeedbackFormGroupContent = {
  id: FormControl<FeedbackFormRawValue['id'] | NewFeedback['id']>;
  feedbackDate: FormControl<FeedbackFormRawValue['feedbackDate']>;
  rating: FormControl<FeedbackFormRawValue['rating']>;
  comments: FormControl<FeedbackFormRawValue['comments']>;
  user: FormControl<FeedbackFormRawValue['user']>;
  reservation: FormControl<FeedbackFormRawValue['reservation']>;
};

export type FeedbackFormGroup = FormGroup<FeedbackFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FeedbackFormService {
  createFeedbackFormGroup(feedback: FeedbackFormGroupInput = { id: null }): FeedbackFormGroup {
    const feedbackRawValue = this.convertFeedbackToFeedbackRawValue({
      ...this.getFormDefaults(),
      ...feedback,
    });
    return new FormGroup<FeedbackFormGroupContent>({
      id: new FormControl(
        { value: feedbackRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      feedbackDate: new FormControl(feedbackRawValue.feedbackDate, {
        validators: [Validators.required],
      }),
      rating: new FormControl(feedbackRawValue.rating, {
        validators: [Validators.required, Validators.min(1), Validators.max(5)],
      }),
      comments: new FormControl(feedbackRawValue.comments),
      user: new FormControl(feedbackRawValue.user),
      reservation: new FormControl(feedbackRawValue.reservation),
    });
  }

  getFeedback(form: FeedbackFormGroup): IFeedback | NewFeedback {
    return this.convertFeedbackRawValueToFeedback(form.getRawValue() as FeedbackFormRawValue | NewFeedbackFormRawValue);
  }

  resetForm(form: FeedbackFormGroup, feedback: FeedbackFormGroupInput): void {
    const feedbackRawValue = this.convertFeedbackToFeedbackRawValue({ ...this.getFormDefaults(), ...feedback });
    form.reset(
      {
        ...feedbackRawValue,
        id: { value: feedbackRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FeedbackFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      feedbackDate: currentTime,
    };
  }

  private convertFeedbackRawValueToFeedback(rawFeedback: FeedbackFormRawValue | NewFeedbackFormRawValue): IFeedback | NewFeedback {
    return {
      ...rawFeedback,
      feedbackDate: dayjs(rawFeedback.feedbackDate, DATE_TIME_FORMAT),
    };
  }

  private convertFeedbackToFeedbackRawValue(
    feedback: IFeedback | (Partial<NewFeedback> & FeedbackFormDefaults),
  ): FeedbackFormRawValue | PartialWithRequiredKeyOf<NewFeedbackFormRawValue> {
    return {
      ...feedback,
      feedbackDate: feedback.feedbackDate ? feedback.feedbackDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}

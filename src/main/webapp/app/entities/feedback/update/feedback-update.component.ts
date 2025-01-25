import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IReservation } from 'app/entities/reservation/reservation.model';
import { ReservationService } from 'app/entities/reservation/service/reservation.service';
import { FeedbackService } from '../service/feedback.service';
import { IFeedback } from '../feedback.model';
import { FeedbackFormGroup, FeedbackFormService } from './feedback-form.service';

@Component({
  selector: 'jhi-feedback-update',
  templateUrl: './feedback-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FeedbackUpdateComponent implements OnInit {
  isSaving = false;
  feedback: IFeedback | null = null;

  usersSharedCollection: IUser[] = [];
  reservationsSharedCollection: IReservation[] = [];

  protected feedbackService = inject(FeedbackService);
  protected feedbackFormService = inject(FeedbackFormService);
  protected userService = inject(UserService);
  protected reservationService = inject(ReservationService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: FeedbackFormGroup = this.feedbackFormService.createFeedbackFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareReservation = (o1: IReservation | null, o2: IReservation | null): boolean => this.reservationService.compareReservation(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ feedback }) => {
      this.feedback = feedback;
      if (feedback) {
        this.updateForm(feedback);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const feedback = this.feedbackFormService.getFeedback(this.editForm);
    if (feedback.id !== null) {
      this.subscribeToSaveResponse(this.feedbackService.update(feedback));
    } else {
      this.subscribeToSaveResponse(this.feedbackService.create(feedback));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeedback>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(feedback: IFeedback): void {
    this.feedback = feedback;
    this.feedbackFormService.resetForm(this.editForm, feedback);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, feedback.user);
    this.reservationsSharedCollection = this.reservationService.addReservationToCollectionIfMissing<IReservation>(
      this.reservationsSharedCollection,
      feedback.reservation,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.feedback?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.reservationService
      .query()
      .pipe(map((res: HttpResponse<IReservation[]>) => res.body ?? []))
      .pipe(
        map((reservations: IReservation[]) =>
          this.reservationService.addReservationToCollectionIfMissing<IReservation>(reservations, this.feedback?.reservation),
        ),
      )
      .subscribe((reservations: IReservation[]) => (this.reservationsSharedCollection = reservations));
  }
}

import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { IReservation } from '../reservation.model';

@Component({
  selector: 'jhi-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class ReservationDetailComponent {
  reservation = input<IReservation | null>(null);

  previousState(): void {
    window.history.back();
  }
}

import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { IFeedback } from '../feedback.model';

@Component({
  selector: 'jhi-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class FeedbackDetailComponent {
  feedback = input<IFeedback | null>(null);

  previousState(): void {
    window.history.back();
  }
}

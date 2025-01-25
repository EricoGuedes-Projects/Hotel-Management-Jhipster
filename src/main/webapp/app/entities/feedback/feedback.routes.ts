import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import FeedbackResolve from './route/feedback-routing-resolve.service';

const feedbackRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/feedback.component').then(m => m.FeedbackComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/feedback-detail.component').then(m => m.FeedbackDetailComponent),
    resolve: {
      feedback: FeedbackResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/feedback-update.component').then(m => m.FeedbackUpdateComponent),
    resolve: {
      feedback: FeedbackResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/feedback-update.component').then(m => m.FeedbackUpdateComponent),
    resolve: {
      feedback: FeedbackResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default feedbackRoute;

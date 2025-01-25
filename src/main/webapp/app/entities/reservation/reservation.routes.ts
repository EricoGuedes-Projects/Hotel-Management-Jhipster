import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import ReservationResolve from './route/reservation-routing-resolve.service';

const reservationRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/reservation.component').then(m => m.ReservationComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/reservation-detail.component').then(m => m.ReservationDetailComponent),
    resolve: {
      reservation: ReservationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/reservation-update.component').then(m => m.ReservationUpdateComponent),
    resolve: {
      reservation: ReservationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/reservation-update.component').then(m => m.ReservationUpdateComponent),
    resolve: {
      reservation: ReservationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default reservationRoute;

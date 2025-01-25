import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'finalApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'employee',
    data: { pageTitle: 'finalApp.employee.home.title' },
    loadChildren: () => import('./employee/employee.routes'),
  },
  {
    path: 'feedback',
    data: { pageTitle: 'finalApp.feedback.home.title' },
    loadChildren: () => import('./feedback/feedback.routes'),
  },
  {
    path: 'payment',
    data: { pageTitle: 'finalApp.payment.home.title' },
    loadChildren: () => import('./payment/payment.routes'),
  },
  {
    path: 'reservation',
    data: { pageTitle: 'finalApp.reservation.home.title' },
    loadChildren: () => import('./reservation/reservation.routes'),
  },
  {
    path: 'room',
    data: { pageTitle: 'finalApp.room.home.title' },
    loadChildren: () => import('./room/room.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;

import { Routes } from '@angular/router';
import { LayoutComponent } from "./shared/layout/layout.component";
import { HomeComponent } from "./features/home/home.component";
import { ReservationOverviewComponent } from "./features/reservation-overview/reservation-overview.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'reservations/new',
        component: ReservationOverviewComponent
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
];

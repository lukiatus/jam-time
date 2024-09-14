import { Routes } from '@angular/router';
import { LayoutComponent } from "./shared/layout/layout.component";
import { HomeComponent } from "./features/home/home.component";

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
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
];

import { Routes } from '@angular/router';
import {
  OverviewReservationComponent
} from './features/reservation/pages/overview-reservation/overview-reservation.component';
import { RoleGuard } from './core/guards/role.guard';
import { ApplicationRoles } from './core/constants/application-roles.const';
import {
  CreateReservationComponent
} from './features/reservation/pages/create-reservation/create-reservation.component';
import {
  SearchReservationComponent
} from './features/reservation/pages/search-reservation/search-reservation.component';
import { ListBandsComponent } from './features/admin/pages/list-bands/list-bands.component';
import { ListRoomsComponent } from './features/admin/pages/list-rooms/list-rooms.component';
import { SettingsComponent } from './features/admin/pages/settings/settings.component';
import { MyReservationsComponent } from './features/reservation/pages/my-reservations/my-reservations.component';
import {
  ConcertOverviewComponent
} from './features/concert-overview/pages/concert-overview/concert-overview.component';
import { CreateConcertComponent } from './features/concert-overview/pages/create-concert/create-concert.component';
import { CreateBandComponent } from './features/admin/pages/create-band/create-band.component';
import { ListUsersComponent } from './features/admin/pages/list-users/list-users.component';

export const routes: Routes = [
  {
    title: 'Teremfoglalás',
    path: 'reservations',
    data: {
      roles: [ApplicationRoles.Admin, ApplicationRoles.BandLeader, ApplicationRoles.User]
    },
    children: [
      {
        title: 'Foglalásaim',
        path: 'my-reservations',
        component: MyReservationsComponent,
        canActivate: [RoleGuard],
        data: {
          icon: 'bookmark_star',
          roles: [ApplicationRoles.Admin, ApplicationRoles.BandLeader, ApplicationRoles.User]
        },
      },
      {
        title: 'Új foglalás',
        path: 'new',
        component: CreateReservationComponent,
        canActivate: [RoleGuard],
        data: {
          icon: 'calendar_add_on',
          roles: [ApplicationRoles.Admin, ApplicationRoles.BandLeader, ApplicationRoles.User]
        },
      },
      {
        title: 'Áttekintés',
        path: 'overview',
        component: OverviewReservationComponent,
        canActivate: [RoleGuard],
        data: {
          icon: 'overview',
          roles: [ApplicationRoles.Admin, ApplicationRoles.BandLeader, ApplicationRoles.User]
        },
      },
      {
        title: 'Keresés',
        path: 'search',
        component: SearchReservationComponent,
        canActivate: [RoleGuard],
        data: {
          icon: 'find_in_page',
          roles: [ApplicationRoles.Admin, ApplicationRoles.BandLeader, ApplicationRoles.User]
        },
      },
      {
        path: 'edit/:id',
        component: CreateReservationComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [ApplicationRoles.Admin, ApplicationRoles.BandLeader, ApplicationRoles.User]
        },
      },
    ]
  },
  {
    title: 'Koncertek',
    path: 'concerts',
    data: {
      roles: [ApplicationRoles.Admin, ApplicationRoles.BandLeader]
    },
    children: [
      {
        title: 'Közelgő koncertek',
        path: 'calendar',
        component: ConcertOverviewComponent,
        data: {
          icon: 'queue_music',
          roles: [ApplicationRoles.Admin, ApplicationRoles.BandLeader]
        }
      },
      {
        title: 'Új koncert',
        path: 'new',
        component: CreateConcertComponent,
        data: {
          icon: 'music_note_add',
          roles: [ApplicationRoles.Admin, ApplicationRoles.BandLeader]
        }
      },
    ]
  },
  {
    title: 'Adminisztráció',
    path: 'admin',
    data: {
      roles: [ApplicationRoles.Admin]
    },
    children: [
      {
        title: 'Zenekarok',
        path: 'bands',
        component: ListBandsComponent,
        canActivate: [RoleGuard],
        data: {
          icon: 'adaptive_audio_mic',
          roles: [ApplicationRoles.Admin]
        },
      },
      {
        path: 'bands/new',
        component: CreateBandComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [ApplicationRoles.Admin]
        },
      },
      {
        path: 'bands/edit/:id',
        component: CreateBandComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [ApplicationRoles.Admin]
        },
      },
      {
        title: 'Próbatermek',
        path: 'rooms',
        component: ListRoomsComponent,
        canActivate: [RoleGuard],
        data: {
          icon: 'home_work',
          roles: [ApplicationRoles.Admin]
        },
      },
      {
        title: 'Felhasználók',
        path: 'users',
        component: ListUsersComponent,
        canActivate: [RoleGuard],
        data: {
          icon: 'folder_shared',
          roles: [ApplicationRoles.Admin]
        },
      },
      {
        path: 'user/edit/:id',
        component: CreateBandComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [ApplicationRoles.Admin]
        },
      },
      {
        title: 'Beállítások',
        path: 'settings',
        component: SettingsComponent,
        canActivate: [RoleGuard],
        data: {
          icon: 'settings',
          roles: [ApplicationRoles.Admin]
        },
      },
    ]
  },
  {
    path: '',
    redirectTo: '/concerts/calendar',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/concerts/calendar',
    pathMatch: 'full'
  }
];

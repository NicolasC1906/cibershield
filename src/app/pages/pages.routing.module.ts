import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    data: {
      title: 'Starter Page',
    },
  },
];

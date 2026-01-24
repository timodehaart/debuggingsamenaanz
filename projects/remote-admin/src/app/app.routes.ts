import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { SurveyDashboardComponent } from './components/survey-dashboard/survey-dashboard.component';
import { WearablesDashboardComponent } from './components/wearables-dashboard/wearables-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'project/:projectId/survey-dashboard',
        component: SurveyDashboardComponent
      },
      {
        path: 'project/:projectId/wearables',
        component: WearablesDashboardComponent
      },
      // Add more data source routes as needed
      // {
      //   path: 'project/:projectId/ai-analytics',
      //   component: AiAnalyticsComponent
      // },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
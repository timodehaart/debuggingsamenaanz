import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'manage-projects',
    component: DashboardComponent // Replace with ManageProjectsComponent
  },
  {
    path: 'project',
    children: [
      // Your project routes here
    ]
  }
];
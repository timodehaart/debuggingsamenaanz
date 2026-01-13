import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';

export const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'time',
    loadComponent: () => import('./components/tasks/tasks.component').then(m => m.TasksComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/tasks/tasks.component').then(m => m.TasksComponent)
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  }
];
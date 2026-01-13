import { Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';

export const routes: Routes = [
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'analysis',
    loadComponent: () => import('./components/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'publications',
    loadComponent: () => import('./components/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  }
];
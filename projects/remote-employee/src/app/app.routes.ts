import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

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
          path: 'project',
          component: HomeComponent
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        }
      ]
    }
];
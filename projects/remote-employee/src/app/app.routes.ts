import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NewsInboxComponent } from './components/news-inbox/news-inbox.component';

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
          path: 'inbox',
          component: NewsInboxComponent
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        }
      ]
    }
];
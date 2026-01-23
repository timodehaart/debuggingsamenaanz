import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { NewsDashboardComponent } from './components/news-dashboard/news-dashboard.component';
import { CreateNewsletterComponent } from './components/create-newsletter/create-newsletter.component';


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
        component: ProjectComponent
      },
      {
        path: 'news',
        component: NewsDashboardComponent
      },
      {
        path: 'create-newsletter',
        component: CreateNewsletterComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
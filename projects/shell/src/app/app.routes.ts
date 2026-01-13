import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    children: [
      {
        path: '',
        loadComponent: () =>
          loadRemoteModule({
            remoteEntry: 'http://localhost:4201/remoteEntry.json',
            remoteName: 'remoteAdmin',
            exposedModule: './Component'
          }).then(m => m.AppComponent)
      },
      {
        path: '**',
        loadComponent: () =>
          loadRemoteModule({
            remoteEntry: 'http://localhost:4201/remoteEntry.json',
            remoteName: 'remoteAdmin',
            exposedModule: './Component'
          }).then(m => m.AppComponent)
      }
    ]
  },
  {
    path: 'employee',
    canActivate: [authGuard, roleGuard],
    data: { role: 'employee' },
    children: [
      {
        path: '',
        loadComponent: () =>
          loadRemoteModule({
            remoteEntry: 'http://localhost:4202/remoteEntry.json',
            remoteName: 'remoteEmployee',
            exposedModule: './Component'
          }).then(m => m.AppComponent)
      },
      {
        path: '**',
        loadComponent: () =>
          loadRemoteModule({
            remoteEntry: 'http://localhost:4202/remoteEntry.json',
            remoteName: 'remoteEmployee',
            exposedModule: './Component'
          }).then(m => m.AppComponent)
      }
    ]
  },
  {
    path: 'researcher',
    canActivate: [authGuard, roleGuard],
    data: { role: 'researcher' },
    children: [
      {
        path: '',
        loadComponent: () =>
          loadRemoteModule({
            remoteEntry: 'http://localhost:4203/remoteEntry.json',
            remoteName: 'remoteResearcher',
            exposedModule: './Component'
          }).then(m => m.AppComponent)
      },
      {
        path: '**',
        loadComponent: () =>
          loadRemoteModule({
            remoteEntry: 'http://localhost:4203/remoteEntry.json',
            remoteName: 'remoteResearcher',
            exposedModule: './Component'
          }).then(m => m.AppComponent)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
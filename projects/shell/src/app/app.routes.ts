import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard, roleGuard } from './guards/auth.guard';
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
    // Load routes instead of component
    loadChildren: () => 
      loadRemoteModule('remoteAdmin', './routes')
        .then(m => m.routes)
  },
  {
    path: 'employee',
    canActivate: [authGuard, roleGuard],
    data: { role: 'employee' },
    loadChildren: () => 
      loadRemoteModule('remoteEmployee', './routes')
        .then(m => m.routes)
  },
  {
    path: 'researcher',
    canActivate: [authGuard, roleGuard],
    data: { role: 'researcher' },
    loadChildren: () => 
      loadRemoteModule('remoteResearcher', './routes')
        .then(m => m.routes)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
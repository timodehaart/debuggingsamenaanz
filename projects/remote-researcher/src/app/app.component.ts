import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent, NavigationItem, UserInfo } from 'shared-ui';
import { of } from 'rxjs';
import navigationData from './data/navigation.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <lib-sidebar [navigationItems]="navigationItems" [userInfo]="userInfo">
      <router-outlet></router-outlet>
    </lib-sidebar>
  `
})
export class AppComponent implements OnInit {
  navigationItems: NavigationItem[] = [];
  userInfo: UserInfo = {
    name: 'Researcher User',
    role: 'Researcher',
    email: 'researcher@example.com'
  };

  constructor() {
    window.addEventListener('logout', () => {
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    });
  }

  ngOnInit(): void {
    of(navigationData).subscribe(items => {
      this.navigationItems = items;
    });
  }
}
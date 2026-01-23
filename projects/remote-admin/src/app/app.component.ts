import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent, NavigationItem, UserInfo } from 'shared-ui';
import { AdminDataService } from './services/admin-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardLayoutComponent],
  providers: [AdminDataService],
  template: `
    <lib-dashboard-layout 
      [navigationItems]="navigationItems" 
      [userInfo]="userInfo">
      <router-outlet></router-outlet>
    </lib-dashboard-layout>
  `
})
export class AppComponent implements OnInit {
  navigationItems: NavigationItem[] = [];
  userInfo: UserInfo = {
    name: 'Sophie',
    role: 'Admin',
    email: 'admin@example.com'
  };

  constructor(private adminDataService: AdminDataService) {
    window.addEventListener('logout', () => {
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    });
  }

  ngOnInit(): void {
    this.adminDataService.getNavigationItems().subscribe(items => {
      this.navigationItems = items;
    });
  }
}
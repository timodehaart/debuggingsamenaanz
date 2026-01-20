import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent, NavigationItem, UserInfo } from 'shared-ui';
import { EmployeeDataService } from './services/employee-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  providers: [EmployeeDataService],
  template: `
    <lib-sidebar [navigationItems]="navigationItems" [userInfo]="userInfo">
      <router-outlet></router-outlet>
    </lib-sidebar>
  `
})
export class AppComponent implements OnInit {
  navigationItems: NavigationItem[] = [];
  userInfo: UserInfo = {
    name: 'Joyce',
    role: 'User',
    email: 'employee@example.com'
  };

  constructor(private employeeDataService: EmployeeDataService) {
    window.addEventListener('logout', () => {
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    });
  }

  ngOnInit(): void {
    this.employeeDataService.getNavigationItems().subscribe(items => {
      this.navigationItems = items;
    });
  }
}
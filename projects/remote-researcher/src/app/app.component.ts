import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent, NavigationItem, UserInfo } from 'shared-ui';
import { ResearcherDataService } from './services/researcher-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardLayoutComponent],
  providers: [ResearcherDataService],
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
    name: 'Emma',
    role: 'Researcher',
    email: 'researcher@example.com'
  };

  constructor(private researcherDataService: ResearcherDataService) {
    window.addEventListener('logout', () => {
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    });
  }

  ngOnInit(): void {
    this.researcherDataService.getNavigationItems().subscribe(items => {
      this.navigationItems = items;
    });
  }
}
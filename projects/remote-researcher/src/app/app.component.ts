import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent, NavigationItem, UserInfo } from 'shared-ui';
import { ResearcherDataService } from './services/researcher-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  providers: [ResearcherDataService],
  template: `
    <lib-sidebar [navigationItems]="navigationItems" [userInfo]="userInfo">
      <router-outlet></router-outlet>
    </lib-sidebar>
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
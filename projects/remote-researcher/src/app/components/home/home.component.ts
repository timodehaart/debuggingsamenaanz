import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from 'shared-ui';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  template: `
    <div class="p-6">
      <!-- Banner -->
      <lib-banner
        [userName]="userName"
        [subtitle]="'On this platform, you can explore active research projects, participate in surveys, and analyze insights gathered from supported data sources.'"
        [buttonText]="'Get Started'"
        [buttonAction]="onGetStarted"
      ></lib-banner>
    </div>
  `
})
export class HomeComponent implements OnInit {
  userName: string = '';

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name;
    }
  }

  onGetStarted = (): void => {
    console.log('Navigate to projects');
    // Add navigation logic
  };
}
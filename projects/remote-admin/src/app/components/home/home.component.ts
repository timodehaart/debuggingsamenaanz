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

      <!-- Rest of Dashboard Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm">Total Users</h3>
          <p class="text-3xl font-bold text-gray-800 mt-2">1,234</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm">Active Projects</h3>
          <p class="text-3xl font-bold text-gray-800 mt-2">42</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm">Pending Tasks</h3>
          <p class="text-3xl font-bold text-gray-800 mt-2">18</p>
        </div>
      </div>
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
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
        [subtitle]="'Welcome to your personal dashboard. Here you can view your tasks, track progress, and stay updated with notifications.'"
        [buttonText]="'View Tasks'"
        [buttonAction]="onViewTasks"
      ></lib-banner>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm mb-2">Pending Tasks</h3>
          <p class="text-3xl font-bold text-gray-800">5</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm mb-2">Completed This Week</h3>
          <p class="text-3xl font-bold text-gray-800">12</p>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  userName: string = '';

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name;
    }
  }

  onViewTasks = (): void => {
    console.log('View tasks clicked');
  };
}
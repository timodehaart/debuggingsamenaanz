import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from 'shared-ui';
import { Router } from '@angular/router';

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

      <!-- Projects Grid -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-4">Active Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (project of projects; track project.id) {
            <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 class="font-semibold text-lg mb-2">{{project.name}}</h3>
              <p class="text-gray-600 text-sm mb-4">{{project.description}}</p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">{{project.participants}} participants</span>
                <button class="text-sm text-indigo-600 hover:text-indigo-800">
                  View Details →
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  projects = [
    { id: 1, name: 'Samen aan Z', description: 'Health and wellness research study', participants: 156 },
    { id: 2, name: 'Project Beta', description: 'Long-term behavior analysis', participants: 89 },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name;
    }
  }

  onGetStarted = (): void => {
    this.router.navigate(['/researcher/project/survey-dashboard']);
  };
}
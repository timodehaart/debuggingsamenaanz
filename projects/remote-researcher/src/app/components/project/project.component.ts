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
        [title]="'Survey Dashboard'"
        [subtitle]="'In this dashboard, you can create, update, and manage surveys. Distribute them to your target group and analyse responses to gather meaningful insights.'"
        [buttonText]="'Get Started'"
        [buttonAction]="onGetStarted"
      ></lib-banner>
    </div>
  `
})
export class ProjectComponent {
  onGetStarted = (): void => {
    console.log('Navigate to projects');
    // Add navigation logic
  };
}
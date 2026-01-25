import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BannerComponent } from 'shared-ui';

@Component({
  selector: 'app-survey-dashboard',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  template: `
    <div class="p-field">
      <!-- Banner -->
      <lib-banner
        [title]="'Survey Dashboard'"
        [subtitle]="'In this dashboard, you can create, update, and manage surveys. Distribute them to your target group and analyse responses to gather meaningful insights.'"
        [buttonText]="'Get Started'"
        [buttonAction]="onCreateSurvey"
      ></lib-banner>
    </div>
  `
})
export class SurveyDashboardComponent {
  onCreateSurvey = (): void => {
    console.log('Create new survey');
    // TODO: Open survey creation modal or navigate to creation page
  };
}
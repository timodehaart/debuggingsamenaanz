import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent, StatsBlocksComponent, StatBlock } from 'shared-ui';
import statsData from '../../data/stats.json';

@Component({
  selector: 'app-survey-dashboard',
  standalone: true,
  imports: [CommonModule, BannerComponent, StatsBlocksComponent],
  template: `
    <div class="p-field">
      <!-- Banner -->
      <lib-banner
        [title]="'Survey Dashboard'"
        [subtitle]="'In this dashboard, you can create, update, and manage surveys. Distribute them to your target group and analyse responses to gather meaningful insights.'"
        [buttonText]="'Get Started'"
        [buttonAction]="onCreateSurvey"
      ></lib-banner>

      <!-- Stats Blocks -->
      <div class="mt-field">
        <lib-stats-blocks [stats]="stats"></lib-stats-blocks>
      </div>

      <!-- Projects Section -->
      <div class="mt-field">
        <!-- Title -->
        <h2 class="text-h2 font-semibold text-ui-text mb-field">Projects</h2>
      </div>
    </div>
  `
})
export class SurveyDashboardComponent {
  stats: StatBlock[] = statsData.filter(stat =>
    ['surveyTotal', 'employees', 'nextSurvey'].includes(stat.id)
  );

  onCreateSurvey = (): void => {
    console.log('Create new survey');
    // TODO: Open survey creation modal or navigate to creation page
  };
}
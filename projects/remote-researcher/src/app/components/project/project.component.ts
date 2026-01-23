import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent, StatsBlocksComponent, StatBlock } from 'shared-ui';
import statsData from '../../data/stats.json';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BannerComponent, StatsBlocksComponent],
  template: `
    <div class="p-6">
      <!-- Banner -->
      <lib-banner
        [title]="'Survey Dashboard'"
        [subtitle]="'In this dashboard, you can create, update, and manage surveys. Distribute them to your target group and analyse responses to gather meaningful insights.'"
        [buttonText]="'Get Started'"
        [buttonAction]="onGetStarted"
      ></lib-banner>

      <!-- Stats Blocks -->
      <div class="mt-field">
        <lib-stats-blocks [stats]="stats"></lib-stats-blocks>
      </div>

      <!-- Title -->
      <div class="mt-field text-h2 font-semibold text-ui-text">Surveys</div>
    </div>
  `
})
export class ProjectComponent {
  stats: StatBlock[] = statsData.filter(stat =>
    ['surveyTotal', 'Employees', 'nextSurvey'].includes(stat.id)
  );

  onGetStarted = (): void => {
    console.log('Start Introduction');
  };
}
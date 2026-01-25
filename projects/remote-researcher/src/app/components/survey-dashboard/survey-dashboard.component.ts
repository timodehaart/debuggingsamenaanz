import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent, StatsBlocksComponent, StatBlock, SurveysTableComponent, Survey } from 'shared-ui';
import statsData from '../../data/stats.json';
import surveysData from '../../data/surveys.json';

@Component({
  selector: 'app-survey-dashboard',
  standalone: true,
  imports: [CommonModule, BannerComponent, StatsBlocksComponent, SurveysTableComponent],
  template: `
    <div class="p-field">
      <!-- Banner -->
      <lib-banner
        [title]="'Survey Dashboard'"
        [subtitle]="'In this dashboard, you can create, update, and manage surveys. Distribute them to your target group and analyse responses to gather meaningful insights.'"
        [buttonText]="'Create New Survey'"
        [buttonAction]="onCreateSurvey"
      ></lib-banner>

      <!-- Stats Blocks -->
      <div class="mt-field">
        <lib-stats-blocks [stats]="stats"></lib-stats-blocks>
      </div>

      <!-- Surveys Table -->
      <div class="mt-field">
        <h2 class="text-h2 font-semibold text-ui-text mb-field">All Surveys</h2>
        <lib-surveys-table 
          [surveys]="surveys" 
          [itemsPerPage]="5">
        </lib-surveys-table>
      </div>
    </div>
  `
})
export class SurveyDashboardComponent implements OnInit {
  stats: StatBlock[] = [];
  surveys: Survey[] = [];

  ngOnInit(): void {
    // Load stats
    this.stats = statsData.filter(stat =>
      ['surveyTotal', 'employees', 'nextSurvey'].includes(stat.id)
    );

    // Load surveys
    this.surveys = surveysData as Survey[];
  }

  onCreateSurvey = (): void => {
    console.log('Create new survey');
    // TODO: Open survey creation modal or navigate to creation page
  };
}
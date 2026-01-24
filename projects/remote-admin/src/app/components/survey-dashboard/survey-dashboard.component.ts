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
        [title]="'Survey Dashboard - ' + projectName"
        [subtitle]="'Manage and analyze survey responses for this project. View submission statistics, export data, and monitor participation rates.'"
        [buttonText]="'Create Survey'"
        [buttonAction]="onCreateSurvey"
      ></lib-banner>

      <!-- Content -->
      <div class="mt-field">
        <h2 class="text-h2 font-semibold text-ui-text mb-field">Recent Surveys</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Survey Card Example -->
          <div class="rounded-lg bg-ui-bg shadow-component border border-ui-stroke/40 p-default">
            <h3 class="text-h3 font-semibold text-ui-text mb-xs">Employee Wellbeing Survey</h3>
            <p class="text-p text-ui-text-muted mb-default">254 responses</p>
            <div class="flex gap-2">
              <button class="px-button py-button text-p bg-ui-action text-ui-action-text rounded-lg hover:bg-ui-action-hover">
                View Results
              </button>
              <button class="px-button py-button text-p border border-ui-stroke text-ui-text rounded-lg hover:bg-ui-hover-sidebar">
                Edit
              </button>
            </div>
          </div>

          <!-- Add more survey cards here -->
        </div>
      </div>
    </div>
  `
})
export class SurveyDashboardComponent implements OnInit {
  projectName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get project ID from route params
    this.route.params.subscribe(params => {
      const projectId = params['projectId'];
      this.projectName = this.formatProjectName(projectId);
    });
  }

  private formatProjectName(id: string): string {
    return id.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  onCreateSurvey = (): void => {
    console.log('Create new survey');
    // TODO: Open survey creation modal or navigate to creation page
  };
}
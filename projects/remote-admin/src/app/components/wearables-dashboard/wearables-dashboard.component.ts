import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BannerComponent } from 'shared-ui';

@Component({
  selector: 'app-wearables-dashboard',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  template: `
    <div class="p-field">
      <!-- Banner -->
      <lib-banner
        [title]="'Wearables Data - ' + projectName"
        [subtitle]="'Monitor and analyze data collected from wearable devices. Track activity patterns, health metrics, and device connectivity status.'"
        [buttonText]="'Connect Device'"
        [buttonAction]="onConnectDevice"
      ></lib-banner>

      <!-- Content -->
      <div class="mt-field">
        <h2 class="text-h2 font-semibold text-ui-text mb-field">Connected Devices</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Device Card Example -->
          <div class="rounded-lg bg-ui-bg shadow-component border border-ui-stroke/40 p-default">
            <div class="flex items-center justify-between mb-default">
              <h3 class="text-h3 font-semibold text-ui-text">Smartwatch</h3>
              <span class="px-2 py-1 text-small bg-green-100 text-green-800 rounded">Active</span>
            </div>
            <p class="text-p text-ui-text-muted mb-xs">42 participants</p>
            <p class="text-small text-ui-text-muted">Last sync: 2 hours ago</p>
            <button class="mt-default w-full px-button py-button text-p border border-ui-stroke text-ui-text rounded-lg hover:bg-ui-hover-sidebar">
              View Data
            </button>
          </div>

          <!-- Add more device cards here -->
        </div>
      </div>
    </div>
  `
})
export class WearablesDashboardComponent implements OnInit {
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

  onConnectDevice = (): void => {
    console.log('Connect new device');
    // TODO: Open device connection modal
  };
}
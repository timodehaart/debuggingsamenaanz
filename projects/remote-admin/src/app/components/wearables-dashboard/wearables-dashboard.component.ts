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
        [title]="'Wearables Data'"
        [subtitle]="'In this dashboard, you can connect, manage, and monitor wearables. Collect real-time data from users and analyse it to gain actionable insights into behaviour and health patterns.'"
        [buttonText]="'Get Started'"
        [buttonAction]="onConnectDevice"
      ></lib-banner>
    </div>
  `
})
export class WearablesDashboardComponent {
  onConnectDevice = (): void => {
    console.log('Connect new device');
    // TODO: Open device connection modal
  };
}
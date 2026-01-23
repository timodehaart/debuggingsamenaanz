import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent, StatsBlocksComponent, StatBlock } from 'shared-ui';
import statsData from '../../data/stats.json';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, BannerComponent, StatsBlocksComponent],
  template: `
    <div class="p-field">
      <!-- Banner -->
      <lib-banner
        [title]="'User Management'"
        [subtitle]="'Manage all users and organizations in one place. Add new members, assign them to departments, and control access across projects and research areas efficiently.'"
        [buttonText]="'Get Started'"
        [buttonAction]="onGetStarted"
      ></lib-banner>

      <!-- Stats Blocks -->
      <div class="mt-field">
        <lib-stats-blocks [stats]="stats"></lib-stats-blocks>
      </div>

      <!-- Title -->
      <div class="mt-field text-h2 font-semibold text-ui-text">Users</div>
    </div>
  `
})
export class UsersComponent {
  userName: string = '';
  stats: StatBlock[] = statsData.filter(stat =>
    ['users', 'organizations', 'users', 'organizations'].includes(stat.id)
  );

  onGetStarted = (): void => {
    console.log('Start Introduction');
  };
}
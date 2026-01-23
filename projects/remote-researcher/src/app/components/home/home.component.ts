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
        [userName]="userName"
        [subtitle]="'On this platform, you can explore active research projects, participate in surveys, and analyze insights gathered from supported data sources.'"
        [buttonText]="'Get Started'"
        [buttonAction]="onGetStarted"
      ></lib-banner>

      <!-- Stats Blocks -->
      <div class="mt-field">
        <lib-stats-blocks [stats]="stats"></lib-stats-blocks>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  userName: string = '';
  stats: StatBlock[] = statsData.filter(stat =>
    ['projects', 'newItems', 'lastLogin', 'dataSources'].includes(stat.id)
  );

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name;
    }
  }

  onGetStarted = (): void => {
    console.log('Start Introduction');
  };
}
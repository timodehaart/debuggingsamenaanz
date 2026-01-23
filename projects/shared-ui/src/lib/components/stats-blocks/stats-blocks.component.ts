import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Folder,
  Sparkles,
  LogIn,
  LibraryBig,
  UsersRound,
  Building2,
  ListTodo,
  CalendarCheck2
} from 'lucide-angular';

export interface StatBlock {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
}

@Component({
  selector: 'lib-stats-blocks',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      class="grid gap-stats"
      [ngStyle]="{
        'grid-template-columns': 'repeat(auto-fit, minmax(240px, 1fr))'
      }"
    >
      @for (stat of stats; track stat.title) {
        <div
          class="flex items-center rounded-lg bg-ui-bg p-default shadow-component border border-ui-stroke/40"
        >
          <!-- Icon tile -->
          <div
            class="flex h-12 w-12 items-center justify-center rounded-lg shrink-0"
            [ngStyle]="{
              background:
                'linear-gradient(135deg, ' +
                stat.gradientFrom +
                ' 0%, ' +
                stat.gradientTo +
                ' 100%)'
            }"
          >
            <lucide-icon
              [img]="iconMap[stat.icon]"
              class="h-4 w-4 text-ui-text-inverse"
            ></lucide-icon>
          </div>

          <!-- Text -->
          <div class="ml-stats min-w-0">
            <div
              class="text-h3 font-semibold leading-none"
              [ngStyle]="{ color: stat.gradientTo }"
            >
              {{ stat.title }}
            </div>

            <div
              class="mt-xs text-p text-ui-text-DEFAULT"
              [class.truncate]="stats.length >= 4"
              [class.whitespace-normal]="stats.length < 4"
              [class.break-words]="stats.length < 4"
            >
              {{ stat.subtitle }}
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class StatsBlocksComponent {
  @Input() stats: StatBlock[] = [];

  iconMap: Record<string, any> = {
    projects: Folder,
    new: Sparkles,
    login: LogIn,
    dataSources: LibraryBig,
    users: UsersRound,
    organizations: Building2,
    survey: ListTodo,
    calendar: CalendarCheck2
  };
}

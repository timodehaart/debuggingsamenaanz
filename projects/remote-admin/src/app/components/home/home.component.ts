import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  BannerComponent, 
  StatsBlocksComponent, 
  StatBlock,
  DropdownFilterComponent,
  CalendarFilterComponent,
  SearchFilterComponent,
  FilterOption,
  DateRange
} from 'shared-ui';
import statsData from '../../data/stats.json';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, StatsBlocksComponent, DropdownFilterComponent, CalendarFilterComponent, SearchFilterComponent],
  template: `
    <div class="p-field">
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

      <!-- Title -->
      <div class="mt-field text-h2 font-semibold text-ui-text">Projects</div>

      <!-- Filters -->
      <div class="mt-field">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Name Filter -->
          <div class="w-64">
            <lib-dropdown-filter
              [options]="nameOptions"
              [placeholder]="'Name'"
              (filterChange)="onNameFilterChange($event)"
            ></lib-dropdown-filter>
          </div>

          <!-- Status Filter -->
          <div class="w-64">
            <lib-dropdown-filter
              [options]="statusOptions"
              [placeholder]="'Status'"
              (filterChange)="onStatusFilterChange($event)"
            ></lib-dropdown-filter>
          </div>

          <!-- Public/Private Filter -->
          <div class="w-64">
            <lib-dropdown-filter
              [options]="publicOptions"
              [placeholder]="'Public'"
              (filterChange)="onPublicFilterChange($event)"
            ></lib-dropdown-filter>
          </div>

          <!-- Date Range Filter -->
          <div class="flex-1 min-w-[400px]">
            <lib-calendar-filter
              [startPlaceholder]="'Start date'"
              [endPlaceholder]="'End date'"
              (filterChange)="onDateRangeChange($event)"
            ></lib-calendar-filter>
          </div>
        </div>

        <!-- Search Filter -->
        <div class="mt-4">
          <lib-search-filter
            [placeholder]="'Search projects'"
            (filterChange)="onSearchChange($event)"
          ></lib-search-filter>
        </div>
      </div>

      <!-- Projects List (placeholder for now) -->
      <div class="mt-4 space-y-4">
        @for (project of filteredProjects; track project.id) {
          <div class="rounded-lg bg-ui-bg p-default shadow-component border border-ui-stroke/40">
            <h3 class="text-h3 font-semibold text-ui-text">{{ project.name }}</h3>
            <p class="text-p text-ui-text-muted mt-xs">{{ project.description }}</p>
            <div class="flex gap-2 mt-2">
              <span class="px-2 py-1 text-small rounded bg-ui-action/10 text-ui-action">
                {{ project.status }}
              </span>
              <span class="px-2 py-1 text-small rounded bg-ui-stroke/20 text-ui-text">
                {{ project.visibility }}
              </span>
            </div>
          </div>
        }

        @if (filteredProjects.length === 0) {
          <div class="text-center py-8 text-ui-text-muted">
            No projects found matching your filters
          </div>
        }
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  userName: string = '';
  stats: StatBlock[] = statsData.filter(stat =>
    ['projects', 'newItems', 'lastLogin', 'dataSources'].includes(stat.id)
  );

  // Filter Options
  nameOptions: FilterOption[] = [
    { value: 'project-a', label: 'Project Alpha' },
    { value: 'project-b', label: 'Project Beta' },
    { value: 'project-g', label: 'Project Gamma' },
    { value: 'samen-z', label: 'Samen aan Z' }
  ];

  statusOptions: FilterOption[] = [
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' }
  ];

  publicOptions: FilterOption[] = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
    { value: 'restricted', label: 'Restricted' }
  ];

  // Mock data for projects
  allProjects = [
    {
      id: 1,
      name: 'Project Alpha',
      description: 'Research on AI applications',
      status: 'active',
      visibility: 'public',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Project Beta',
      description: 'Healthcare data analysis',
      status: 'completed',
      visibility: 'private',
      createdDate: '2024-03-20'
    },
    {
      id: 3,
      name: 'Samen aan Z',
      description: 'Community wellness research',
      status: 'active',
      visibility: 'public',
      createdDate: '2024-06-10'
    }
  ];

  filteredProjects = [...this.allProjects];
  
  // Active filters
  private activeFilters = {
    name: null as string | null,
    status: null as string | null,
    visibility: null as string | null,
    search: '',
    startDate: null as string | null,
    endDate: null as string | null
  };

  get filteredProjectsCount(): number {
    return this.filteredProjects.length;
  }

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name;
    }
  }

  onNameFilterChange(option: FilterOption | null): void {
    this.activeFilters.name = option?.value || null;
    this.applyFilters();
  }

  onStatusFilterChange(option: FilterOption | null): void {
    this.activeFilters.status = option?.value || null;
    this.applyFilters();
  }

  onPublicFilterChange(option: FilterOption | null): void {
    this.activeFilters.visibility = option?.value || null;
    this.applyFilters();
  }

  onDateRangeChange(dateRange: DateRange): void {
    this.activeFilters.startDate = dateRange.startDate;
    this.activeFilters.endDate = dateRange.endDate;
    this.applyFilters();
  }

  onSearchChange(searchTerm: string): void {
    this.activeFilters.search = searchTerm.toLowerCase();
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredProjects = this.allProjects.filter(project => {
      // Name filter
      if (this.activeFilters.name) {
        const projectSlug = project.name.toLowerCase().replace(/\s+/g, '-');
        if (!projectSlug.includes(this.activeFilters.name)) {
          return false;
        }
      }

      // Status filter
      if (this.activeFilters.status && project.status !== this.activeFilters.status) {
        return false;
      }

      // Visibility filter
      if (this.activeFilters.visibility && project.visibility !== this.activeFilters.visibility) {
        return false;
      }

      // Search filter
      if (this.activeFilters.search) {
        const searchableText = `${project.name} ${project.description}`.toLowerCase();
        if (!searchableText.includes(this.activeFilters.search)) {
          return false;
        }
      }

      // Date range filter
      if (this.activeFilters.startDate) {
        if (project.createdDate < this.activeFilters.startDate) {
          return false;
        }
      }
      if (this.activeFilters.endDate) {
        if (project.createdDate > this.activeFilters.endDate) {
          return false;
        }
      }

      return true;
    });
  }

  onGetStarted = (): void => {
    console.log('Start Introduction');
  };
}
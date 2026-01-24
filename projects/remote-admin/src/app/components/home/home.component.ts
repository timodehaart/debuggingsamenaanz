import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  BannerComponent, 
  StatsBlocksComponent, 
  StatBlock,
  ProjectFiltersComponent,
  ProjectFilters,
  ProjectCardComponent,
  ProjectCard
} from 'shared-ui';
import statsData from '../../data/stats.json';
import projectsData from '../../data/projects.json';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    BannerComponent, 
    StatsBlocksComponent, 
    ProjectFiltersComponent,
    ProjectCardComponent
  ],
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

      <!-- Projects Section -->
      <div class="mt-field">
        <!-- Title -->
        <h2 class="text-h2 font-semibold text-ui-text mb-field">Projects</h2>

        <!-- Filters -->
        <lib-project-filters
          (filtersChange)="onFiltersChange($event)"
        ></lib-project-filters>

        <!-- Projects Grid -->
        @if (isLoading) {
          <div class="mt-field flex justify-center p-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-ui-action"></div>
          </div>
        } @else if (filteredProjects.length === 0) {
          <!-- Empty State -->
          <div class="mt-field text-center py-12 rounded-lg bg-ui-bg border border-ui-stroke/40">
            <p class="text-p text-ui-text-muted">No projects found matching your filters</p>
            <button
              type="button"
              (click)="clearFilters()"
              class="mt-4 px-button py-button text-p text-ui-action hover:underline"
            >
              Clear filters
            </button>
          </div>
        } @else {
          <div class="mt-field grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            @for (project of filteredProjects; track project.id) {
              <lib-project-card 
                [project]="project"
                (visitProject)="handleVisitProject($event)"
                (requestAccess)="handleRequestAccess($event)"
                (menuClick)="handleMenuClick($event)"
              ></lib-project-card>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  userName: string = '';
  stats: StatBlock[] = [];
  allProjects: ProjectCard[] = [];
  filteredProjects: ProjectCard[] = [];
  isLoading: boolean = true;
  currentFilters: ProjectFilters = {
    search: '',
    sortBy: 'recent',
    projectType: 'all'
  };

  ngOnInit(): void {
    // Load user info
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name;
    }

    // Load stats
    this.stats = statsData.filter(stat =>
      ['projects', 'newItems', 'lastLogin', 'dataSources'].includes(stat.id)
    );

    // Load projects
    this.allProjects = projectsData;
    
    // Simulate loading delay (remove in production)
    setTimeout(() => {
      this.isLoading = false;
      this.applyFilters(this.currentFilters);
    }, 300);
  }

  onFiltersChange(filters: ProjectFilters): void {
    this.currentFilters = filters;
    this.applyFilters(filters);
  }

  clearFilters(): void {
    this.currentFilters = {
      search: '',
      sortBy: 'recent',
      projectType: 'all'
    };
    this.applyFilters(this.currentFilters);
  }

  private applyFilters(filters: ProjectFilters): void {
    let filtered = [...this.allProjects];

    // Apply project type filter
    switch (filters.projectType) {
      case 'my-projects':
        filtered = filtered.filter(p => p.isMyProject);
        break;
      case 'available':
        filtered = filtered.filter(p => !p.isMyProject);
        break;
      // 'all' - no filtering needed
    }

    // Apply search filter
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.dataSources.some(ds => ds.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (filters.sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      } else {
        // Sort by most recent (default)
        const dateA = new Date(a.createdDate || '1970-01-01').getTime();
        const dateB = new Date(b.createdDate || '1970-01-01').getTime();
        return dateB - dateA;
      }
    });

    this.filteredProjects = filtered;
  }

  handleVisitProject(projectId: string): void {
    console.log('Visit project:', projectId);
    // TODO: Navigate to project detail page
  }

  handleRequestAccess(projectId: string): void {
    console.log('Request access to project:', projectId);
    // TODO: Show request access modal or navigate to request form
  }

  handleMenuClick(projectId: string): void {
    console.log('Menu clicked for project:', projectId);
    // TODO: Show context menu
  }

  onGetStarted = (): void => {
    console.log('Start Introduction');
    // TODO: Show onboarding tutorial
  };
}
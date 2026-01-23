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
        <div class="mt-field grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          @for (project of filteredProjects; track project.id) {
            <lib-project-card [project]="project"></lib-project-card>
          }
        </div>

        <!-- Empty State -->
        @if (filteredProjects.length === 0) {
          <div class="text-center py-12 text-ui-text-muted">
            <p class="text-p">No projects found matching your filters</p>
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

  allProjects: ProjectCard[] = projectsData;
  filteredProjects: ProjectCard[] = [];

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name;
    }

    // Initialize with all projects
    this.filteredProjects = [...this.allProjects];
    this.applyFilters({
      search: '',
      sortBy: 'recent',
      projectType: 'all'
    });
  }

  onFiltersChange(filters: ProjectFilters): void {
    this.applyFilters(filters);
  }

  private applyFilters(filters: ProjectFilters): void {
    let filtered = [...this.allProjects];

    // Apply project type filter
    if (filters.projectType === 'my-projects') {
      filtered = filtered.filter(p => p.isMyProject);
    } else if (filters.projectType === 'available') {
      filtered = filtered.filter(p => !p.isMyProject);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.dataSources.some(ds => ds.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    if (filters.sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Sort by most recent
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdDate || '').getTime();
        const dateB = new Date(b.createdDate || '').getTime();
        return dateB - dateA;
      });
    }

    this.filteredProjects = filtered;
  }

  onGetStarted = (): void => {
    console.log('Start Introduction');
  };
}
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, ChevronDown } from 'lucide-angular';

export interface ProjectFilters {
  search: string;
  sortBy: 'recent' | 'alphabetical';
  projectType: 'all' | 'my-projects' | 'available';
}

@Component({
  selector: 'lib-project-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <!-- Search Filter -->
      <div class="relative flex-1 min-w-[250px]">
        <lucide-icon
          [img]="Search"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ui-text-muted pointer-events-none"
        ></lucide-icon>

        <input
          type="text"
          [(ngModel)]="filters.search"
          (ngModelChange)="onFilterChange()"
          placeholder="Search projects"
          class="w-full rounded-lg bg-ui-bg pl-10 pr-text py-text text-p text-ui-text
                 shadow-component border border-ui-stroke/40
                 hover:shadow-component focus:outline-none focus:shadow-component
                 transition-shadow placeholder:text-ui-text-muted"
        />
      </div>

      <!-- Sort By Filter -->
      <div class="relative w-56">
        <select
          [(ngModel)]="filters.sortBy"
          (ngModelChange)="onFilterChange()"
          placeholder="recent"
          class="w-full appearance-none rounded-lg bg-ui-bg px-text py-text pr-10 text-p text-ui-text
                 shadow-component border border-ui-stroke/40
                 hover:shadow-component focus:outline-none focus:shadow-component
                 transition-shadow cursor-pointer"
        >
          <option value="recent">Most Recent</option>
          <option value="alphabetical">Alphabetical</option>
        </select>

        <lucide-icon
          [img]="ChevronDown"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ui-text-muted pointer-events-none"
        ></lucide-icon>
      </div>

      <!-- Project Type Filter -->
      <div class="relative w-56">
        <select
          [(ngModel)]="filters.projectType"
          (ngModelChange)="onFilterChange()"
          placeholder="All Projects"
          class="w-full appearance-none rounded-lg bg-ui-bg px-text py-text pr-10 text-p text-ui-text
                 shadow-component border border-ui-stroke/40
                 hover:shadow-component focus:outline-none focus:shadow-component
                 transition-shadow cursor-pointer"
        >
          <option value="all">All Projects</option>
          <option value="my-projects">My Projects</option>
          <option value="available">Available Projects</option>
        </select>

        <lucide-icon
          [img]="ChevronDown"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ui-text-muted pointer-events-none"
        ></lucide-icon>
      </div>
    </div>
  `,
  styles: []
})
export class ProjectFiltersComponent implements OnInit {
  @Output() filtersChange = new EventEmitter<ProjectFilters>();

  readonly Search = Search;
  readonly ChevronDown = ChevronDown;

  filters: ProjectFilters = {
    search: '',
    sortBy: 'recent',
    projectType: 'all'
  };

  ngOnInit(): void {
    queueMicrotask(() => this.filtersChange.emit({ ...this.filters }));
  }

  onFilterChange(): void {
    this.filtersChange.emit({ ...this.filters });
  }
}

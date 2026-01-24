import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, ChevronDown, X } from 'lucide-angular';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
          (ngModelChange)="onSearchChange($event)"
          placeholder="Search projects"
          class="w-full rounded-lg bg-ui-bg pl-10 pr-text py-text text-p text-ui-text
                 shadow-component border border-ui-stroke/40
                 hover:shadow-component focus:outline-none focus:shadow-component
                 transition-shadow placeholder:text-ui-text-muted"
        />

        @if (filters.search) {
          <button
            type="button"
            (click)="clearSearch()"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-ui-text-muted hover:text-ui-text transition-colors"
            aria-label="Clear search"
          >
            <lucide-icon [img]="X" class="w-4 h-4"></lucide-icon>
          </button>
        }
      </div>

      <!-- Sort By Filter -->
      <div class="relative w-56">
        <select
          [(ngModel)]="filters.sortBy"
          (ngModelChange)="onFilterChange()"
          class="w-full appearance-none rounded-lg bg-ui-bg px-text py-text pr-4 text-p text-ui-text
                 shadow-component border border-ui-stroke/40
                 hover:shadow-component focus:outline-none focus:shadow-component
                 transition-shadow cursor-pointer"
          aria-label="Sort projects"
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
          class="w-full appearance-none rounded-lg bg-ui-bg px-text py-text pr-4 text-p text-ui-text
                 shadow-component border border-ui-stroke/40
                 hover:shadow-component focus:outline-none focus:shadow-component
                 transition-shadow cursor-pointer"
          aria-label="Filter by project type"
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
export class ProjectFiltersComponent implements OnInit, OnDestroy {
  @Output() filtersChange = new EventEmitter<ProjectFilters>();

  readonly Search = Search;
  readonly ChevronDown = ChevronDown;
  readonly X = X;

  filters: ProjectFilters = {
    search: '',
    sortBy: 'recent',
    projectType: 'all'
  };

  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    // Setup debounced search
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filters.search = searchTerm;
      this.emitFilters();
    });

    // Emit initial filters
    queueMicrotask(() => this.emitFilters());
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  onSearchChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  onFilterChange(): void {
    this.emitFilters();
  }

  clearSearch(): void {
    this.filters.search = '';
    this.searchSubject.next('');
  }

  private emitFilters(): void {
    this.filtersChange.emit({ ...this.filters });
  }
}
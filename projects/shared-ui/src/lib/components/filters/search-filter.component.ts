import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, X } from 'lucide-angular';

@Component({
  selector: 'lib-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="relative">
      <lucide-icon 
        [img]="Search" 
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ui-text-muted pointer-events-none"
      ></lucide-icon>

      <input
        type="text"
        [(ngModel)]="searchValue"
        (ngModelChange)="onSearchChange()"
        [placeholder]="placeholder"
        class="w-full rounded-lg bg-ui-bg pl-10 pr-10 py-text text-p text-ui-text 
               shadow-component border border-ui-stroke/40
               hover:shadow-component focus:outline-none focus:shadow-component
               transition-shadow placeholder:text-ui-input-placeholder"
      />

      @if (searchValue && showClearButton) {
        <button
          type="button"
          (click)="clearSearch()"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-ui-text-muted 
                 hover:text-ui-text transition-colors"
        >
          <lucide-icon [img]="X" class="w-4 h-4"></lucide-icon>
        </button>
      }
    </div>
  `,
  styles: []
})
export class SearchFilterComponent {
  @Input() placeholder: string = 'Search projects';
  @Input() showClearButton: boolean = true;
  @Input() debounceTime: number = 300;
  @Input() initialValue?: string;

  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();

  readonly Search = Search;
  readonly X = X;

  searchValue: string = '';
  private debounceTimer?: number;

  ngOnInit(): void {
    if (this.initialValue) {
      this.searchValue = this.initialValue;
    }
  }

  onSearchChange(): void {
    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new timer for debounced search
    this.debounceTimer = window.setTimeout(() => {
      this.searchChange.emit(this.searchValue);
      this.filterChange.emit(this.searchValue);
    }, this.debounceTime);
  }

  clearSearch(): void {
    this.searchValue = '';
    
    // Clear timer if exists
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    // Emit immediately on clear
    this.searchChange.emit(this.searchValue);
    this.filterChange.emit(this.searchValue);
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}
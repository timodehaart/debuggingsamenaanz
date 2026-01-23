import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

export interface FilterOption {
  value: string;
  label: string;
}

@Component({
  selector: 'lib-dropdown-filter',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="relative">
      <button
        type="button"
        (click)="toggleDropdown()"
        class="w-full flex items-center justify-between gap-2 rounded-lg bg-ui-bg 
               px-text py-text text-p text-ui-text shadow-component border border-ui-stroke/40
               hover:shadow-component focus:outline-none focus:shadow-component transition-shadow"
        [class.text-ui-text-muted]="!selectedOption"
      >
        <span class="truncate">
          {{ selectedOption ? selectedOption.label : placeholder }}
        </span>
        <lucide-icon 
          [img]="ChevronDown" 
          class="w-4 h-4 shrink-0 transition-transform"
          [class.rotate-180]="isOpen"
        ></lucide-icon>
      </button>

      @if (isOpen) {
        <div class="absolute z-50 mt-xs w-full rounded-lg bg-ui-bg shadow-component border border-ui-stroke/40 max-h-60 overflow-y-auto">
          @if (showClearOption && selectedOption) {
            <button
              type="button"
              (click)="clearSelection()"
              class="w-full text-left px-text py-text text-p text-ui-text-muted
                     hover:bg-ui-hover-sidebar transition-colors"
            >
              Clear selection
            </button>
          }
          
          @for (option of options; track option.value) {
            <button
              type="button"
              (click)="selectOption(option)"
              class="w-full text-left px-text py-text text-p text-ui-text
                     hover:bg-ui-hover-sidebar transition-colors"
              [class.bg-ui-action]="selectedOption?.value === option.value"
              [class.text-ui-action-text]="selectedOption?.value === option.value"
            >
              {{ option.label }}
            </button>
          }

          @if (options.length === 0) {
            <div class="px-text py-text text-p text-ui-text-muted">
              No options available
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [],
  host: {
    '(document:click)': 'onDocumentClick($event)',
  }
})
export class DropdownFilterComponent {
  @Input() options: FilterOption[] = [];
  @Input() placeholder: string = 'Select option';
  @Input() showClearOption: boolean = true;
  @Input() value?: string;

  @Output() valueChange = new EventEmitter<string | null>();
  @Output() filterChange = new EventEmitter<FilterOption | null>();

  readonly ChevronDown = ChevronDown;
  
  isOpen = false;
  selectedOption: FilterOption | null = null;

  ngOnInit(): void {
    if (this.value) {
      const option = this.options.find(opt => opt.value === this.value);
      if (option) {
        this.selectedOption = option;
      }
    }
  }

  ngOnChanges(): void {
    if (this.value) {
      const option = this.options.find(opt => opt.value === this.value);
      if (option) {
        this.selectedOption = option;
      }
    } else {
      this.selectedOption = null;
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: FilterOption): void {
    this.selectedOption = option;
    this.isOpen = false;
    this.valueChange.emit(option.value);
    this.filterChange.emit(option);
  }

  clearSelection(): void {
    this.selectedOption = null;
    this.isOpen = false;
    this.valueChange.emit(null);
    this.filterChange.emit(null);
  }

  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isOpen = false;
    }
  }
}
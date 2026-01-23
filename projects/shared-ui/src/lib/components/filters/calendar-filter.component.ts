import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Calendar } from 'lucide-angular';

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

@Component({
  selector: 'lib-calendar-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex items-center gap-2">
      <div class="relative flex-1">
        <input
          type="date"
          [(ngModel)]="startDate"
          (ngModelChange)="onDateChange()"
          [placeholder]="startPlaceholder"
          class="w-full rounded-lg bg-ui-bg px-text py-text pr-10 text-p text-ui-text 
                 shadow-component border border-ui-stroke/40
                 hover:shadow-component focus:outline-none focus:shadow-component
                 transition-shadow"
          [class.text-ui-text-muted]="!startDate"
        />
        <lucide-icon 
          [img]="Calendar" 
          class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ui-text-muted pointer-events-none"
        ></lucide-icon>
      </div>

      <span class="text-p text-ui-text-muted">-</span>

      <div class="relative flex-1">
        <input
          type="date"
          [(ngModel)]="endDate"
          (ngModelChange)="onDateChange()"
          [placeholder]="endPlaceholder"
          [min]="startDate || undefined"
          class="w-full rounded-lg bg-ui-bg px-text py-text pr-10 text-p text-ui-text 
                 shadow-component border border-ui-stroke/40
                 hover:shadow-component focus:outline-none focus:shadow-component
                 transition-shadow"
          [class.text-ui-text-muted]="!endDate"
        />
        <lucide-icon 
          [img]="Calendar" 
          class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ui-text-muted pointer-events-none"
        ></lucide-icon>
      </div>

      @if (showClearButton && (startDate || endDate)) {
        <button
          type="button"
          (click)="clearDates()"
          class="px-text py-text text-p text-ui-text-muted rounded-lg
                 hover:bg-ui-hover-sidebar transition-colors"
        >
          Clear
        </button>
      }
    </div>
  `,
  styles: []
})
export class CalendarFilterComponent {
  @Input() startPlaceholder: string = 'Start date';
  @Input() endPlaceholder: string = 'End date';
  @Input() showClearButton: boolean = true;
  @Input() initialStartDate?: string;
  @Input() initialEndDate?: string;

  @Output() dateRangeChange = new EventEmitter<DateRange>();
  @Output() filterChange = new EventEmitter<DateRange>();

  readonly Calendar = Calendar;

  startDate: string | null = null;
  endDate: string | null = null;

  ngOnInit(): void {
    if (this.initialStartDate) {
      this.startDate = this.initialStartDate;
    }
    if (this.initialEndDate) {
      this.endDate = this.initialEndDate;
    }
  }

  onDateChange(): void {
    const dateRange: DateRange = {
      startDate: this.startDate,
      endDate: this.endDate
    };
    
    this.dateRangeChange.emit(dateRange);
    this.filterChange.emit(dateRange);
  }

  clearDates(): void {
    this.startDate = null;
    this.endDate = null;
    
    const dateRange: DateRange = {
      startDate: null,
      endDate: null
    };
    
    this.dateRangeChange.emit(dateRange);
    this.filterChange.emit(dateRange);
  }
}
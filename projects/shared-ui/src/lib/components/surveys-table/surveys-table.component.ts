import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDown, ChevronLeft, ChevronRight, Pencil, Trash } from 'lucide-angular';

export interface Survey {
  id: string;
  name: string;
  isPublic: boolean;
  publishDate: string;
  publishTime: string;
  closingDate: string;
  closingTime: string;
  status: 'Scheduled' | 'Open' | 'Closed' | 'Draft';
  participants: string; // Changed from number to string to support "121/256" format
  lastModified: string;
}

@Component({
  selector: 'lib-surveys-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="bg-ui-bg rounded-lg mt-field shadow-table border border-ui-stroke/40 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <!-- Header -->
          <thead class="bg-ui-table-header">
            <tr class="border-b border-ui-stroke/60">
              <th class="text-left px-table-cell py-table-header font-semibold text-p text-ui-text whitespace-nowrap">Name</th>
              <th class="text-left px-table-cell py-table-header font-semibold text-p text-ui-text whitespace-nowrap">Publish Date</th>
              <th class="text-left px-table-cell py-table-header font-semibold text-p text-ui-text whitespace-nowrap">Closing Date</th>
              <th class="text-left px-table-cell py-table-header font-semibold text-p text-ui-text whitespace-nowrap">Status</th>
              <th class="text-left px-table-cell py-table-header font-semibold text-p text-ui-text whitespace-nowrap">Participants</th>
              <th class="text-left px-table-cell py-table-header font-semibold text-p text-ui-text whitespace-nowrap">Last Modified</th>
              <th class="text-left px-table-cell py-table-header font-semibold text-p text-ui-text whitespace-nowrap">Results</th>
              <th class="text-left px-table-cell py-table-header font-semibold text-p text-ui-text whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody>
            @for (survey of pagedSurveys; track survey.id) {
              <tr class="border-b border-ui-stroke/40 last:border-b-0 hover:bg-ui-table-row-hover transition-colors">
                <!-- Name -->
                <td class="px-table-cell py-table-cell align-middle">
                  <span class="text-p text-ui-text">
                    {{ survey.name }}
                  </span>
                </td>

                <!-- Publish Date + Time -->
                <td class="px-table-cell py-table-cell align-middle">
                  <div class="flex flex-col gap-0.5">
                    <span class="text-p text-ui-text">{{ survey.publishDate }}</span>
                    @if (!isToBeScheduled(survey.publishTime)) {
                      <span class="text-small text-ui-text-muted">{{ survey.publishTime }}</span>
                    } @else {
                      <span class="text-small text-ui-text-muted italic">Not scheduled</span>
                    }
                  </div>
                </td>

                <!-- Closing Date + Time -->
                <td class="px-table-cell py-table-cell align-middle">
                  <div class="flex flex-col gap-0.5">
                    <span class="text-p text-ui-text">{{ survey.closingDate }}</span>
                    @if (!isToBeScheduled(survey.closingTime)) {
                      <span class="text-small text-ui-text-muted">{{ survey.closingTime }}</span>
                    } @else {
                      <span class="text-small text-ui-text-muted italic">Not scheduled</span>
                    }
                  </div>
                </td>

                <!-- Status -->
                <td class="px-table-cell py-table-cell align-middle">
                  <span 
                    class="inline-flex items-center justify-center px-3 py-1.5 text-small font-semibold whitespace-nowrap rounded-lg border-2"
                    [class.border-ui-status-scheduled-border]="survey.status === 'Scheduled'"
                    [class.text-ui-status-scheduled-text]="survey.status === 'Scheduled'"
                    [class.bg-ui-status-scheduled-bg]="survey.status === 'Scheduled'"
                    [class.border-ui-status-open-border]="survey.status === 'Open'"
                    [class.text-ui-status-open-text]="survey.status === 'Open'"
                    [class.bg-ui-status-open-bg]="survey.status === 'Open'"
                    [class.border-ui-status-closed-border]="survey.status === 'Closed'"
                    [class.text-ui-status-closed-text]="survey.status === 'Closed'"
                    [class.bg-ui-status-closed-bg]="survey.status === 'Closed'"
                    [class.border-ui-status-draft-border]="survey.status === 'Draft'"
                    [class.text-ui-status-draft-text]="survey.status === 'Draft'"
                    [class.bg-ui-status-draft-bg]="survey.status === 'Draft'"
                  >
                    {{ survey.status }}
                  </span>
                </td>

                <!-- Participants -->
                <td class="px-table-cell py-table-cell align-middle">
                  <span class="text-p text-ui-text">{{ survey.participants }}</span>
                </td>

                <!-- Last Modified -->
                <td class="px-table-cell py-table-cell align-middle">
                  <span class="text-p text-ui-text">{{ survey.lastModified }}</span>
                </td>

                <!-- Results Button -->
                <td class="px-table-cell py-table-cell align-middle">
                  <button
                    type="button"
                    class="px-4 py-2 rounded-lg bg-ui-action text-ui-action-text text-small font-semibold hover:bg-ui-action-hover active:scale-95 transition-all whitespace-nowrap"
                    (click)="onViewResults(survey)"
                  >
                    View Results
                  </button>
                </td>

                <!-- Actions Dropdown -->
                <td class="px-table-cell py-table-cell align-middle relative">
                  <!-- Button -->
                  <button
                    type="button"
                    class="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-lg bg-ui-action text-ui-action-text text-small font-semibold focus:outline-none hover:bg-ui-action-hover active:scale-95 transition-all whitespace-nowrap"
                    (click)="toggleActions(survey)"
                  >
                    <span>Actions</span>
                    <lucide-icon
                      [img]="ChevronDown"
                      class="w-4 h-4 transition-transform duration-200 flex-shrink-0"
                      [class.rotate-180]="openActionsForId === survey.id"
                    ></lucide-icon>
                  </button>

                  <!-- Dropdown Menu -->
                  @if (openActionsForId === survey.id) {
                    <div class="absolute right-0 mt-1 w-full min-w-[140px] rounded-lg bg-ui-bg shadow-dropdown overflow-hidden z-10 border border-ui-stroke/40">
                      <button
                        type="button"
                        class="flex items-center gap-2 w-full text-left px-4 py-2.5 text-small text-ui-text hover:bg-ui-hover-sidebar focus:outline-none transition-colors"
                        (click)="onEdit(survey)"
                      >
                        <lucide-icon [img]="Pencil" class="w-4 h-4"></lucide-icon>
                        <span class="font-medium">Edit</span>
                      </button>

                      <button
                        type="button"
                        class="flex items-center gap-2 w-full text-left px-4 py-2.5 text-small text-ui-error hover:bg-red-50 focus:outline-none transition-colors"
                        (click)="onDelete(survey)"
                      >
                        <lucide-icon [img]="Trash" class="w-4 h-4"></lucide-icon>
                        <span class="font-medium">Delete</span>
                      </button>
                    </div>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center gap-2 px-6 py-4 bg-ui-bg border-t border-ui-stroke/40">
        <!-- Previous -->
        <button
          type="button"
          class="w-8 h-8 flex items-center justify-center rounded-lg border border-ui-stroke hover:bg-ui-hover-sidebar disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          [disabled]="currentPage === 1"
          (click)="goToPrevious()"
        >
          <lucide-icon [img]="ChevronLeft" class="w-4 h-4 text-ui-text"></lucide-icon>
        </button>

        <!-- Page Numbers -->
        @for (page of pages; track page) {
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded-lg text-small font-regular transition-all"
            [ngClass]="page === currentPage 
              ? 'border-2 border-ui-action text-ui-text bg-ui-bg' 
              : 'border border-ui-stroke text-ui-text hover:bg-ui-hover-sidebar'"
            (click)="setPage(page)"
          >
            {{ page }}
          </button>
        }

        <!-- Next -->
        <button
          type="button"
          class="w-8 h-8 flex items-center justify-center rounded-lg border border-ui-stroke hover:bg-ui-hover-sidebar disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          [disabled]="currentPage === totalPages"
          (click)="goToNext()"
        >
          <lucide-icon [img]="ChevronRight" class="w-4 h-4 text-ui-text"></lucide-icon>
        </button>
      </div>
    </div>
  `,
  styles: [],
  host: {
    '(document:click)': 'onDocumentClick($event)',
  }
})
export class SurveysTableComponent implements OnInit {
  @Input() surveys: Survey[] = [];
  @Input() itemsPerPage: number = 5;

  readonly ChevronDown = ChevronDown;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Pencil = Pencil;
  readonly Trash = Trash;

  pagedSurveys: Survey[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  openActionsForId: string | null = null;

  ngOnInit(): void {
    this.updatePagination();
  }

  ngOnChanges(): void {
    this.updatePagination();
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.surveys.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePagedSurveys();
  }

  private updatePagedSurveys(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedSurveys = this.surveys.slice(startIndex, endIndex);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedSurveys();
    }
  }

  goToPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedSurveys();
    }
  }

  goToNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedSurveys();
    }
  }

  toggleActions(survey: Survey): void {
    this.openActionsForId = this.openActionsForId === survey.id ? null : survey.id;
  }

  isToBeScheduled(date: string): boolean {
    return date === 'To be scheduled' || !date || date.trim() === '';
  }

  onViewResults(survey: Survey): void {
    console.log('View results for:', survey.id);
    // TODO: Navigate to results page or open results modal
  }

  onEdit(survey: Survey): void {
    console.log('Edit survey:', survey.id);
    this.openActionsForId = null;
    // TODO: Navigate to edit page or open edit modal
  }

  onDelete(survey: Survey): void {
    console.log('Delete survey:', survey.id);
    this.openActionsForId = null;
    // TODO: Show confirmation dialog and delete
  }

  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('td')) {
      this.openActionsForId = null;
    }
  }
}
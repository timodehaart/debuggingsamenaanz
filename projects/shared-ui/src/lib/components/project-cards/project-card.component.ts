import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MoreVertical, Database } from 'lucide-angular';

export interface ProjectCard {
  id: string;
  title: string;
  image: string;
  dataSources: string[];
  isMyProject: boolean;
  createdDate?: string;
}

@Component({
  selector: 'lib-project-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="rounded-lg bg-ui-bg shadow-component border border-ui-stroke/40 overflow-hidden hover:shadow-lg transition-shadow">
      <!-- Image -->
      <div class="relative h-40 overflow-hidden bg-ui-stroke/10">
        @if (!imageError) {
          <img
            [src]="project.image"
            [alt]="project.title"
            class="w-full h-full object-cover"
            loading="lazy"
            (error)="onImgError()"
          />
        } @else {
          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-ui-action/20 to-ui-action/40">
            <span class="text-h2 font-semibold text-ui-action">
              {{ project.title.charAt(0) }}
            </span>
          </div>
        }
      </div>

      <!-- Content -->
      <div class="p-default">
        <!-- Header with title and menu -->
        <div class="flex items-start justify-between gap-2 mb-default">
          <h3 class="text-h3 font-semibold text-ui-text flex-1 line-clamp-2">
            {{ project.title }}
          </h3>

          <button
            type="button"
            (click)="onMenuClick()"
            class="text-ui-text-muted hover:text-ui-text transition-colors p-1 -m-1 flex-shrink-0"
            aria-label="Project options"
          >
            <lucide-icon [img]="MoreVerticalIcon" class="w-5 h-5"></lucide-icon>
          </button>
        </div>

        <!-- Data Sources -->
        <div class="flex items-center gap-xs mb-default min-h-[1.25rem]">
          <lucide-icon [img]="DatabaseIcon" class="w-4 h-4 text-ui-text-muted flex-shrink-0"></lucide-icon>
          <span class="text-p text-ui-text-muted truncate">
            {{ project.dataSources.length > 0 ? project.dataSources.join(', ') : 'No data sources' }}
          </span>
        </div>

        <!-- Action Button -->
        @if (project.isMyProject) {
          <button
            type="button"
            (click)="onVisitProject()"
            class="w-full rounded-lg bg-ui-action px-button py-button text-p font-semibold text-ui-action-text
                   transition hover:bg-ui-action-hover active:scale-95"
          >
            Visit Project
          </button>
        } @else {
          <button
            type="button"
            (click)="onRequestAccess()"
            class="w-full rounded-lg bg-transparent border border-ui-action px-button py-button text-p font-semibold text-ui-action
                   transition hover:bg-ui-action/10 active:scale-95"
          >
            Request Access
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProjectCardComponent {
  @Input() project!: ProjectCard;
  
  @Output() visitProject = new EventEmitter<string>();
  @Output() requestAccess = new EventEmitter<string>();
  @Output() menuClick = new EventEmitter<string>();

  readonly MoreVerticalIcon = MoreVertical;
  readonly DatabaseIcon = Database;

  imageError = false;

  onImgError(): void {
    this.imageError = true;
  }

  onVisitProject(): void {
    this.visitProject.emit(this.project.id);
  }

  onRequestAccess(): void {
    this.requestAccess.emit(this.project.id);
  }

  onMenuClick(): void {
    this.menuClick.emit(this.project.id);
  }
}
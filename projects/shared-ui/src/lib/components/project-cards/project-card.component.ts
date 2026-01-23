import { Component, Input } from '@angular/core';
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
    <div class="rounded-lg bg-ui-bg shadow-component border border-ui-stroke/40 overflow-hidden">
      <!-- Image -->
      <div class="relative h-40 overflow-hidden bg-ui-stroke/10">
        <img
          [src]="project?.image"
          [alt]="project?.title || 'Project image'"
          class="w-full h-full object-cover"
          loading="lazy"
          (error)="onImgError($event)"
        />
      </div>

      <!-- Content -->
      <div class="p-default">
        <!-- Header with title and menu -->
        <div class="flex items-start justify-between gap-2 mb-default">
          <h3 class="text-h3 font-semibold text-ui-text flex-1">
            {{ project?.title || '' }}
          </h3>

          <button
            type="button"
            class="text-ui-text-muted hover:text-ui-text transition-colors p-1 -m-1"
          >
            <lucide-icon [img]="MoreVerticalIcon" class="w-5 h-5"></lucide-icon>
          </button>
        </div>

        <!-- Data Sources -->
        <div class="flex items-center gap-xs mb-default">
          <lucide-icon [img]="DatabaseIcon" class="w-4 h-4 text-ui-text-muted"></lucide-icon>
          <span class="text-p text-ui-text-muted">
            {{ (project?.dataSources?.length ? project.dataSources.join(', ') : '—') }}
          </span>
        </div>

        <!-- Action Button -->
        @if (project?.isMyProject) {
          <button
            type="button"
            class="w-full rounded-lg bg-ui-action px-button py-button text-p font-semibold text-ui-action-text
                   transition hover:bg-ui-action-hover"
          >
            Visit Project
          </button>
        } @else {
          <button
            type="button"
            class="w-full rounded-lg bg-transparent border border-ui-action px-button py-button text-p font-semibold text-ui-action
                   transition hover:bg-ui-action/10"
          >
            Request Access
          </button>
        }
      </div>
    </div>
  `,
  styles: []
})
export class ProjectCardComponent {
  @Input() project!: ProjectCard;

  readonly MoreVerticalIcon = MoreVertical;
  readonly DatabaseIcon = Database;

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/projects/placeholder.jpg'; // add this file, or change the path
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow-sm border-b p-6">
      <h2 class="text-2xl font-bold text-gray-800">{{title}}</h2>
      @if (subtitle) {
        <p class="text-gray-600 mt-1">{{subtitle}}</p>
      }
    </div>
  `
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
}
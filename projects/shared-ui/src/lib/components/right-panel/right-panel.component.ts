import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-right-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Right Panel - Hidden on small/medium screens, visible on large+ -->
    <aside class="hidden xl:block w-80 bg-background border-l border-stroke flex-shrink-0 sticky top-0 h-screen">
      <div class="p-6 h-full overflow-y-auto"></div>
    </aside>
  `,
  styles: []
})
export class RightPanelComponent {}
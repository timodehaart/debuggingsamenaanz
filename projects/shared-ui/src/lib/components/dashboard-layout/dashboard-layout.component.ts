import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { UserInfo, NavigationItem } from '../../models/navigation.model';

@Component({
  selector: 'lib-dashboard-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RightPanelComponent],
  template: `
    <!-- Layout wrapper -->
    <div class="flex h-screen bg-ui-bg overflow-hidden">
      <!-- Sidebar - Fixed -->
      <lib-sidebar 
        [userInfo]="userInfo"
        [navigationItems]="navigationItems">
      </lib-sidebar>

      <!-- Content Area - Scrollable -->
      <div class="flex-1 overflow-y-auto">
        <ng-content></ng-content>
      </div>

      <!-- Right Panel - Fixed -->
      <lib-right-panel></lib-right-panel>
    </div>
  `,
  styles: []
})
export class DashboardLayoutComponent {
  @Input() userInfo: UserInfo | null = null;
  @Input() navigationItems: NavigationItem[] = [];
}
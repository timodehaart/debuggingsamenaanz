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
    <div class="flex min-h-screen bg-ui-bg">
      <!-- Sidebar -->
      <lib-sidebar 
        [userInfo]="userInfo"
        [navigationItems]="navigationItems">
      </lib-sidebar>

      <!-- Content Area -->
      <div class="flex-1 overflow-auto">
        <ng-content></ng-content>
      </div>

      <!-- Right Panel -->
      <lib-right-panel></lib-right-panel>
    </div>
  `,
  styles: []
})
export class DashboardLayoutComponent {
  @Input() userInfo: UserInfo | null = null;
  @Input() navigationItems: NavigationItem[] = [];
}
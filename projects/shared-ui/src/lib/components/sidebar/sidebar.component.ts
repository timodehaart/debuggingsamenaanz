import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  ChevronDown,
  House,
  FolderOpen,
  UsersRound,
  Bell,
  Settings,
  MessageCircleQuestionMark,
  LogOut
} from 'lucide-angular';
import { UserInfo, NavigationItem } from '../../models/navigation.model';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {
  @Input() userInfo: UserInfo | null = null;
  @Input() navigationItems: NavigationItem[] = [];
  @Input() researcherNavItems: NavigationItem[] = [];
  @Input() userNavItems: NavigationItem[] = [];
  @Input() projectNavItems: NavigationItem[] = [];
  @Input() bottomNavItems: NavigationItem[] = [];

  isProjectOverviewOpen = false;
  isSamenAanZOpen = false;
  imageError = false;

  // Map string keys from navigation.json -> Lucide icons
  // (use whatever keys you have in navigation.json)
  iconMap: Record<string, any> = {
    dashboard: House,
    home: House,
    users: UsersRound,
    projects: FolderOpen,
    notifications: Bell,
    settings: Settings,
    help: MessageCircleQuestionMark
    // add more mappings if needed
  };

  // Export icons for template (used in static parts of the sidebar)
  readonly ChevronDown = ChevronDown;
  readonly House = House;
  readonly FolderOpen = FolderOpen;
  readonly UsersRound = UsersRound;
  readonly Bell = Bell;
  readonly Settings = Settings;
  readonly MessageCircleQuestionMark = MessageCircleQuestionMark;
  readonly LogOut = LogOut;

  onLogout(): void {
    // This will be handled by the shell app
    window.dispatchEvent(new CustomEvent('logout'));
  }
}

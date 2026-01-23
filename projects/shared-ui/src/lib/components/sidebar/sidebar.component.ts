import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  LucideAngularModule,
  House,
  FolderOpen,
  Newspaper,
  UsersRound,
  Bell,
  Settings,
  MessageCircleQuestionMark,
  LogOut
} from 'lucide-angular';
import { UserInfo, NavigationItem } from '../../models/navigation.model';
import { RightPanelComponent } from '../right-panel/right-panel.component';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, RightPanelComponent],
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  @Input() userInfo: UserInfo | null = null;

  private _navigationItems: NavigationItem[] = [];
  @Input() set navigationItems(items: NavigationItem[]) {
    this._navigationItems = items ?? [];
    this.initializeActiveItem();
  }
  get navigationItems(): NavigationItem[] {
    return this._navigationItems;
  }

  activeItem: string = '';

  iconMap: Record<string, any> = {
    dashboard: House,
    home: House,
    users: UsersRound,
    projects: FolderOpen,
    news: Newspaper,
    notifications: Bell,
    settings: Settings,
    help: MessageCircleQuestionMark
  };

  readonly Bell = Bell;
  readonly Settings = Settings;
  readonly MessageCircleQuestionMark = MessageCircleQuestionMark;
  readonly LogOut = LogOut;

  constructor(private router: Router) {
    // Keep activeItem in sync with routing
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activeItem = event.url;
    });
  }

  ngOnInit(): void {
    this.initializeActiveItem();
  }

  private initializeActiveItem(): void {
    // If navigation items are loaded
    if (this._navigationItems.length > 0) {
      const currentUrl = this.router.url;

      // Check if current URL matches any navigation item
      const matchingItem = this._navigationItems.find(item => 
        currentUrl === item.route || currentUrl.startsWith(item.route + '/')
      );

      if (matchingItem) {
        // Current URL matches a nav item
        this.activeItem = currentUrl;
      } else if (!this.activeItem || this.activeItem === '/admin' || this.activeItem === '/employee' || this.activeItem === '/researcher') {
        // No match or on parent route - default to first item
        this.activeItem = this._navigationItems[0].route;
        
        // Navigate to first item if we're on the parent route
        if (currentUrl === '/admin' || currentUrl === '/employee' || currentUrl === '/researcher') {
          this.router.navigate([this._navigationItems[0].route]);
        }
      }
    }
  }

  setActiveItem(item: string): void {
    this.activeItem = item;
  }

  isActive(route: string): boolean {
    // Check exact match or if current route starts with the nav route
    return this.activeItem === route || this.activeItem.startsWith(route + '/');
  }

  onLogout(): void {
    window.dispatchEvent(new CustomEvent('logout'));
  }
}
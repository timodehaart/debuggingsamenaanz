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
  LogOut,
  ChevronDown,
  ChevronRight,
  LibraryBig,
  Watch
} from 'lucide-angular';
import { UserInfo, NavigationItem } from '../../../models/navigation.model';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <aside class="w-64 h-screen bg-ui-bg border-r border-ui-stroke/40 flex flex-col overflow-hidden">
      <!-- Profile -->
      <div class="m-default flex-shrink-0">
        <div class="flex items-center gap-image">
          <img
            src="/assets/emma.png"
            alt="profile pic"
            class="w-12 h-12 rounded-full"
          />

          @if (userInfo) {
            <div class="min-w-0">
              <div class="text-h3 font-medium text-ui-text truncate">
                {{ userInfo.name }}
              </div>
              <div class="text-p font-regular text-ui-text-muted truncate">
                {{ userInfo.role }}
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Divider -->
      <div class="mx-default border-b border-ui-stroke flex-shrink-0"></div>

      <!-- Navigation -->
      <nav class="flex-1 m-default overflow-y-auto">
        <div class="space-y-stack">
          @for (item of navigationItems; track item.route) {
            @if (item.isProject && item.children && item.children.length > 0) {
              <!-- Project with children -->
              <div>
                <!-- Project header (clickable to expand/collapse) -->
                <button
                  type="button"
                  (click)="toggleProject(item)"
                  class="w-full text-left p-text text-p font-regular rounded-lg flex items-center justify-between"
                  [ngClass]="item.isExpanded
                    ? 'bg-ui-hover-sidebar text-ui-text'
                    : 'text-ui-text hover:bg-ui-hover-sidebar'"
                >
                  <span class="flex items-center gap-stack flex-1 min-w-0">
                    @if (item.icon && iconMap[item.icon]) {
                      <lucide-icon class="w-4 h-4 flex-shrink-0" [img]="iconMap[item.icon]"></lucide-icon>
                    }
                    <span class="truncate">{{ item.label }}</span>
                  </span>
                  <lucide-icon 
                    [img]="item.isExpanded ? ChevronDown : ChevronRight" 
                    class="w-4 h-4 flex-shrink-0 text-ui-text-muted"
                  ></lucide-icon>
                </button>

                <!-- Children (data sources) -->
                @if (item.isExpanded) {
                  <div class="mt-stack ml-6 space-y-stack border-l border-ui-stroke/40 pl-3">
                    @for (child of item.children; track child.route) {
                      <a
                        [routerLink]="child.route"
                        (click)="setActiveItem(child.route)"
                        class="block p-text text-p font-regular rounded-lg"
                        [ngClass]="isActive(child.route)
                          ? 'bg-ui-action text-ui-action-text cursor-default'
                          : 'text-ui-text hover:bg-ui-hover-sidebar cursor-pointer'"
                      >
                        <span class="flex items-center gap-stack">
                          @if (child.icon && iconMap[child.icon]) {
                            <lucide-icon class="w-4 h-4" [img]="iconMap[child.icon]"></lucide-icon>
                          }
                          <span class="truncate">{{ child.label }}</span>
                        </span>
                      </a>
                    }
                  </div>
                }
              </div>
            } @else {
              <!-- Regular navigation item -->
              <a
                [routerLink]="item.route"
                (click)="setActiveItem(item.route)"
                class="w-full block text-left p-text text-p font-regular rounded-lg"
                [ngClass]="isActive(item.route)
                  ? 'bg-ui-action text-ui-action-text cursor-default'
                  : 'text-ui-text hover:bg-ui-hover-sidebar cursor-pointer'"
              >
                <span class="flex items-center gap-stack">
                  @if (item.icon && iconMap[item.icon]) {
                    <lucide-icon class="w-4 h-4" [img]="iconMap[item.icon]"></lucide-icon>
                  }
                  <span class="truncate">{{ item.label }}</span>
                </span>
              </a>
            }
          }
        </div>
      </nav>

      <!-- Divider -->
      <div class="mx-default border-b border-ui-stroke flex-shrink-0"></div>

      <!-- Bottom Section -->
      <div class="m-default flex-shrink-0">
        <div class="space-y-stack">
          <!-- Notifications -->
          <button
            type="button"
            (click)="setActiveItem('notifications')"
            class="w-full text-left p-text text-p font-regular flex items-center gap-stack rounded-lg"
            [ngClass]="activeItem === 'notifications'
              ? 'bg-ui-action text-ui-action-text cursor-default'
              : 'text-ui-text hover:bg-ui-hover-sidebar cursor-pointer'"
          >
            <lucide-icon [img]="Bell" class="w-4 h-4"></lucide-icon>
            <span class="truncate">Notifications</span>
          </button>

          <!-- Settings -->
          <button
            type="button"
            (click)="setActiveItem('settings')"
            class="w-full text-left p-text text-p font-regular flex items-center gap-stack rounded-lg"
            [ngClass]="activeItem === 'settings'
              ? 'bg-ui-action text-ui-action-text cursor-default'
              : 'text-ui-text hover:bg-ui-hover-sidebar cursor-pointer'"
          >
            <lucide-icon [img]="Settings" class="w-4 h-4"></lucide-icon>
            <span class="truncate">Settings</span>
          </button>

          <!-- Help -->
          <button
            type="button"
            (click)="setActiveItem('help')"
            class="w-full text-left p-text text-p font-regular flex items-center gap-stack rounded-lg"
            [ngClass]="activeItem === 'help'
              ? 'bg-ui-action text-ui-action-text cursor-default'
              : 'text-ui-text hover:bg-ui-hover-sidebar cursor-pointer'"
          >
            <lucide-icon [img]="MessageCircleQuestionMark" class="w-4 h-4"></lucide-icon>
            <span class="truncate">Help / FAQ</span>
          </button>
        </div>

        <!-- Log out -->
        <button
          type="button"
          (click)="onLogout()"
          class="mt-stack w-full text-left p-text text-p font-regular flex items-center gap-stack rounded-lg text-ui-text hover:bg-ui-hover-sidebar"
        >
          <lucide-icon [img]="LogOut" class="w-4 h-4"></lucide-icon>
          <span class="truncate">Log out</span>
        </button>
      </div>
    </aside>
  `,
  styles: []
})
export class SidebarComponent implements OnInit {
  @Input() userInfo: UserInfo | null = null;

  private _navigationItems: NavigationItem[] = [];
  @Input() set navigationItems(items: NavigationItem[]) {
    this._navigationItems = items ?? [];
    // Auto-expand projects that have an active child
    this.autoExpandActiveProjects();
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
    help: MessageCircleQuestionMark,
    survey: Newspaper,
    wearables: Watch,
    dataSources: LibraryBig
  };

  readonly Bell = Bell;
  readonly Settings = Settings;
  readonly MessageCircleQuestionMark = MessageCircleQuestionMark;
  readonly LogOut = LogOut;
  readonly ChevronDown = ChevronDown;
  readonly ChevronRight = ChevronRight;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activeItem = event.url;
      this.autoExpandActiveProjects();
    });
  }

  ngOnInit(): void {
    this.initializeActiveItem();
  }

  private initializeActiveItem(): void {
    if (this._navigationItems.length > 0) {
      const currentUrl = this.router.url;
      
      // Check if current URL matches any navigation item (including children)
      let matchingItem = this._navigationItems.find(item => 
        currentUrl === item.route || currentUrl.startsWith(item.route + '/')
      );

      // Check children if no direct match
      if (!matchingItem) {
        for (const item of this._navigationItems) {
          if (item.children) {
            const matchingChild = item.children.find(child =>
              currentUrl === child.route || currentUrl.startsWith(child.route + '/')
            );
            if (matchingChild) {
              this.activeItem = currentUrl;
              item.isExpanded = true;
              return;
            }
          }
        }
      }

      if (matchingItem) {
        this.activeItem = currentUrl;
      } else if (!this.activeItem || this.activeItem === '/admin' || this.activeItem === '/employee' || this.activeItem === '/researcher') {
        this.activeItem = this._navigationItems[0].route;
        if (currentUrl === '/admin' || currentUrl === '/employee' || currentUrl === '/researcher') {
          this.router.navigate([this._navigationItems[0].route]);
        }
      }
    }
  }

  private autoExpandActiveProjects(): void {
    const currentUrl = this.router.url;
    
    this._navigationItems.forEach(item => {
      if (item.isProject && item.children) {
        // Check if any child route matches current URL
        const hasActiveChild = item.children.some(child =>
          currentUrl === child.route || currentUrl.startsWith(child.route + '/')
        );
        
        if (hasActiveChild) {
          item.isExpanded = true;
        }
      }
    });
  }

  toggleProject(item: NavigationItem): void {
    item.isExpanded = !item.isExpanded;
  }

  setActiveItem(item: string): void {
    this.activeItem = item;
  }

  isActive(route: string): boolean {
    return this.activeItem === route || this.activeItem.startsWith(route + '/');
  }

  onLogout(): void {
    window.dispatchEvent(new CustomEvent('logout'));
  }
}
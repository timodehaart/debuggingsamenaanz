# SAZ Platform - Developer Manual

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Adding New Features](#adding-new-features)
5. [Working with Shared Components](#working-with-shared-components)
6. [Adding Role-Specific Components](#adding-role-specific-components)
7. [Managing Navigation](#managing-navigation)
8. [Authentication & Authorization](#authentication--authorization)
9. [Styling with Tailwind](#styling-with-tailwind)
10. [Building & Deployment](#building--deployment)
11. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### What is Module Federation?

The SAZ Platform uses **Angular Module Federation** with **Native Federation v19** to create a micro-frontend architecture. This means:

- **Shell Application**: The main host app that handles authentication and routing
- **Remote Applications**: Independent apps (Admin, Employee, Researcher) that load dynamically
- **Shared UI Library**: Common components used across all applications

### Key Benefits

✅ **Independent Development**: Teams can work on different remotes without conflicts  
✅ **Lazy Loading**: Only load the code users need (reduces initial bundle size)  
✅ **Shared Dependencies**: Angular, RxJS, and common components are shared (no duplication)  
✅ **Role-Based Access**: Different users see different applications based on their role

### Application Flow

```
User visits localhost:4200 (Shell)
         ↓
    Login Page
         ↓
  Authentication Check
         ↓
    User logs in as "admin"
         ↓
Shell loads Remote Admin from localhost:4201
         ↓
Admin component renders with shared sidebar
         ↓
User navigates to /admin/users
         ↓
Users component loads within Admin app
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 19
- Basic understanding of Angular, TypeScript, and RxJS

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd SAZproject

# Install dependencies
npm install

# Build the shared UI library (MUST do this first!)
ng build shared-ui

# Start all applications
npm start
```

This will start:
- Shell (host): http://localhost:4200
- Remote Admin: http://localhost:4201
- Remote Employee: http://localhost:4202
- Remote Researcher: http://localhost:4203

### Test Credentials

- **Admin**: admin@example.com / admin
- **Employee**: employee@example.com / employee
- **Researcher**: researcher@example.com / researcher

---

## Project Structure

```
SAZproject/
├── projects/
│   ├── shell/                    # Host application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/
│   │   │   │   │   └── login/    # Login component
│   │   │   │   ├── guards/       # Auth & role guards
│   │   │   │   ├── models/       # TypeScript interfaces
│   │   │   │   ├── services/     # Auth service
│   │   │   │   ├── app.component.ts
│   │   │   │   └── app.routes.ts # Main routing
│   │   │   ├── main.ts           # Federation init
│   │   │   └── bootstrap.ts      # Angular bootstrap
│   │   ├── public/
│   │   │   └── assets/
│   │   │       └── federation.manifest.json
│   │   └── federation.config.js  # Federation setup
│   │
│   ├── remote-admin/             # Admin application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/   # Admin-specific components
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   └── users/
│   │   │   │   ├── data/         # JSON data files
│   │   │   │   │   └── navigation.json
│   │   │   │   ├── services/     # Admin services
│   │   │   │   ├── app.component.ts  # Main admin wrapper
│   │   │   │   └── app.routes.ts # Admin routes
│   │   │   ├── main.ts
│   │   │   └── bootstrap.ts
│   │   └── federation.config.js
│   │
│   ├── remote-employee/          # Employee application
│   ├── remote-researcher/        # Researcher application
│   │
│   └── shared-ui/                # Shared component library
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/
│       │   │   │   ├── sidebar/  # Shared sidebar
│       │   │   │   └── page-header/
│       │   │   ├── models/       # Shared interfaces
│       │   │   └── services/     # Shared services
│       │   └── public-api.ts     # Library exports
│       └── ng-package.json
│
├── dist/                         # Build output
├── angular.json                  # Angular workspace config
├── tailwind.config.js           # Tailwind configuration
└── package.json
```

---

## Adding New Features

### Scenario 1: Adding a New Page to Admin

**Goal**: Create a "Reports" page accessible only to admins.

#### Step 1: Create the Component

```bash
# Navigate to project root
cd SAZproject

# Generate component in remote-admin
ng generate component components/reports --project=remote-admin --standalone
```

This creates:
- `projects/remote-admin/src/app/components/reports/reports.component.ts`

#### Step 2: Implement the Component

**projects/remote-admin/src/app/components/reports/reports.component.ts**:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from 'shared-ui';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <lib-page-header 
      title="Reports" 
      subtitle="View system reports and analytics">
    </lib-page-header>
    
    <div class="p-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Monthly Report</h3>
        <div class="space-y-2">
          <p>Total Users: 1,234</p>
          <p>Active Projects: 42</p>
          <p>Completion Rate: 87%</p>
        </div>
      </div>
    </div>
  `
})
export class ReportsComponent {}
```

#### Step 3: Add Route

**projects/remote-admin/src/app/app.routes.ts**:
```typescript
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ReportsComponent } from './components/reports/reports.component'; // NEW

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'reports',  // NEW
    component: ReportsComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
```

#### Step 4: Add to Navigation

**projects/remote-admin/src/app/data/navigation.json**:
```json
[
  {
    "label": "Dashboard",
    "route": "/admin/dashboard",
    "icon": "📊"
  },
  {
    "label": "Users",
    "route": "/admin/users",
    "icon": "👥"
  },
  {
    "label": "Projects",
    "route": "/admin/projects",
    "icon": "📁"
  },
  {
    "label": "Reports",
    "route": "/admin/reports",
    "icon": "📈"
  },
  {
    "label": "Settings",
    "route": "/admin/settings",
    "icon": "⚙️"
  }
]
```

#### Step 5: Test

1. Restart the dev server (or it should hot-reload)
2. Login as admin
3. Navigate to http://localhost:4200/admin/reports
4. You should see the Reports page with the sidebar

---

### Scenario 2: Adding Data Service to Admin

**Goal**: Create a service to fetch report data from an API.

#### Step 1: Create the Service

```bash
ng generate service services/reports --project=remote-admin
```

#### Step 2: Implement the Service

**projects/remote-admin/src/app/services/reports.service.ts**:
```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Report {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'pending';
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  
  // Mock data - replace with HttpClient later
  private mockReports: Report[] = [
    { id: 1, title: 'Q1 Sales Report', date: '2024-03-31', status: 'completed' },
    { id: 2, title: 'Q2 Sales Report', date: '2024-06-30', status: 'pending' },
  ];

  getReports(): Observable<Report[]> {
    return of(this.mockReports).pipe(delay(500));
  }

  getReport(id: number): Observable<Report | undefined> {
    const report = this.mockReports.find(r => r.id === id);
    return of(report).pipe(delay(500));
  }
}
```

#### Step 3: Use in Component

**projects/remote-admin/src/app/components/reports/reports.component.ts**:
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from 'shared-ui';
import { ReportsService, Report } from '../../services/reports.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <lib-page-header 
      title="Reports" 
      subtitle="View system reports and analytics">
    </lib-page-header>
    
    <div class="p-6">
      @if (loading) {
        <p>Loading reports...</p>
      }
      
      <div class="space-y-4">
        @for (report of reports; track report.id) {
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold">{{report.title}}</h3>
                <p class="text-sm text-gray-600">{{report.date}}</p>
              </div>
              <span 
                class="px-3 py-1 rounded text-sm"
                [ngClass]="{
                  'bg-green-100 text-green-800': report.status === 'completed',
                  'bg-yellow-100 text-yellow-800': report.status === 'pending'
                }"
              >
                {{report.status}}
              </span>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  loading = true;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getReports().subscribe({
      next: (reports) => {
        this.reports = reports;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load reports:', err);
        this.loading = false;
      }
    });
  }
}
```

---

## Working with Shared Components

### When to Create Shared Components

Create components in `shared-ui` when:
- ✅ Used by 2+ remote applications
- ✅ Core UI patterns (buttons, cards, modals)
- ✅ Layout components (sidebar, header, footer)
- ✅ Form controls (custom inputs, selects)

Keep components in remotes when:
- ❌ Only used in one remote
- ❌ Specific to one role's workflow
- ❌ Contains role-specific business logic

### Creating a Shared Component

**Example**: Create a shared "Card" component.

#### Step 1: Generate Component

```bash
# Generate in shared-ui library
ng generate component lib/components/card --project=shared-ui --standalone --export
```

#### Step 2: Implement Component

**projects/shared-ui/src/lib/components/card/card.component.ts**:
```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      @if (title) {
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-semibold text-gray-800">{{title}}</h3>
          @if (subtitle) {
            <p class="text-sm text-gray-600 mt-1">{{subtitle}}</p>
          }
        </div>
      }
      <div class="p-6">
        <ng-content></ng-content>
      </div>
      @if (hasFooter) {
        <div class="px-6 py-4 border-t bg-gray-50">
          <ng-content select="[footer]"></ng-content>
        </div>
      }
    </div>
  `,
  styles: []
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() hasFooter = false;
}
```

#### Step 3: Export from Library

**projects/shared-ui/src/public-api.ts**:
```typescript
// Existing exports
export * from './lib/components/sidebar/sidebar.component';
export * from './lib/components/page-header/page-header.component';
export * from './lib/models/navigation.model';
export * from './lib/services/navigation.service';

// NEW
export * from './lib/components/card/card.component';
```

#### Step 4: Rebuild Library

```bash
ng build shared-ui
```

⚠️ **Important**: You must rebuild `shared-ui` after any changes!

#### Step 5: Use in Remote Applications

**projects/remote-admin/src/app/components/dashboard/dashboard.component.ts**:
```typescript
import { Component } from '@angular/core';
import { PageHeaderComponent, CardComponent } from 'shared-ui'; // NEW import

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageHeaderComponent, CardComponent], // Add to imports
  template: `
    <lib-page-header 
      title="Admin Dashboard" 
      subtitle="Overview of system statistics">
    </lib-page-header>
    
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <lib-card title="Total Users">
          <p class="text-3xl font-bold text-gray-800">1,234</p>
        </lib-card>

        <lib-card title="Active Projects">
          <p class="text-3xl font-bold text-gray-800">42</p>
        </lib-card>

        <lib-card title="Pending Tasks" hasFooter="true">
          <p class="text-3xl font-bold text-gray-800">18</p>
          <div footer>
            <button class="text-sm text-blue-600 hover:underline">
              View All
            </button>
          </div>
        </lib-card>
      </div>
    </div>
  `
})
export class DashboardComponent {}
```

---

## Adding Role-Specific Components

### Creating Components for Specific Roles

Each remote (Admin, Employee, Researcher) can have its own unique components.

### Example: Employee Time Tracker

#### Step 1: Generate Component

```bash
ng generate component components/time-tracker --project=remote-employee --standalone
```

#### Step 2: Implement Component

**projects/remote-employee/src/app/components/time-tracker/time-tracker.component.ts**:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent, CardComponent } from 'shared-ui';

interface TimeEntry {
  id: number;
  project: string;
  hours: number;
  date: string;
}

@Component({
  selector: 'app-time-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, CardComponent],
  template: `
    <lib-page-header 
      title="Time Tracker" 
      subtitle="Log your working hours">
    </lib-page-header>
    
    <div class="p-6">
      <lib-card title="Log Time" hasFooter="true">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Project</label>
            <input 
              type="text" 
              [(ngModel)]="newEntry.project"
              class="w-full px-3 py-2 border rounded"
              placeholder="Project name"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Hours</label>
            <input 
              type="number" 
              [(ngModel)]="newEntry.hours"
              class="w-full px-3 py-2 border rounded"
              placeholder="Hours worked"
            >
          </div>
        </div>
        <div footer>
          <button 
            (click)="addEntry()"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Log Time
          </button>
        </div>
      </lib-card>

      <div class="mt-6">
        <h3 class="text-lg font-semibold mb-4">Recent Entries</h3>
        <div class="space-y-2">
          @for (entry of entries; track entry.id) {
            <div class="bg-white p-4 rounded shadow flex justify-between">
              <div>
                <p class="font-medium">{{entry.project}}</p>
                <p class="text-sm text-gray-600">{{entry.date}}</p>
              </div>
              <p class="text-lg font-semibold">{{entry.hours}}h</p>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class TimeTrackerComponent {
  newEntry = { project: '', hours: 0 };
  entries: TimeEntry[] = [
    { id: 1, project: 'Project Alpha', hours: 8, date: '2024-12-18' },
    { id: 2, project: 'Project Beta', hours: 4, date: '2024-12-17' },
  ];

  addEntry(): void {
    if (this.newEntry.project && this.newEntry.hours > 0) {
      this.entries.unshift({
        id: Date.now(),
        project: this.newEntry.project,
        hours: this.newEntry.hours,
        date: new Date().toISOString().split('T')[0]
      });
      this.newEntry = { project: '', hours: 0 };
    }
  }
}
```

#### Step 3: Add Route

**projects/remote-employee/src/app/app.routes.ts**:
```typescript
import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';

export const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'time',
    component: TimeTrackerComponent  // NEW
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/tasks/tasks.component').then(m => m.TasksComponent)
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  }
];
```

---

## Managing Navigation

### Dynamic Navigation with JSON

Navigation items are loaded from JSON files in each remote application. This allows:
- Easy modification without code changes
- Future API integration for dynamic menus
- Project-based navigation (admins can create projects, users see them)

### Current Structure

**projects/remote-admin/src/app/data/navigation.json**:
```json
[
  {
    "label": "Dashboard",
    "route": "/admin/dashboard",
    "icon": "📊"
  },
  {
    "label": "Users",
    "route": "/admin/users",
    "icon": "👥"
  }
]
```

### Adding Dynamic Project Navigation

#### Step 1: Update Navigation Model

**projects/shared-ui/src/lib/models/navigation.model.ts**:
```typescript
export interface NavigationItem {
  label: string;
  route: string;
  icon?: string;
  children?: NavigationItem[];  // NEW: Support sub-items
}

export interface UserInfo {
  name: string;
  role: string;
  email: string;
}

// NEW: Project model
export interface Project {
  id: number;
  name: string;
  route: string;
}
```

#### Step 2: Create Projects Service

**projects/remote-admin/src/app/services/projects.service.ts**:
```typescript
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Project {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsSubject = new BehaviorSubject<Project[]>([
    { id: 1, name: 'Project Alpha', description: 'First project' },
    { id: 2, name: 'Project Beta', description: 'Second project' },
  ]);

  projects$ = this.projectsSubject.asObservable();

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  addProject(project: Omit<Project, 'id'>): void {
    const projects = this.projectsSubject.value;
    const newProject = {
      ...project,
      id: Math.max(...projects.map(p => p.id), 0) + 1
    };
    this.projectsSubject.next([...projects, newProject]);
  }

  // Convert projects to navigation items
  getProjectNavigationItems(): Observable<NavigationItem[]> {
    return this.projects$.pipe(
      map(projects => projects.map(p => ({
        label: p.name,
        route: `/admin/project/${p.id}`,
        icon: '📁'
      })))
    );
  }
}
```

#### Step 3: Update Admin App Component

**projects/remote-admin/src/app/app.component.ts**:
```typescript
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent, NavigationItem, UserInfo } from 'shared-ui';
import { AdminDataService } from './services/admin-data.service';
import { ProjectsService } from './services/projects.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  providers: [AdminDataService],
  template: `
    <lib-sidebar [navigationItems]="navigationItems" [userInfo]="userInfo">
      <router-outlet></router-outlet>
    </lib-sidebar>
  `
})
export class AppComponent implements OnInit {
  navigationItems: NavigationItem[] = [];
  userInfo: UserInfo = {
    name: 'Admin User',
    role: 'Administrator',
    email: 'admin@example.com'
  };

  constructor(
    private adminDataService: AdminDataService,
    private projectsService: ProjectsService
  ) {
    window.addEventListener('logout', () => {
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    });
  }

  ngOnInit(): void {
    // Combine static navigation with dynamic project items
    combineLatest([
      this.adminDataService.getNavigationItems(),
      this.projectsService.getProjectNavigationItems()
    ]).pipe(
      map(([staticItems, projectItems]) => {
        // Insert project items after "Projects" menu item
        const projectsIndex = staticItems.findIndex(item => 
          item.route === '/admin/projects'
        );
        
        if (projectsIndex !== -1 && projectItems.length > 0) {
          // Add projects as children
          staticItems[projectsIndex] = {
            ...staticItems[projectsIndex],
            children: projectItems
          };
        }
        
        return staticItems;
      })
    ).subscribe(items => {
      this.navigationItems = items;
    });
  }
}
```

---

## Authentication & Authorization

### How Authentication Works

1. **Login**: User enters credentials → `AuthService` validates → Stores user in `localStorage`
2. **Guards**: Route guards check authentication and role before loading remotes
3. **Logout**: Clears `localStorage` and redirects to login

### Adding a New Role

#### Step 1: Update User Model

**projects/shell/src/app/models/auth.model.ts**:
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'researcher' | 'manager'; // Add 'manager'
}
```

#### Step 2: Add Mock User

**projects/shell/src/app/services/auth.service.ts**:
```typescript
private mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: '2', name: 'Employee User', email: 'employee@example.com', role: 'employee' },
  { id: '3', name: 'Researcher User', email: 'researcher@example.com', role: 'researcher' },
  { id: '4', name: 'Manager User', email: 'manager@example.com', role: 'manager' }, // NEW
];
```

#### Step 3: Create Manager Remote

```bash
ng generate application remote-manager --standalone --routing --style=css
npx ng add @angular-architects/native-federation --project remote-manager --type remote
```

#### Step 4: Add Route in Shell

**projects/shell/src/app/app.routes.ts**:
```typescript
{
  path: 'manager',
  canActivate: [authGuard, roleGuard],
  data: { role: 'manager' },
  loadComponent: () =>
    import('remoteManager/Component').then(m => m.AppComponent)
}
```

### Protecting Specific Features

You can add feature-level guards within remotes:

**projects/remote-admin/src/app/guards/feature.guard.ts**:
```typescript
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const canDeleteUsers: CanActivateFn = () => {
  // Check if user has specific permission
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  // Only certain admins can delete
  const canDelete = user.id === '1'; // Super admin only
  
  if (!canDelete) {
    alert('You do not have permission to delete users');
  }
  
  return canDelete;
};
```

Usage:
```typescript
{
  path: 'users/delete/:id',
  component: DeleteUserComponent,
  canActivate: [canDeleteUsers]
}
```

---

## Styling with Tailwind

### Tailwind Setup

All projects share a single `tailwind.config.js` at the root level.

**tailwind.config.js**:
```js
module.exports = {
  content: [
    "./projects/**/src/**/*.{html,ts}",  // Scans all projects
  ],
  theme: {
    extend: {
      // Add custom colors, fonts, etc.
    },
  },
  plugins: [],
}
```

### Using Tailwind Classes

✅ **Use Tailwind's utility classes directly in templates:**

```html
<div class="bg-white rounded-lg shadow-md p-6">
  <h2 class="text-xl font-bold text-gray-800">Title</h2>
  <p class="text-gray-600 mt-2">Description</p>
</div>
```

### Common Patterns

**Card Pattern**:
```html
<div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
  <!-- Content -->
</div>
```

**Button Pattern**:
```html
<button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
  Click Me
</button>
```

**Form Input Pattern**:
```html
<input 
  type="text" 
  class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
>
```

**Grid Layout**:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Responsive Design

Tailwind uses breakpoint prefixes:
- `sm:` - 640px and up
- `md:` - 768px and up  
- `lg:` - 1024px and up
- `xl:` - 1280px and up

Example:
```html
<div class="text-sm md:text-base lg:text-lg">
  <!-- Small text on mobile, larger on desktop -->
</div>
```

---

## Building & Deployment

### Development Build

```bash
# Build shared library
ng build shared-ui

# Build all applications
ng build shell
ng build remote-admin
ng build remote-employee
ng build remote-researcher
```

Or use the npm script:
```bash
npm run build:all
```

### Production Build

```bash
# Build for production with optimization
ng build shared-ui --configuration production
ng build shell --configuration production
ng build remote-admin --configuration production
ng build remote-employee --configuration production
ng build remote-researcher --configuration production
```

Output will be in `dist/` folder:
```
dist/
├── shared-ui/
├── shell/
├── remote-admin/
├── remote-employee/
└── remote-researcher/
```

### Deployment Architecture

**Option 1: Single Domain with Reverse Proxy**
```
Production URL: https://saz-platform.com

nginx configuration:
/           → Shell app (dist/shell)
/admin      → Remote admin (dist/remote-admin)
/employee   → Remote employee (dist/remote-employee)
/researcher → Remote researcher (dist/remote-researcher)
```

**Option 2: Separate Subdomains**
```
https://app.saz-platform.com       → Shell
https://admin.saz-platform.com     → Remote Admin
https://employee.saz-platform.com  → Remote Employee
https://researcher.saz-platform.com → Remote Researcher
```

### Update Federation Manifest for Production

**projects/shell/public/assets/federation.manifest.json** (Production):
```json
{
  "remoteAdmin": "https://admin.saz-platform.com/remoteEntry.json",
  "remoteEmployee": "https://employee.saz-platform.com/remoteEntry.json",
  "remoteResearcher": "https://researcher.saz-platform.com/remoteEntry.json"
}
```

### Deployment Steps

1. **Build all applications**
   ```bash
   npm run build:all
   ```

2. **Upload to server**
   ```bash
   # Example with SCP
   scp -r dist/shell/* user@server:/var/www/shell
   scp -r dist/remote-admin/* user@server:/var/www/admin
   scp -r dist/remote-employee/* user@server:/var/www/employee
   scp -r dist/remote-researcher/* user@server:/var/www/researcher
   ```

3. **Configure web server (nginx example)**
   ```nginx
   server {
       listen 80;
       server_name app.saz-platform.com;
       root /var/www/shell;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   
   server {
       listen 80;
       server_name admin.saz-platform.com;
       root /var/www/admin;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Test production deployment**
   - Visit main application URL
   - Login with test credentials
   - Verify all remotes load correctly
   - Check browser console for errors

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Cannot find module 'shared-ui'"

**Symptom**: TypeScript error when importing from shared-ui

**Solution**:
```bash
# Rebuild the shared-ui library
ng build shared-ui

# If still not working, clean and rebuild
rmdir /s /q dist
ng build shared-ui
```

**Why**: The library must be built before other apps can import from it.

---

#### Issue 2: Remote fails to load (404 Component.js)

**Symptom**: Error in console: `404 Not Found http://localhost:4201/Component.js`

**Solutions**:
1. **Verify remote is running**:
   - Check that all 4 dev servers are running
   - Visit http://localhost:4201/remoteEntry.json directly
   - Should return JSON, not 404

2. **Check federation.config.js**:
   ```js
   // Verify this section exists
   exposes: {
     './Component': './projects/remote-admin/src/app/app.component.ts',
   }
   ```

3. **Restart dev servers**:
   ```bash
   # Stop all (Ctrl+C)
   npm start
   ```

4. **Hard refresh browser**:
   - Press Ctrl+Shift+R (Windows/Linux)
   - Press Cmd+Shift+R (Mac)

---

#### Issue 3: Styles not applying

**Symptom**: Components render but have no styling

**Solutions**:
1. **Check Tailwind is included**:
   ```typescript
   // In component
   imports: [CommonModule, ...] // Correct
   ```

2. **Verify styles.css imports Tailwind**:
   ```css
   /* projects/remote-admin/src/styles.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Check angular.json includes styles**:
   ```json
   "styles": [
     "projects/remote-admin/src/styles.css"
   ]
   ```

4. **Rebuild with cache clear**:
   ```bash
   rmdir /s /q .angular
   npm start
   ```

---

#### Issue 4: Changes not reflected in browser

**Symptom**: Made code changes but browser shows old version

**Solutions**:
1. **For shared-ui changes**:
   ```bash
   # Must rebuild library
   ng build shared-ui
   # Then restart affected apps
   ```

2. **Clear browser cache**:
   - Hard refresh (Ctrl+Shift+R)
   - Or open DevTools → Network tab → Disable cache

3. **Check for TypeScript errors**:
   - Look in terminal for compilation errors
   - Fix all errors before expecting changes

---

#### Issue 5: Login redirects but shows blank page

**Symptom**: After login, URL changes to /admin but page is blank

**Solutions**:
1. **Check browser console** for errors
2. **Verify guards are working**:
   ```typescript
   // In shell/app.routes.ts
   canActivate: [authGuard, roleGuard]
   ```

3. **Check localStorage**:
   - Open DevTools → Application → Local Storage
   - Should see `currentUser` key with user data

4. **Verify remote routes**:
   ```typescript
   // remote-admin/app.routes.ts should have
   {
     path: '',
     redirectTo: 'dashboard',
     pathMatch: 'full'
   }
   ```

---

#### Issue 6: "Cannot read property of undefined" in navigation

**Symptom**: Error when loading sidebar navigation

**Solutions**:
1. **Check JSON file syntax**:
   ```json
   // navigation.json - must be valid JSON
   [
     {
       "label": "Dashboard",
       "route": "/admin/dashboard",
       "icon": "📊"
     }
   ]
   ```

2. **Verify JSON import in component**:
   ```typescript
   import navigationData from './data/navigation.json';
   ```

3. **Check tsconfig.app.json**:
   ```json
   {
     "compilerOptions": {
       "resolveJsonModule": true,
       "esModuleInterop": true
     }
   }
   ```

---

#### Issue 7: Port already in use

**Symptom**: `Error: Port 4200 is already in use`

**Solutions**:
1. **Kill existing process**:
   ```bash
   # Windows
   netstat -ano | findstr :4200
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -ti:4200 | xargs kill -9
   ```

2. **Change port in package.json**:
   ```json
   "start:shell": "ng serve shell --port 4200"
   ```

---

### Performance Tips

#### 1. Lazy Load Heavy Components

Instead of:
```typescript
import { HeavyComponent } from './heavy.component';

// In routes
{ path: 'heavy', component: HeavyComponent }
```

Use:
```typescript
// In routes
{ 
  path: 'heavy', 
  loadComponent: () => import('./heavy.component').then(m => m.HeavyComponent)
}
```

#### 2. Use OnPush Change Detection

For components that don't change often:
```typescript
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

#### 3. Optimize Images

- Use WebP format where possible
- Implement lazy loading: `<img loading="lazy" src="...">`
- Compress images before adding to project

#### 4. Build Optimization

Production builds are automatically optimized, but you can check bundle sizes:
```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/shell/stats.json
```

---

## Advanced Topics

### Integrating with Backend API

#### Step 1: Install HttpClient

It's already available, just import it:

**Example API Service**:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.saz-platform.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }
}
```

#### Step 2: Provide HttpClient

**projects/shell/src/bootstrap.ts**:
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // NEW
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()  // NEW
  ]
}).catch(err => console.error(err));
```

Do the same for all remotes (remote-admin, remote-employee, remote-researcher).

#### Step 3: Handle API Errors

```typescript
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
    retry(2),  // Retry failed requests up to 2 times
    catchError(error => {
      console.error('Failed to fetch users:', error);
      // Show error to user
      return throwError(() => new Error('Failed to load users'));
    })
  );
}
```

#### Step 4: Add Loading States

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    @if (loading) {
      <div class="flex justify-center p-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }
    
    @if (error) {
      <div class="bg-red-100 text-red-700 p-4 rounded">
        {{error}}
      </div>
    }
    
    @if (!loading && !error) {
      <!-- Your content -->
    }
  `
})
export class MyComponent implements OnInit {
  loading = true;
  error = '';
  data: any[] = [];

  ngOnInit() {
    this.apiService.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
```

---

### Adding Authentication with JWT

#### Step 1: Update Auth Service

**projects/shell/src/app/services/auth.service.ts**:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = 'https://api.saz-platform.com';

  constructor(private http: HttpClient) {
    // Load user from storage on init
    const storedUser = localStorage.getItem('currentUser');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post<{ user: User; token: string }>(
      `${this.apiUrl}/auth/login`,
      credentials
    ).pipe(
      tap(response => {
        // Store user and token
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
```

#### Step 2: Add HTTP Interceptor

**projects/shell/src/app/interceptors/auth.interceptor.ts**:
```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    // Clone request and add authorization header
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
```

#### Step 3: Register Interceptor

**projects/shell/src/bootstrap.ts**:
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
});
```

---

### State Management

For complex applications, consider adding state management.

#### Option 1: Simple Service-Based State

**projects/shared-ui/src/lib/services/state.service.ts**:
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppState {
  selectedProject: number | null;
  notifications: Notification[];
  sidebarCollapsed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private stateSubject = new BehaviorSubject<AppState>({
    selectedProject: null,
    notifications: [],
    sidebarCollapsed: false
  });

  state$: Observable<AppState> = this.stateSubject.asObservable();

  updateState(partial: Partial<AppState>): void {
    const current = this.stateSubject.value;
    this.stateSubject.next({ ...current, ...partial });
  }

  selectProject(projectId: number): void {
    this.updateState({ selectedProject: projectId });
  }

  toggleSidebar(): void {
    const current = this.stateSubject.value;
    this.updateState({ sidebarCollapsed: !current.sidebarCollapsed });
  }
}
```

#### Option 2: NgRx (for large apps)

```bash
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
```

Follow NgRx documentation for setup: https://ngrx.io/guide/store

---

### Testing

#### Unit Testing Components

**Example: Testing Dashboard Component**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent]  // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct number of stats cards', () => {
    const compiled = fixture.nativeElement;
    const cards = compiled.querySelectorAll('.stat-card');
    expect(cards.length).toBe(3);
  });
});
```

Run tests:
```bash
ng test remote-admin
```

#### E2E Testing

Consider using Playwright or Cypress:

```bash
npm install -D @playwright/test
npx playwright install
```

**Example E2E Test**:
```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('admin can login and access dashboard', async ({ page }) => {
  await page.goto('http://localhost:4200');
  
  // Fill login form
  await page.fill('input[type="email"]', 'admin@example.com');
  await page.fill('input[type="password"]', 'admin');
  await page.click('button[type="submit"]');
  
  // Should redirect to admin dashboard
  await expect(page).toHaveURL(/.*admin\/dashboard/);
  await expect(page.locator('h2')).toContainText('Admin Dashboard');
});
```

---

## Development Workflow

### Daily Development Process

1. **Start development servers**
   ```bash
   # Terminal 1: Watch shared-ui for changes
   ng build shared-ui --watch
   
   # Terminal 2: Start all apps
   npm start
   ```

2. **Make changes**
   - Edit component/service files
   - Changes to remotes auto-reload
   - Changes to shared-ui require rebuild (or use --watch)

3. **Test changes**
   - Check browser (http://localhost:4200)
   - Verify all affected remotes
   - Check browser console for errors

4. **Commit changes**
   ```bash
   git add .
   git commit -m "Add reports feature to admin"
   git push
   ```

### Branch Strategy

Suggested Git workflow:
```
main            (production)
  ├── develop   (integration)
  │   ├── feature/admin-reports
  │   ├── feature/employee-time-tracker
  │   └── bugfix/sidebar-navigation
```

### Code Review Checklist

Before submitting PR:
- ✅ All TypeScript errors resolved
- ✅ Components use standalone pattern
- ✅ Shared components in shared-ui (not duplicated)
- ✅ Tailwind classes used (no inline styles)
- ✅ Navigation updated if new routes added
- ✅ Console has no errors
- ✅ Works across all affected remotes
- ✅ Responsive design tested

---

## Security Best Practices

### 1. Never Store Sensitive Data in Frontend

❌ **Don't do this**:
```typescript
const API_KEY = 'secret-key-12345';  // Visible in source code!
```

✅ **Do this**:
```typescript
// Backend handles API keys
// Frontend only sends authenticated requests
```

### 2. Validate User Input

```typescript
createUser(formData: any) {
  // Validate before sending
  if (!formData.email?.includes('@')) {
    throw new Error('Invalid email');
  }
  
  if (formData.password?.length < 8) {
    throw new Error('Password too short');
  }
  
  return this.http.post('/users', formData);
}
```

### 3. Implement CORS Properly

Backend should whitelist allowed origins:
```
Access-Control-Allow-Origin: https://app.saz-platform.com
```

### 4. Use HTTPS in Production

All production URLs should use HTTPS:
```json
{
  "remoteAdmin": "https://admin.saz-platform.com/remoteEntry.json"
}
```

### 5. Sanitize Dynamic Content

Angular auto-sanitizes, but be careful with:
```typescript
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

// Only if you absolutely trust the source
safeHtml = this.sanitizer.bypassSecurityTrustHtml(trustedHtml);
```

---

## Maintenance & Updates

### Updating Angular

```bash
# Check for updates
ng update

# Update Angular packages
ng update @angular/core @angular/cli

# Update Native Federation
npm install @angular-architects/native-federation@latest
```

### Updating Dependencies

```bash
# Check outdated packages
npm outdated

# Update specific package
npm install package-name@latest

# Update all (carefully!)
npm update
```

### Monitoring Bundle Size

```bash
# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/shell/stats.json
```

Target bundle sizes:
- **Shell**: < 500KB (initial)
- **Each Remote**: < 300KB
- **Shared UI**: < 100KB

---

## Getting Help

### Resources

- **Angular Documentation**: https://angular.dev
- **Native Federation**: https://www.npmjs.com/package/@angular-architects/native-federation
- **Tailwind CSS**: https://tailwindcss.com/docs
- **RxJS**: https://rxjs.dev

### Common Commands Reference

```bash
# Development
ng build shared-ui              # Build shared library
ng build shared-ui --watch      # Auto-rebuild on changes
npm start                       # Start all apps
ng serve shell --port 4200      # Start specific app

# Generate files
ng generate component name --project=remote-admin --standalone
ng generate service name --project=remote-admin
ng generate interface name --project=shared-ui

# Building
npm run build:all              # Build everything
ng build shell --configuration production

# Testing
ng test remote-admin           # Run unit tests
ng e2e                         # Run E2E tests

# Cleanup
rmdir /s /q dist              # Delete build files (Windows)
rmdir /s /q .angular          # Delete cache (Windows)
rm -rf dist                   # Delete build files (Mac/Linux)
rm -rf .angular               # Delete cache (Mac/Linux)
```

---

## Quick Reference: File Locations

| Task | File Location |
|------|---------------|
| Add shell route | `projects/shell/src/app/app.routes.ts` |
| Add admin page | `projects/remote-admin/src/app/components/` |
| Add shared component | `projects/shared-ui/src/lib/components/` |
| Update navigation | `projects/remote-admin/src/app/data/navigation.json` |
| Configure federation | `projects/remote-admin/federation.config.js` |
| Add auth logic | `projects/shell/src/app/services/auth.service.ts` |
| Style configuration | `tailwind.config.js` (root) |
| Global styles | `projects/*/src/styles.css` |

---

## Conclusion

This platform provides a solid foundation for building scalable, role-based applications with Angular 19 and Module Federation. The architecture allows:

- **Independent development** of features by role
- **Code sharing** through the shared-ui library
- **Lazy loading** for optimal performance
- **Easy extensibility** with new roles and features

As you continue development, remember:
- Always rebuild shared-ui after changes
- Keep components standalone
- Use Tailwind for consistency
- Follow the established patterns
- Test across all affected remotes

For questions or issues not covered here, consult the resources section or reach out to your team lead.

**Happy coding! 🚀**
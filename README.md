# SAZ Platform - Developer Manual

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Core Features](#core-features)
5. [Working with the Dynamic Navigation System](#working-with-the-dynamic-navigation-system)
6. [Adding New Projects and Data Sources](#adding-new-projects-and-data-sources)
7. [Working with Shared Components](#working-with-shared-components)
8. [Creating Role-Specific Features](#creating-role-specific-features)
9. [Authentication & Authorization](#authentication--authorization)
10. [Styling with Tailwind](#styling-with-tailwind)
11. [Building & Deployment](#building--deployment)
12. [Troubleshooting](#troubleshooting)

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
✅ **Dynamic Navigation**: Project-based navigation that expands to show data sources  
✅ **Shared Component Library**: Reusable UI components for consistency across applications

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
Admin component renders with dynamic sidebar
         ↓
Sidebar loads projects with nested data sources
         ↓
User navigates to /admin/project/samen-aan-z/survey-dashboard
         ↓
Survey dashboard component loads with stats and table
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
│   │   │   │   │   ├── home/            # Projects overview
│   │   │   │   │   ├── users/           # User management
│   │   │   │   │   ├── survey-dashboard/   # Survey management
│   │   │   │   │   └── wearables-dashboard/  # Wearables data
│   │   │   │   ├── data/         # JSON configuration files
│   │   │   │   │   ├── navigation.json      # Base navigation
│   │   │   │   │   ├── projects.json        # Available projects
│   │   │   │   │   ├── projects-config.json # Project data sources
│   │   │   │   │   ├── stats.json          # Statistics data
│   │   │   │   │   └── surveys.json        # Survey data
│   │   │   │   ├── services/     # Admin services
│   │   │   │   │   └── admin-data.service.ts  # Dynamic navigation
│   │   │   │   ├── app.component.ts  # Main admin wrapper
│   │   │   │   └── app.routes.ts # Admin routes
│   │   │   ├── main.ts
│   │   │   └── bootstrap.ts
│   │   └── federation.config.js
│   │
│   ├── remote-employee/          # Employee application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/
│   │   │   │   │   └── home/
│   │   │   │   ├── data/
│   │   │   │   │   └── navigation.json
│   │   │   │   └── services/
│   │   │   │       └── employee-data.service.ts
│   │
│   ├── remote-researcher/        # Researcher application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/
│   │   │   │   │   ├── home/               # Projects overview
│   │   │   │   │   ├── survey-dashboard/   # Survey management
│   │   │   │   │   ├── wearables-dashboard/  # Wearables data
│   │   │   │   │   └── newsletters/        # Newsletter management
│   │   │   │   ├── data/
│   │   │   │   │   ├── navigation.json
│   │   │   │   │   ├── projects.json
│   │   │   │   │   ├── projects-config.json
│   │   │   │   │   ├── stats.json
│   │   │   │   │   └── surveys.json
│   │   │   │   └── services/
│   │   │   │       └── researcher-data.service.ts
│   │
│   └── shared-ui/                # Shared component library
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/
│       │   │   │   ├── dashboard-layout/  # Main layout wrapper
│       │   │   │   │   ├── sidebar/       # Dynamic sidebar with projects
│       │   │   │   │   ├── right-panel/
│       │   │   │   │   └── dashboard-layout.component.ts
│       │   │   │   ├── banner/           # Hero banner component
│       │   │   │   ├── stats-blocks/     # Statistics display
│       │   │   │   ├── project-cards/    # Project card grid
│       │   │   │   ├── project-filters/  # Search and filter controls
│       │   │   │   ├── surveys-table/    # Survey management table
│       │   │   │   └── filters/          # Reusable filter components
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

## Core Features

### 1. Dynamic Project-Based Navigation

The platform features a sophisticated navigation system that dynamically loads projects and their associated data sources:

- **Base Navigation**: Static menu items (Home, Users, etc.)
- **Project Navigation**: Projects loaded from configuration files
- **Data Source Navigation**: Nested items under each project (Surveys, Wearables, etc.)
- **Auto-Expansion**: Projects automatically expand when a child route is active
- **Role-Based**: Different roles see different projects and data sources

### 2. Shared Component Library

The `shared-ui` library provides consistent UI components:

- **Dashboard Layout**: Complete layout with sidebar and content area
- **Banner Component**: Hero section with title, subtitle, and action button
- **Stats Blocks**: Gradient-styled statistics cards
- **Project Cards**: Card display for projects with access control
- **Project Filters**: Search, sort, and filter functionality
- **Surveys Table**: Paginated table with actions and status indicators
- **Filter Components**: Dropdown, calendar, and search filters

### 3. Multi-Role Support

Three distinct user roles with different capabilities:

- **Admin**: Full access to all projects, user management, and data sources
- **Researcher**: Access to assigned projects and data sources
- **Employee**: Limited access for participation in studies

### 4. Data Source Management

Projects can have multiple data sources:

- Survey Dashboard
- Wearables Data
- Newsletters
- Custom data sources (easily extensible)

---

## Working with the Dynamic Navigation System

### How It Works

The navigation system combines static menu items with dynamically loaded projects:

1. **Base Navigation** (`navigation.json`): Static menu items
2. **Projects Configuration** (`projects-config.json`): Projects and their data sources
3. **Data Service**: Combines both to create complete navigation structure
4. **Sidebar Component**: Renders the navigation with expand/collapse functionality

### Navigation Flow

```
AppComponent.ngOnInit()
         ↓
DataService.getNavigationItems()
         ↓
Load navigation.json (base nav)
         ↓
Load projects-config.json (projects)
         ↓
Convert projects to NavigationItems with children
         ↓
Combine: [Home, Project1, Project2, ...otherNav]
         ↓
Pass to SidebarComponent
         ↓
Sidebar renders with expand/collapse
```

### Example: Admin Navigation Structure

**Input Files:**

`navigation.json`:
```json
[
  {
    "label": "Projects Overview",
    "route": "/admin/home",
    "icon": "home"
  },
  {
    "label": "Users",
    "route": "/admin/users",
    "icon": "users"
  }
]
```

`projects-config.json`:
```json
[
  {
    "id": "samen-aan-z",
    "name": "Samen aan Z",
    "dataSources": [
      {
        "id": "survey-dashboard",
        "name": "Survey Dashboard",
        "route": "/admin/project/samen-aan-z/survey-dashboard",
        "type": "survey"
      },
      {
        "id": "wearables",
        "name": "Wearables",
        "route": "/admin/project/samen-aan-z/wearables",
        "type": "wearables"
      }
    ]
  }
]
```

**Output Navigation Structure:**

```typescript
[
  // From navigation.json
  {
    label: "Projects Overview",
    route: "/admin/home",
    icon: "home"
  },
  // From projects-config.json
  {
    label: "Samen aan Z",
    route: "/admin/project/samen-aan-z",
    icon: "projects",
    isProject: true,
    isExpanded: false,
    children: [
      {
        label: "Survey Dashboard",
        route: "/admin/project/samen-aan-z/survey-dashboard",
        icon: "survey"
      },
      {
        label: "Wearables",
        route: "/admin/project/samen-aan-z/wearables",
        icon: "wearables"
      }
    ]
  },
  // Rest from navigation.json
  {
    label: "Users",
    route: "/admin/users",
    icon: "users"
  }
]
```

---

## Adding New Projects and Data Sources

### Scenario: Add a New Data Source to Existing Project

**Goal**: Add a "Newsletters" data source to the "Samen aan Z" project.

#### Step 1: Update Projects Configuration

**`projects/remote-admin/src/app/data/projects-config.json`**:
```json
[
  {
    "id": "samen-aan-z",
    "name": "Samen aan Z",
    "dataSources": [
      {
        "id": "survey-dashboard",
        "name": "Survey Dashboard",
        "route": "/admin/project/samen-aan-z/survey-dashboard",
        "type": "survey"
      },
      {
        "id": "wearables",
        "name": "Wearables",
        "route": "/admin/project/samen-aan-z/wearables",
        "type": "wearables"
      },
      {
        "id": "newsletters",
        "name": "Newsletters",
        "route": "/admin/project/samen-aan-z/newsletters",
        "type": "newsletters"
      }
    ]
  }
]
```

#### Step 2: Create the Component

```bash
ng generate component components/newsletters --project=remote-admin --standalone
```

**`projects/remote-admin/src/app/components/newsletters/newsletters.component.ts`**:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from 'shared-ui';

@Component({
  selector: 'app-newsletters',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  template: `
    <div class="p-field">
      <lib-banner
        [title]="'Newsletters'"
        [subtitle]="'Create and manage newsletters to keep participants informed.'"
        [buttonText]="'Create Newsletter'"
        [buttonAction]="onCreateNewsletter"
      ></lib-banner>
    </div>
  `
})
export class NewslettersComponent {
  onCreateNewsletter = (): void => {
    console.log('Create new newsletter');
  };
}
```

#### Step 3: Add Route

**`projects/remote-admin/src/app/app.routes.ts`**:
```typescript
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { SurveyDashboardComponent } from './components/survey-dashboard/survey-dashboard.component';
import { WearablesDashboardComponent } from './components/wearables-dashboard/wearables-dashboard.component';
import { NewslettersComponent } from './components/newsletters/newsletters.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'project/:projectId/survey-dashboard',
        component: SurveyDashboardComponent
      },
      {
        path: 'project/:projectId/wearables',
        component: WearablesDashboardComponent
      },
      {
        path: 'project/:projectId/newsletters',
        component: NewslettersComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
```

#### Step 4: Update Icon Mapping (if needed)

If you're using a new data source type, update the icon mapping in the data service:

**`projects/remote-admin/src/app/services/admin-data.service.ts`**:
```typescript
private getDataSourceIcon(type: string): string {
  const iconMap: Record<string, string> = {
    'survey': 'survey',
    'wearables': 'wearables',
    'newsletters': 'news',  // Add new icon mapping
    'ai': 'dataSources',
    'app': 'dataSources'
  };
  return iconMap[type] || 'dataSources';
}
```

#### Step 5: Test

1. Restart dev server
2. Login as admin
3. Navigate to Projects Overview
4. Click on "Samen aan Z" in sidebar
5. Should see "Newsletters" as a nested item
6. Click to navigate to newsletters page

### Adding an Entirely New Project

#### Step 1: Add Project to projects.json

**`projects/remote-admin/src/app/data/projects.json`**:
```json
[
  // ... existing projects
  {
    "id": "new-research-project",
    "title": "New Research Project",
    "image": "assets/new-project.jpg",
    "dataSources": ["Survey", "AI Analysis"],
    "isMyProject": true,
    "createdDate": "2025-01-15"
  }
]
```

#### Step 2: Add Project Configuration

**`projects/remote-admin/src/app/data/projects-config.json`**:
```json
[
  // ... existing configs
  {
    "id": "new-research-project",
    "name": "New Research Project",
    "dataSources": [
      {
        "id": "survey-dashboard",
        "name": "Survey Dashboard",
        "route": "/admin/project/new-research-project/survey-dashboard",
        "type": "survey"
      },
      {
        "id": "ai-analysis",
        "name": "AI Analysis",
        "route": "/admin/project/new-research-project/ai-analysis",
        "type": "ai"
      }
    ]
  }
]
```

#### Step 3: Create Components and Routes

Follow the same steps as adding a data source above.

---

## Working with Shared Components

### Available Components

#### 1. Dashboard Layout

Complete layout with sidebar, content area, and optional right panel.

```typescript
import { DashboardLayoutComponent, NavigationItem, UserInfo } from 'shared-ui';

@Component({
  template: `
    <lib-dashboard-layout 
      [navigationItems]="navigationItems" 
      [userInfo]="userInfo">
      <router-outlet></router-outlet>
    </lib-dashboard-layout>
  `
})
export class AppComponent {
  navigationItems: NavigationItem[] = [];
  userInfo: UserInfo = {
    name: 'Sophie',
    role: 'Admin',
    email: 'admin@example.com'
  };
}
```

#### 2. Banner Component

Hero section with gradient background and action button.

```typescript
import { BannerComponent } from 'shared-ui';

@Component({
  imports: [BannerComponent],
  template: `
    <lib-banner
      [title]="'Dashboard Title'"
      [subtitle]="'Description of the dashboard purpose and features.'"
      [buttonText]="'Take Action'"
      [buttonAction]="handleAction"
    ></lib-banner>
  `
})
export class MyComponent {
  handleAction = (): void => {
    console.log('Button clicked');
  };
}
```

#### 3. Stats Blocks

Display statistics with gradient-styled cards.

```typescript
import { StatsBlocksComponent, StatBlock } from 'shared-ui';

@Component({
  imports: [StatsBlocksComponent],
  template: `
    <lib-stats-blocks [stats]="stats"></lib-stats-blocks>
  `
})
export class MyComponent {
  stats: StatBlock[] = [
    {
      id: "projects",
      icon: "projects",
      title: "16",
      subtitle: "Total Projects",
      gradientFrom: "#3B82F6",
      gradientTo: "#1D4ED8"
    }
  ];
}
```

#### 4. Project Cards

Display projects in a card grid with access control.

```typescript
import { ProjectCardComponent, ProjectCard } from 'shared-ui';

@Component({
  imports: [ProjectCardComponent],
  template: `
    @for (project of projects; track project.id) {
      <lib-project-card 
        [project]="project"
        (visitProject)="handleVisit($event)"
        (requestAccess)="handleRequest($event)"
      ></lib-project-card>
    }
  `
})
export class MyComponent {
  projects: ProjectCard[] = [];
  
  handleVisit(projectId: string): void {
    // Navigate to project
  }
  
  handleRequest(projectId: string): void {
    // Show request modal
  }
}
```

#### 5. Surveys Table

Paginated table for survey management.

```typescript
import { SurveysTableComponent, Survey } from 'shared-ui';

@Component({
  imports: [SurveysTableComponent],
  template: `
    <lib-surveys-table 
      [surveys]="surveys" 
      [itemsPerPage]="5">
    </lib-surveys-table>
  `
})
export class MyComponent {
  surveys: Survey[] = [];
}
```

#### 6. Project Filters

Search, sort, and filter controls.

```typescript
import { ProjectFiltersComponent, ProjectFilters } from 'shared-ui';

@Component({
  imports: [ProjectFiltersComponent],
  template: `
    <lib-project-filters
      (filtersChange)="handleFilters($event)"
    ></lib-project-filters>
  `
})
export class MyComponent {
  handleFilters(filters: ProjectFilters): void {
    console.log('Filters:', filters);
    // Apply filters to your data
  }
}
```

### Creating a New Shared Component

When to create shared components:
- ✅ Used by 2+ remote applications
- ✅ Core UI patterns (buttons, cards, modals)
- ✅ Consistent styling needed across apps

#### Example: Create a Card Component

```bash
ng generate component lib/components/card --project=shared-ui --standalone --export
```

**`projects/shared-ui/src/lib/components/card/card.component.ts`**:
```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-ui-bg rounded-lg shadow-component p-default border border-ui-stroke/40">
      @if (title) {
        <h3 class="text-h3 font-semibold text-ui-text mb-default">{{title}}</h3>
      }
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  @Input() title?: string;
}
```

**Export from library** (`projects/shared-ui/src/public-api.ts`):
```typescript
export * from './lib/components/card/card.component';
```

**Rebuild library**:
```bash
ng build shared-ui
```

**Use in remotes**:
```typescript
import { CardComponent } from 'shared-ui';

@Component({
  imports: [CardComponent],
  template: `
    <lib-card title="My Card">
      <p>Card content here</p>
    </lib-card>
  `
})
```

---

## Creating Role-Specific Features

### Scenario: Add Time Tracking for Employees

This feature should only exist in the employee remote.

#### Step 1: Create Component

```bash
ng generate component components/time-tracker --project=remote-employee --standalone
```

#### Step 2: Implement Component

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TimeEntry {
  id: number;
  project: string;
  hours: number;
  date: string;
}

@Component({
  selector: 'app-time-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-field">
      <h2 class="text-h2 font-semibold text-ui-text mb-field">Time Tracker</h2>
      
      <div class="bg-ui-bg rounded-lg shadow-component p-default border border-ui-stroke/40 mb-field">
        <h3 class="text-h3 font-semibold text-ui-text mb-default">Log Time</h3>
        
        <form (ngSubmit)="addEntry()" class="space-y-default">
          <div>
            <label class="block text-p font-medium text-ui-text mb-xs">Project</label>
            <input 
              type="text" 
              [(ngModel)]="newEntry.project"
              name="project"
              class="w-full rounded-lg bg-ui-bg px-text py-text text-p shadow-component border border-ui-stroke/40"
              placeholder="Project name"
            >
          </div>
          
          <div>
            <label class="block text-p font-medium text-ui-text mb-xs">Hours</label>
            <input 
              type="number" 
              [(ngModel)]="newEntry.hours"
              name="hours"
              class="w-full rounded-lg bg-ui-bg px-text py-text text-p shadow-component border border-ui-stroke/40"
              placeholder="Hours worked"
            >
          </div>
          
          <button 
            type="submit"
            class="rounded-lg bg-ui-action px-button py-button text-p font-semibold text-ui-action-text hover:bg-ui-action-hover"
          >
            Log Time
          </button>
        </form>
      </div>

      <div>
        <h3 class="text-h3 font-semibold text-ui-text mb-default">Recent Entries</h3>
        <div class="space-y-default">
          @for (entry of entries; track entry.id) {
            <div class="bg-ui-bg rounded-lg shadow-component p-default border border-ui-stroke/40 flex justify-between items-center">
              <div>
                <p class="text-p font-medium text-ui-text">{{entry.project}}</p>
                <p class="text-small text-ui-text-muted">{{entry.date}}</p>
              </div>
              <p class="text-h3 font-semibold text-ui-text">{{entry.hours}}h</p>
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

#### Step 3: Add to Navigation

**`projects/remote-employee/src/app/data/navigation.json`**:
```json
[
  {
    "label": "Home",
    "route": "/employee/home",
    "icon": "home"
  },
  {
    "label": "Time Tracker",
    "route": "/employee/time-tracker",
    "icon": "dataSources"
  }
]
```

#### Step 4: Add Route

**`projects/remote-employee/src/app/app.routes.ts`**:
```typescript
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'time-tracker',
        component: TimeTrackerComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
```

---

## Authentication & Authorization

### How It Works

1. User enters credentials on login page
2. `AuthService` validates against mock users
3. User data stored in `localStorage`
4. Route guards check authentication and role
5. Shell loads appropriate remote application

### Mock Users

Located in `projects/shell/src/app/services/auth.service.ts`:

```typescript
private mockUsers: User[] = [
  { id: '1', name: 'Sophie', email: 'admin@example.com', role: 'admin' },
  { id: '2', name: 'Joyce', email: 'employee@example.com', role: 'employee' },
  { id: '3', name: 'Emma', email: 'researcher@example.com', role: 'researcher' }
];
```

Password is the same as the role name (admin, employee, researcher).

### Adding a New Role

#### Step 1: Update User Model

**`projects/shell/src/app/models/auth.model.ts`**:
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'researcher' | 'manager'; // Add new role
}
```

#### Step 2: Add Mock User

```typescript
private mockUsers: User[] = [
  { id: '1', name: 'Sophie', email: 'admin@example.com', role: 'admin' },
  { id: '2', name: 'Joyce', email: 'employee@example.com', role: 'employee' },
  { id: '3', name: 'Emma', email: 'researcher@example.com', role: 'researcher' },
  { id: '4', name: 'Manager User', email: 'manager@example.com', role: 'manager' }
];
```

#### Step 3: Create Remote Application

```bash
ng generate application remote-manager --standalone --routing --style=css
npx ng add @angular-architects/native-federation --project remote-manager --type remote
```

#### Step 4: Add Route in Shell

**`projects/shell/src/app/app.routes.ts`**:
```typescript
{
  path: 'manager',
  canActivate: [authGuard, roleGuard],
  data: { role: 'manager' },
  loadChildren: () => 
    loadRemoteModule('remoteManager', './routes')
      .then(m => m.routes)
}
```

---

## Styling with Tailwind

### Custom Theme Configuration

The platform uses a custom Tailwind theme with semantic color tokens defined in `tailwind.config.js`:
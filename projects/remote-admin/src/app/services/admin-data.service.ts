import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import navigationData from '../data/navigation.json';
import projectsConfig from '../data/projects-config.json';
import { NavigationItem } from 'shared-ui';

interface ProjectConfig {
  id: string;
  name: string;
  dataSources: {
    id: string;
    name: string;
    route: string;
    type: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  getNavigationItems(): Observable<NavigationItem[]> {
    return this.getCompleteNavigation();
  }

  private getCompleteNavigation(): Observable<NavigationItem[]> {
    const baseNav = navigationData as NavigationItem[];
    const projects = projectsConfig as ProjectConfig[];

    // Convert projects to navigation items with children
    const projectNavItems: NavigationItem[] = projects.map(project => ({
      label: project.name,
      route: `/admin/project/${project.id}`,
      icon: 'projects',
      isProject: true,
      isExpanded: false,
      children: project.dataSources.map(ds => ({
        label: ds.name,
        route: ds.route,
        icon: this.getDataSourceIcon(ds.type)
      }))
    }));

    // Combine base navigation with project items
    const completeNav = [...baseNav, ...projectNavItems];

    return of(completeNav);
  }

  private getDataSourceIcon(type: string): string {
    const iconMap: Record<string, string> = {
      'survey': 'news',
      'wearables': 'dashboard',
      'ai': 'dashboard',
      'app': 'dashboard'
    };
    return iconMap[type] || 'dashboard';
  }

  // Get user's accessible projects (for now, return all)
  getUserProjects(): Observable<ProjectConfig[]> {
    return of(projectsConfig as ProjectConfig[]);
  }
}
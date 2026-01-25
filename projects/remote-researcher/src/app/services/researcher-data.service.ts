
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
export class ResearcherDataService {
  getNavigationItems(): Observable<NavigationItem[]> {
    console.log('🔍 ResearcherDataService: Loading navigation items');
    return this.getCompleteNavigation();
  }

  private getCompleteNavigation(): Observable<NavigationItem[]> {
    const baseNav = navigationData as NavigationItem[];
    const projects = projectsConfig as ProjectConfig[];

    console.log('📋 Base Navigation:', baseNav);
    console.log('📦 Projects Config:', projects);

    // Convert projects to navigation items with children
    const projectNavItems: NavigationItem[] = projects.map(project => {
      const navItem: NavigationItem = {
        label: project.name,
        route: `/researcher/project/${project.id}`,
        icon: 'projects',
        isProject: true,
        isExpanded: false, // Start collapsed
        children: project.dataSources.map(ds => ({
          label: ds.name,
          route: ds.route,
          icon: this.getDataSourceIcon(ds.type)
        }))
      };
      
      console.log(`✅ Created project nav item: ${project.name}`, navItem);
      return navItem;
    });

    // Reorder: First item from baseNav, then projects
    const completeNav = [
      baseNav[0],           // Projects Overview (home)
      ...projectNavItems    // All projects (Samen aan Z, etc.)
    ];

    console.log('🎯 Complete Navigation:', completeNav);
    return of(completeNav);
  }

  private getDataSourceIcon(type: string): string {
    const iconMap: Record<string, string> = {
      'survey': 'survey',
      'wearables': 'wearables',
      'newsletters': 'news',
      'ai': 'dataSources',
      'app': 'dataSources'
    };
    return iconMap[type] || 'dataSources';
  }

  // Get user's accessible projects (for now, return all)
  getUserProjects(): Observable<ProjectConfig[]> {
    return of(projectsConfig as ProjectConfig[]);
  }
}
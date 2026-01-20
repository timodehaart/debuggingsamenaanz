import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import navigationData from '../data/navigation.json';
import { NavigationItem } from 'shared-ui';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  getNavigationItems(): Observable<NavigationItem[]> {
    return of(navigationData);
  }

  // Future: Load dynamic projects and add to navigation
  getDynamicProjects(): Observable<NavigationItem[]> {
    // This would fetch from an API later
    return of([]);
  }
}
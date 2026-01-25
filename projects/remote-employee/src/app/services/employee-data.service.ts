import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import navigationData from '../data/navigation.json';
import { NavigationItem } from 'shared-ui';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  getNavigationItems(): Observable<NavigationItem[]> {
    // Employee only has simple navigation - just return the base nav
    return of(navigationData as NavigationItem[]);
  }
}

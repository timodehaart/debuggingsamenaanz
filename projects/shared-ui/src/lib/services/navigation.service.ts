import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationItem } from '../models/navigation.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigationItems = new BehaviorSubject<NavigationItem[]>([]);
  
  navigationItems$: Observable<NavigationItem[]> = this.navigationItems.asObservable();

  setNavigationItems(items: NavigationItem[]): void {
    this.navigationItems.next(items);
  }

  addNavigationItem(item: NavigationItem): void {
    const current = this.navigationItems.value;
    this.navigationItems.next([...current, item]);
  }
}
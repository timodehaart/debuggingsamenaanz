import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, LoginCredentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  // Mock user data
  private mockUsers: User[] = [
    { id: '1', name: 'Sophie', email: 'admin@example.com', role: 'admin' },
    { id: '2', name: 'Joyce', email: 'employee@example.com', role: 'employee' },
    { id: '3', name: 'Emma', email: 'researcher@example.com', role: 'researcher' }
  ];

  constructor() {
    // Check for stored user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<User> {
    // Mock authentication - password is same as role name
    const user = this.mockUsers.find(u => u.email === credentials.email);
    
    if (user && credentials.password === user.role) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(user).pipe(delay(500));
    }
    
    return throwError(() => new Error('Invalid credentials')).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
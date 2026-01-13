import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6 text-center">SAZ Platform Login</h2>
        
        @if (error) {
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{error}}
          </div>
        }

        <form (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              [(ngModel)]="email"
              name="email"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              [(ngModel)]="password"
              name="password"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>

          <button 
            type="submit"
            [disabled]="loading"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {{loading ? 'Logging in...' : 'Login'}}
          </button>
        </form>

        <div class="mt-6 text-sm text-gray-600">
          <p class="font-semibold mb-2">Test Credentials:</p>
          <p>Admin: admin&#64;example.com / admin</p>
          <p>Employee: employee&#64;example.com / employee</p>
          <p>Researcher: researcher&#64;example.com / researcher</p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (user) => {
          const route = `/${user.role}`;
          this.router.navigate([route]);
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        }
      });
  }
}
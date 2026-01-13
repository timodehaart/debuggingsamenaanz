import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from 'shared-ui';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <lib-page-header 
      title="User Management" 
      subtitle="Manage system users and permissions">
    </lib-page-header>
    
    <div class="p-6">
      <div class="bg-white rounded-lg shadow">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            @for (user of users; track user.id) {
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">{{user.name}}</td>
                <td class="px-6 py-4">{{user.email}}</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                    {{user.role}}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                    {{user.status}}
                  </span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class UsersComponent {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Employee', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Researcher', status: 'Active' }
  ];
}
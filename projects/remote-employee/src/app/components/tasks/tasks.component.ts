import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from 'shared-ui';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <lib-page-header 
      title="My Tasks" 
      subtitle="Your assigned tasks and deadlines">
    </lib-page-header>
    
    <div class="p-6">
      <div class="space-y-4">
        @for (task of tasks; track task.id) {
          <div class="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-gray-800">{{task.title}}</h3>
                <p class="text-sm text-gray-600 mt-1">{{task.description}}</p>
                <span class="text-xs text-gray-500 mt-2 inline-block">Due: {{task.dueDate}}</span>
              </div>
              <span 
                class="px-3 py-1 text-xs rounded-full"
                [ngClass]="{
                  'bg-yellow-100 text-yellow-800': task.status === 'pending',
                  'bg-blue-100 text-blue-800': task.status === 'in-progress',
                  'bg-green-100 text-green-800': task.status === 'completed'
                }"
              >
                {{task.status}}
              </span>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class TasksComponent {
  tasks = [
    { id: 1, title: 'Complete project proposal', description: 'Draft and submit the Q1 project proposal', dueDate: '2024-12-20', status: 'in-progress' },
    { id: 2, title: 'Review code changes', description: 'Review PR #123 for the new feature', dueDate: '2024-12-19', status: 'pending' },
    { id: 3, title: 'Team meeting notes', description: 'Document key decisions from weekly sync', dueDate: '2024-12-18', status: 'completed' }
  ];
}
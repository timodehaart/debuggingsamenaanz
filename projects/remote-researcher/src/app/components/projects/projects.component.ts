import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from 'shared-ui';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <lib-page-header 
      title="Research Projects" 
      subtitle="Manage your research projects">
    </lib-page-header>
    
    <div class="p-6">
      <div class="space-y-4">
        @for (project of projects; track project.id) {
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 class="text-lg font-semibold text-gray-800">{{project.title}}</h3>
            <p class="text-sm text-gray-600 mt-2">{{project.description}}</p>
            <div class="flex items-center mt-4 text-xs text-gray-500">
              <span class="mr-4">Progress: {{project.progress}}%</span>
              <span>Team: {{project.team}} members</span>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ProjectsComponent {
  projects = [
    { id: 1, title: 'AI Ethics Study', description: 'Research on ethical implications of AI systems', progress: 75, team: 5 },
    { id: 2, title: 'Climate Data Analysis', description: 'Long-term climate pattern analysis', progress: 45, team: 8 },
    { id: 3, title: 'Medical Imaging ML', description: 'Machine learning for medical diagnostics', progress: 60, team: 6 }
  ];
}
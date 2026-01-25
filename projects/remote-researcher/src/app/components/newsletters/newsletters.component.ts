import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from 'shared-ui';

@Component({
  selector: 'app-newsletters',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  template: `
    <div class="p-field">
      <!-- Banner -->
      <lib-banner
        [title]="'Newsletters'"
        [subtitle]="'Create and manage newsletters to keep participants informed. Design engaging content, schedule distributions, and track engagement to maintain strong communication with your research community.'"
        [buttonText]="'Create Newsletter'"
        [buttonAction]="onCreateNewsletter"
      ></lib-banner>
    </div>
  `
})
export class NewslettersComponent {
  onCreateNewsletter = (): void => {
    console.log('Create new newsletter');
    // TODO: Open newsletter creation modal or navigate to creation page
  };
}
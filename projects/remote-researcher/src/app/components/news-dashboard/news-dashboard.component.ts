import { Component } from '@angular/core';
import { BannerComponent } from 'shared-ui';
import { ActionButtonComponent } from '../../../../../shared-ui/src/lib/components/action-button/action-button.component';
import { TemplatePopupComponent } from '../template-popup/template-popup.component';

@Component({
  selector: 'app-news-dashboard',
  imports: [BannerComponent, ActionButtonComponent, TemplatePopupComponent],
  templateUrl: './news-dashboard.component.html',
})
export class NewsDashboardComponent {

  showPopUp() {

  }

  userName: string = '';

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name;
    }
  }

  onGetStarted = (): void => {
    console.log('Navigate to projects');
    // Add navigation logic
  };

  titles = [
    { id: 1, name: 'Thank you for filling in the public survey!', release: '27/10/2025 - 12:00', status: 'Scheduled', views: '-' },
    { id: 2, name: 'Reminder to fill in the weekly survey.', release: '27/10/2025 - 14:00', status: 'Scheduled', views: '-' },
    { id: 3, name: 'Results fromt the monthly survey.', release: 'To be scheduled', status: 'Draft', views: '-' },
    { id: 4, name: 'Changes in your work environment.', release: '27/10/2025 - 10:00', status: 'Published', views: '487 views' },
    { id: 5, name: 'Thank you for filling in the monthly survey!', release: '27/05/2025 - 12:00', status: 'Published', views: '197 views' },
  ];
}

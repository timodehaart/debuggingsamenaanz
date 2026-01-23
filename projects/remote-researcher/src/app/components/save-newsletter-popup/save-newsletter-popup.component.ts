import { Component } from '@angular/core';
import { ActionButtonComponent } from '../../../../../shared-ui/src/lib/components/action-button/action-button.component';
import { Router } from '@angular/router';
import { DropdownMenuComponent } from '../../../../../shared-ui/src/lib/components/dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-save-newsletter-popup',
  imports: [ActionButtonComponent, DropdownMenuComponent],
  templateUrl: './save-newsletter-popup.component.html',
})
export class SaveNewsletterPopupComponent {
  constructor(private router: Router) {

  }

  navToNewsDashboard() {
    this.router.navigate(['./researcher/news'])
  }

  status = [
    "Status",
    "Scheduled",
    "Published",
    "Draft",
  ]

  visibility = [
    "Visibility",
    "Public",
    "Private",
  ]

  organisation = [
    "Select organisation(s)",
    "Samen aan Z",
  ]

  department = [
    "Select departments(s)",
    "Admins",
    "Researchers",
    "Users",
  ]

  publishMode = [
    "Publish mode",
    "Schedule for later",
    "Publish now",
  ]
}

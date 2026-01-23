import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionButtonComponent } from '../../../../../shared-ui/src/lib/components/action-button/action-button.component';

@Component({
  selector: 'app-template-popup',
  imports: [ActionButtonComponent],
  standalone: true,
  templateUrl: './template-popup.component.html',
})
export class TemplatePopupComponent {

  constructor(private router: Router) {

  }

  navToNewsEditor() {
    this.router.navigate(['./researcher/create-newsletter'])
  }
}

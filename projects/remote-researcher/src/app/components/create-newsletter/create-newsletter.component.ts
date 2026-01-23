import { Component } from '@angular/core';
import { SaveNewsletterPopupComponent } from '../save-newsletter-popup/save-newsletter-popup.component';
import { InputFieldComponent } from '../../../../../shared-ui/src/lib/components/input-field/input-field.component';
import { ActionButtonComponent } from '../../../../../shared-ui/src/lib/components/action-button/action-button.component';
import { PlaceBlockButtonComponent } from '../../../../../shared-ui/src/lib/components/place-block-button/place-block-button.component';

@Component({
  selector: 'app-create-newsletter',
  imports: [InputFieldComponent, ActionButtonComponent, PlaceBlockButtonComponent, SaveNewsletterPopupComponent],
  templateUrl: './create-newsletter.component.html',
})
export class CreateNewsletterComponent {

}

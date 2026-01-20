import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'lib-action-button',
  imports: [],
  template: `
      @if (buttonText) {
        <button
          (click)="buttonAction && buttonAction()"
          class="px-6 py-3 bg-actionButton text-actionButtonText  rounded-lg font-semibold hover:bg-actionButtonHover transition-all"
        >
          {{buttonText}}
        </button>
      }
  `
})
export class ActionButtonComponent {
  @Input() buttonText?: string;
  @Input() buttonAction?: () => void;
}

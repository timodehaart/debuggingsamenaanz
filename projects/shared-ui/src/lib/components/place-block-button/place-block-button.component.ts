import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'lib-place-block-button',
  imports: [],
  template: `
   @if (buttonText) {
        <button
          (click)="buttonAction && buttonAction()"
          class="px-6 py-3 bg-white text-black  border-default border-black rounded-lg font-semibold hover:bg-sidebarHover transition-all"
        >
          {{buttonText}}
        </button>   
      }
  `,

})
export class PlaceBlockButtonComponent {
  @Input() buttonText?: string;
  @Input() buttonAction?: () => void;
}

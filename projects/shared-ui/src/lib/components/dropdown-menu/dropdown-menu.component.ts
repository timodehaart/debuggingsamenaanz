import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-dropdown-menu',
  imports: [],
  templateUrl: './dropdown-menu.component.html',
})
export class DropdownMenuComponent {
  @Input() options: string[] = [];
}

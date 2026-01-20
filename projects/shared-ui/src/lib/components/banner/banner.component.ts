import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: []
})
export class BannerComponent {
  @Input() title: string = 'Welcome!';
  @Input() subtitle: string = '';
  @Input() buttonText?: string;
  @Input() buttonAction?: () => void;
  @Input() userName?: string;
}
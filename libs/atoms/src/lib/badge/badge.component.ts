import { Component, HostBinding, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'horizon-badge',
  standalone: true,
  imports: [NgClass],
  template: '<ng-content></ng-content>',
  styleUrls: ['./badge.component.css'],
})
export class BadgeComponent {
  @Input() @HostBinding('class') classes = '';
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { INotification } from '@sofitay/models';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'horizon-notification',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  @Input() notification!: INotification;
  @Output() closed = new EventEmitter<void>();

  get classes(): string {
    const size = 'tw-h-6 tw-w-6';
    return this.notification.iconColor ? `${size} tw-text-${this.notification.iconColor}-400` : `${size} tw-text-gray-400`;
  }
}

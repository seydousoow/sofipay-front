import { Component, EventEmitter, Input, Output } from '@angular/core';

import { INotification } from '@sofipay/models';
import { IconComponent } from '@libs/atoms/src';

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
    const size = 'h-6 w-6';
    return this.notification.iconColor ? `${size} text-${this.notification.iconColor}-400` : `${size} text-gray-400`;
  }
}

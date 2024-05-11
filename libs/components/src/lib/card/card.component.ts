import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@sofitay/atoms';
import { TIconName } from '@sofitay/models';

@Component({
  selector: 'horizon-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() icon?: TIconName;
  @Input({ required: true }) cardTitle!: string;
  @Input() closeable = false;
  @Input() actionIcon?: TIconName;
  @Input() open = false;
  @Input() noPadding = false;

  @Input() @HostBinding('class') color: '' | 'blue' = '';

  @Output() clicked = new EventEmitter<void>();

}

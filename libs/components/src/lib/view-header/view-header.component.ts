import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Params, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent, IconComponent } from '@sofitay/atoms';

@Component({
  selector: 'horizon-view-header',
  standalone: true,
  imports: [MatIconModule, IconComponent, ButtonComponent, RouterLink],
  templateUrl: './view-header.component.html',
  styleUrls: ['./view-header.component.css'],
})
export class ViewHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() subTitle?: string;
  @Input() displayPrevious = true;
  @Input() backLink?: string[];
  @Input() paramsBackLink?: Params;
  @Input() backBtnColor!: string;
  @Input() historyBack = false;
  @Output() backClicked = new EventEmitter<void>();
}

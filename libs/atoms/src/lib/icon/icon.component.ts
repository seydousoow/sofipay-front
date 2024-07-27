import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TIconName } from '@sofipay/models';

@Component({
  selector: 'horizon-icon',
  standalone: true,
  imports: [AngularSvgIconModule],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @Input() name!: TIconName;
  @Input() classes!: string;
}

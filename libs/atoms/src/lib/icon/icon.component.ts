import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { TIconName } from '@sofitay/models';

@Component({
  selector: 'horizon-icon',
  standalone: true,
  imports: [AngularSvgIconModule, HttpClientModule],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @Input() name!: TIconName;
  @Input() classes!: string;
}

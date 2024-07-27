import { Component, HostBinding } from '@angular/core';
import { IconComponent } from '@sofipay/atoms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    IconComponent,
    RouterLink
  ],
  templateUrl: 'unauthorized.component.html',
  styleUrl: 'unauthorized.component.scss'
})
export class UnauthorizedComponent {
  @HostBinding('class.bg-radient') radient: boolean = true;

}
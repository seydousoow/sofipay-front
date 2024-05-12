import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'horizon-spinner',
  standalone: true,
  imports: [NgClass],
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() colorClasses = 'fill-white';
  @Input() sizeClasses = 'w-4 h-4';
}

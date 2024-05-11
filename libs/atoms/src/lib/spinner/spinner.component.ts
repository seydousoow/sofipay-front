import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'horizon-spinner',
  standalone: true,
  imports: [NgClass],
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() colorClasses = 'tw-fill-white';
  @Input() sizeClasses = 'tw-w-4 tw-h-4';
}

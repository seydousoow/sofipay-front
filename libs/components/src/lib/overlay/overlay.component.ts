import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'horizon-overlay',
  standalone: true,
  template: '',
  styleUrls: ['./overlay.component.css'],
})
export class OverlayComponent {
  @Output() clicked = new EventEmitter<void>();

  @HostListener('click') click = () => this.clicked.emit();
}

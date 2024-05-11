import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'horizon-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {

  @Output() clicked = new EventEmitter<void>();
  @HostBinding('attr.role') role = 'button';
  @HostBinding('attr.type') type = 'button';
  @Input() @HostBinding('class.link') asLink = false;
  @Input() @HostBinding('class.reverse') reverse = false;
  @Input() @HostBinding('class.alert') alert = false;
  @Input() @HostBinding('class.action') action = false;
  @Input() @HostBinding('class.activated') activated = false;
  @HostBinding('attr.disabled') @HostBinding('class.disabled') @Input() disabled = false;

  @HostBinding('attr.tabindex') get tabIndex() {
    return this.disabled ? -1 : 0;
  }

  @HostListener('click')
  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  keyboardEvents(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }

}

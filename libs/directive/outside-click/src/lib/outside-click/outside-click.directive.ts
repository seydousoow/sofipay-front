import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[horizonOutsideClick]',
  standalone: true,
})
export class OutsideClickDirective {
  @Output() outsideClick = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target) && !document.getElementsByClassName('cdk-overlay-pane').length) {
      this.outsideClick.emit(event);
    }
  }
}

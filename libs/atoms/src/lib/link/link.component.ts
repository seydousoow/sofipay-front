import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'horizon-link',
  standalone: true,
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
})
export class LinkComponent implements OnInit {
  @Input() href?: string;
  @Input() internalLink?: string[];
  @Input() target: '_blank' | '_self' = '_self';
  @HostBinding('attr.disabled') @HostBinding('class.disabled') @Input() disabled = false;

  @HostBinding('role') role = 'link';
  @Input() @HostBinding('class.button') asButton = false;

  constructor(private router: Router) {}

  @HostBinding('attr.tabindex') get tabIndex() {
    return this.disabled ? -1 : 0;
  }

  @HostListener('click')
  @HostListener('keydown.enter')
  elementEvents(): void {
    if (this.disabled) return;
    if (this.href) {
      if (this.target === '_self') window.location.href = this.href;
      else window.open(this.href, '_blank');
    } else if (this.internalLink) this.router.navigate(this.internalLink);
  }

  ngOnInit(): void {
    if (!this.href && !this.internalLink) throw new Error('href or internalLink required');
  }
}

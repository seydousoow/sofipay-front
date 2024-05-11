import { AfterViewChecked, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@sofitay/atoms';
import { CdkAccordionItem, CdkAccordionModule } from '@angular/cdk/accordion';
import { TIconName } from '@sofitay/models';

@Component({
  selector: 'horizon-accordion',
  standalone: true,
  imports: [CommonModule, CdkAccordionModule, IconComponent],
  templateUrl: './accordion.component.html',
})
export class AccordionComponent implements AfterViewChecked {
  @Input() icon?: TIconName;
  @Input({ required: true }) index!: number;
  @Input({ required: true }) label!: string;
  @Input() noColor = false;
  @Input() open = false;
  @Input() titleSize: 'sm' | 'md' | 'lg' | 'xl' = 'sm';

  @ViewChild('accordionItem') accordion!: CdkAccordionItem;

  @Output() toggled = new EventEmitter<void>();

  private alreadyOpen = false;

  ngAfterViewChecked(): void {
    if (this.open && !this.alreadyOpen) {
      this.alreadyOpen = true;
      setTimeout(() => {
        this.accordion.open();
      });
    }
  }
}

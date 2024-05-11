import { AfterViewChecked, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, IconComponent } from '@sofitay/atoms';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'horizon-stepper',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent, CdkStepperModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper implements AfterViewChecked {
  @Input() backTitle = 'common.previous';
  @Input() nextTitle = 'common.next';
  @Input() confirmTitle = 'common.confirm';
  @Input() disablePrevious = false;
  @Input() disableNext = false;

  @Output() confirmed = new EventEmitter<void>();

  @HostBinding('class.reduce') openMenu = false;

  get previousDisabled(): boolean {
    return this.selectedIndex === 0 || this.disablePrevious;
  }

  get nextDisabled(): boolean {
    if (this.linear && this.selected) return !this.selected.completed;
    return this.disableNext;
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      const tag = document.getElementsByTagName('nav');
      if (tag && tag.length > 0)
        this.openMenu = tag[0].className.includes('open');
    }, 50);
  }
}

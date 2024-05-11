import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '../icon/icon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'horizon-search',
  standalone: true,
  imports: [IconComponent, FormsModule, NgClass],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  @Input({ required: true }) id!: string;
  @Input() name!: string;
  @Input() value = '';
  @Input() debounceTime = 500;
  @Input() showCloseIcon = true;
  @Input() fullWidth = false;
  @Input() minLength = 3;
  @Input() size: 'small' | 'medium' | 'large' = 'large';
  @Input() disabled = false;
  @Input() withShadow = true;
  @Output() valueChange = new EventEmitter<string>();

  search = new Subject<KeyboardEvent | null>();
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (!this.name) this.name = this.id;

    this.search.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      filter(() => this.value.length >= this.minLength || !this.value.length),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => this.valueChange.emit(this.value));
  }
}

import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ISort, ITableColumn } from '@sofitay/models';
import { NgClass } from '@angular/common';
import { CheckboxComponent, IconComponent } from '@sofitay/atoms';

@Component({
  selector: 'horizon-table',
  standalone: true,
  imports: [NgClass, IconComponent, CheckboxComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {

  @Input() headerColor: 'red' | 'salmon' | 'blue' | 'magnolia' | 'green' | '' = '';
  @Input({ required: true }) columns!: ITableColumn[];
  @Input() sort!: ISort;
  @Input() caption!: string; // unused in pb
  @Input() stickyPx = 0;
  @Input() check = false;

  @Output() checked = new EventEmitter<boolean>(); // unused in pb
  @Output() sorted = new EventEmitter<ISort>();

  ngOnInit(): void {
    if (!this.sort && this.columns[0]) {
      this.sort = { direction: 'asc', property: this.columns[0].name };
    }
  }

  sortBy(sortableField: string) {
    if (this.sort.property === sortableField) {
      this.sort = { property: sortableField, direction: this.sort.direction === 'asc' ? 'desc' : 'asc' };
    } else {
      this.sort = { property: sortableField, direction: 'asc' };
    }
    this.sorted.emit(this.sort);
  }

  toggle(checked: boolean) {
    this.checked.emit(checked);
  }

}

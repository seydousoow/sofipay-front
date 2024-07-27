import { AfterViewChecked, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { IPagination, ISelectOption } from '@sofipay/models';
import { ButtonComponent, IconComponent, SelectComponent } from '@sofipay/atoms';

@Component({
  selector: 'horizon-pagination',
  standalone: true,
  imports: [IconComponent, SelectComponent, ButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements AfterViewChecked {
  @Input() pageSizeOptions: number[] = [10, 20, 50, 100];
  @Input({ required: true }) size!: number;
  @Input({ required: true }) page!: number;
  @Input({ required: true }) total!: number;

  @Output() pageChange: EventEmitter<IPagination> = new EventEmitter<IPagination>();

  @HostBinding('class.reduce') openMenu = false;

  readonly options: ISelectOption<number>[] = [];

  isLast = false;

  constructor() {
    this.options = this.pageSizeOptions.map(o => ({ label: String(o), value: o }));
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.openMenu = document.getElementsByTagName('nav')[0].className.includes('open');
      this.isLast = (this.page + 1) === Math.ceil(this.total / this.size);
    }, 50);
  }

  changeSize(size: ISelectOption<number>[]) {
    const selectedSize = this.pageSizeOptions.find(s => s === +size[0].value);
    if (selectedSize === undefined) return;
    this.size = selectedSize;
    this.emitChange();
  }

  previous(): void {
    if (this.page === 0) return;
    --this.page;
    this.emitChange();
  }

  next(): void {
    if ((this.page + 1) * this.size >= this.total) return;
    ++this.page;
    this.emitChange();
  }

  getNarratedPage(): string {
    const first = this.total === 0 ? 0 : (this.page * this.size) + 1;
    const last = Math.min((this.page + 1) * this.size, this.total);
    return `${first}-${last} de ${this.total}`;
  }

  private emitChange = () => this.pageChange.emit({ page: this.page, size: this.size, totalElements: this.total });
}

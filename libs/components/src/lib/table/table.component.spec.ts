import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
      providers: [SvgIconRegistryService, SvgLoader]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    component.columns = [{ name: 'Column 1', sortableField: 'column1' }, {
      name: 'Column 2',
      sortableField: 'column2'
    }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.sort.property).toStrictEqual('Column 1');
    expect(component.sort.direction).toStrictEqual('asc');
  });

  it('should update sort property and emit sorted event in sortBy method', () => {
    jest.spyOn(component.sorted, 'emit');

    component.sort = { direction: 'asc', property: 'column1' };
    component.sortBy('column2');

    expect(component.sort).toStrictEqual({ direction: 'asc', property: 'column2' });
    expect(component.sorted.emit).toHaveBeenCalledWith(component.sort);

    component.sort = { direction: 'asc', property: 'column1' };
    component.sortBy('column1');

    expect(component.sort).toStrictEqual({ direction: 'desc', property: 'column1' });
    expect(component.sorted.emit).toHaveBeenCalledWith(component.sort);
  });

  it('should emit checked event with correct value in toggle method', () => {
    const eventMock = true;

    jest.spyOn(component.checked, 'emit');

    component.toggle(eventMock);

    expect(component.checked.emit).toHaveBeenCalledWith(true);
  });
});

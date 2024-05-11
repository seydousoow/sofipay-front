import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
      providers: [SvgIconRegistryService, SvgLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent<string>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return selectedItemsLabel', () => {
    component.selectedItems = [
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' },
    ];

    expect(component.selectedItemsLabel).toEqual('Item 1, Item 2');
  });

  describe('toggleValue', () => {
    it('should called updateSelection, emit, onChange', () => {
      const item = { label: 'Item 1', value: 'item1' };
      jest.spyOn<SelectComponent, any>(component, 'updateSelection');
      jest.spyOn(component.changed, 'emit');
      jest.spyOn(component, 'onChange');

      component.toggleValue(item);

      expect(component['updateSelection']).toHaveBeenCalledWith(item);
      expect(component.changed.emit).toHaveBeenCalledWith([item]);
      expect(component.onChange).toHaveBeenCalledWith([item.value]);
    });
  });

  describe('updateSelection', () => {
    it('should add a new item and stay open', () => {
      component.toggle();
      component.multiple = true;
      const items = [
        { label: 'Item 1', value: 'item1' },
        { label: 'Item 2', value: 'item2' },
      ];
      component.items = items;
      component.selectedItems = [items[0]];
      component['updateSelection'](items[1]);
      expect(component.selectedItems).toEqual(items);
      expect(component.isOpen).toBeTruthy();
    });

    it('should remove an item and stay open', () => {
      component.toggle();
      component.multiple = true;
      const items = [
        { label: 'Item 1', value: 'item1' },
        { label: 'Item 2', value: 'item2' },
      ];
      component.items = items;
      component.selectedItems = [items[0]];
      component['updateSelection'](items[0]);
      expect(component.selectedItems.length).toBe(0);
      expect(component.isOpen).toBeTruthy();
    });

    it('should set only the current item and close', () => {
      component.toggle();
      const items = [
        { label: 'Item 1', value: 'item1' },
        { label: 'Item 2', value: 'item2' },
      ];
      component.items = items;
      component.selectedItems = [items[0]];
      component['updateSelection'](items[1]);
      expect(component.selectedItems).toEqual([items[1]]);
      expect(component.isOpen).toBeFalsy();
    });
  });

  describe('handleKeyboardNavigation', () => {
    it('should called toggleValue', () => {
      const item = { label: 'Item 1', value: 'item1' };
      component.highlightedElement = 0;
      component.items = [item];
      jest.spyOn(component, 'toggleValue');
      component.handleKeyboardNavigation({ code: 'Space', preventDefault: jest.fn() } as never);
      expect(component.toggleValue).toHaveBeenCalledWith(item);
    });

    it('should called toggle and highlightDown', () => {
      jest.spyOn<SelectComponent, any>(component, 'highlightDown');
      jest.spyOn(component, 'toggle');
      component.handleKeyboardNavigation({ code: 'ArrowDown', preventDefault: jest.fn() } as never);
      expect(component.toggle).toHaveBeenCalled();
      expect(component['highlightDown']).toHaveBeenCalled();
    });

    it('should called toggle and highlightUp', () => {
      jest.spyOn<SelectComponent, any>(component, 'highlightUp');
      jest.spyOn(component, 'toggle');
      component.handleKeyboardNavigation({ code: 'ArrowUp', preventDefault: jest.fn() } as never);
      expect(component.toggle).toHaveBeenCalled();
      expect(component['highlightUp']).toHaveBeenCalled();
    });

    it('should close the listbox', () => {
      component.handleKeyboardNavigation({ code: 'Tab' } as never);
      expect(component.isOpen).toBeFalsy();
    });
  });

  it('should write values', () => {
    component.items = [{ label: 'Test', value: 'item1' }];
    component.writeValue(['item1']);
    expect(component.selectedItems).toEqual([{ label: 'Test', value: 'item1' }]);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';
import { provideMockStore } from '@ngrx/store/testing';
import { ISelectOption } from '@sofipay/models';

class ResizeObserverMock {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  window.ResizeObserver = ResizeObserverMock;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [SvgIconRegistryService, SvgLoader, provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.total = 0;
    component.size = 50;
    component.page = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page options for select dropdown', () => {
    const items: ISelectOption<number>[] = [{ label: '10', value: 10 }, { label: '20', value: 20 }, {
      label: '50',
      value: 50,
    }, { label: '100', value: 100 }];
    expect(component.options).toEqual(items);
  });

  it('should return correct pagination naming', () => {
    const response = '1-100 de 503';
    component.total = 503;
    component.size = 100;
    component.page = 0;
    expect(component.getNarratedPage()).toStrictEqual(response);
  });

  describe('Size event', () => {
    it('should keep the current value when not a valid size option', () => {
      component.size = 50;
      jest.spyOn<PaginationComponent, any>(component, 'emitChange');

      const items: ISelectOption<number>[] = [{ label: '', value: 51 }];
      component.changeSize(items);

      expect(component.size).toStrictEqual(50);
      expect(component['emitChange']).not.toHaveBeenCalled();
    });

    it('should update the size', () => {
      component.size = 50;
      jest.spyOn<PaginationComponent, any>(component, 'emitChange');
      jest.spyOn(component.pageChange, 'emit');

      const items: ISelectOption<number>[] = [{ label: '', value: 20 }];
      component.changeSize(items);

      expect(component['emitChange']).toHaveBeenCalled();
      expect(component.pageChange.emit).toHaveBeenCalledWith({ page: 0, size: 20, totalElements: 0 });
      expect(component.size).toStrictEqual(20);
    });
  });

  describe('Previous page event', () => {
    it('Should not perform on first page', () => {
      component.page = 0;
      jest.spyOn<PaginationComponent, any>(component, 'emitChange');
      component.previous();

      expect(component.page).toStrictEqual(0);
      expect(component['emitChange']).not.toHaveBeenCalled();
    });

    it('Should go to page 0', () => {
      component.page = 1;
      jest.spyOn<PaginationComponent, any>(component, 'emitChange');
      jest.spyOn(component.pageChange, 'emit');
      component.previous();

      expect(component.page).toStrictEqual(0);
      expect(component['emitChange']).toHaveBeenCalled();
      expect(component.pageChange.emit).toHaveBeenCalledWith({ page: 0, size: 50, totalElements: 0 });
    });
  });

  describe('next page event', () => {
    it('Should not perform on last page', () => {
      component.page = 0;
      component.size = 50;
      component.total = 50;
      jest.spyOn<PaginationComponent, any>(component, 'emitChange');
      component.next();

      expect(component.page).toStrictEqual(0);
      expect(component['emitChange']).not.toHaveBeenCalled();
    });

    it('Should go to page 1', () => {
      component.page = 0;
      component.size = 50;
      component.total = 51;
      jest.spyOn<PaginationComponent, any>(component, 'emitChange');
      jest.spyOn(component.pageChange, 'emit');
      component.next();

      expect(component.page).toStrictEqual(1);
      expect(component['emitChange']).toHaveBeenCalled();
      expect(component.pageChange.emit).toHaveBeenCalledWith({ page: 1, size: 50, totalElements: 51 });
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const id = 'search';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [SvgLoader, SvgIconRegistryService]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.id = id;
    component.value = '';
    TestBed.inject(SvgIconRegistryService).addSvg('search', '<svg></svg>');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set name to id if name is not provided', () => {
    expect(component.name).toBe('search');
  });

  it('should emit valueChange event on search value change', (done) => {
    component.debounceTime = 0; // set debounceTime to 0 for instant emit
    const searchValue = 'test';
    component.valueChange.subscribe((value) => {
      expect(value).toBe(searchValue);
      done();
    });
    component.value = searchValue;
    component.search.next(null);
  });

  it('should not emit valueChange event if value length is less than minLength', () => {
    component.debounceTime = 0; // set debounceTime to 0 for instant emit
    const searchValue = 'te';
    component.valueChange.subscribe(() => {
      fail('should not emit valueChange event');
    });
    component.value = searchValue;
    component.search.next(null);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
      providers: [SvgIconRegistryService, SvgLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.id = 'some-id';
    component.name = 'some-name';
    component.label = 'label';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value', () => {
    component.updateValue({ target: { value: 'newValue' } } as never);
    expect(component.value).toBe('newValue');
    component.resetValue();
    expect(component.value).toBe('');
  });

  it('should return red element', () => {
    component.invalid = true;
    expect(component.classes).toContain('red');
  });
});

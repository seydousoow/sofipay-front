import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value', () => {
    component.updateValue({ target: { checked: true } } as never);
    expect(component.checked).toBeTruthy();
  });

  it('should set disabled', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
  });

  it('should set the value', () => {
    component.writeValue(true);
    expect(component.checked).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value', () => {
    component.updateValue();
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

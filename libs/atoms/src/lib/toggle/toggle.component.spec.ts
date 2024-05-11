import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the value', () => {
    component.writeValue(true);
    expect(component.value).toBeTruthy();
  });

  it('should disable', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
  });
});

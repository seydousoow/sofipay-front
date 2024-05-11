import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepperComponent } from './stepper.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperComponent],
      providers: [SvgLoader, SvgIconRegistryService],
    }).compileComponents();

    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

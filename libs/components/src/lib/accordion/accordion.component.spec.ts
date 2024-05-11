import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionComponent],
      providers: [SvgIconRegistryService, SvgLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

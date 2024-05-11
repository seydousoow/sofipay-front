import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent],
      providers: [SvgIconRegistryService, SvgLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    component.notification = {
      icon: 'check-circle',
      iconColor: 'green',
      title: 'someTitle',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

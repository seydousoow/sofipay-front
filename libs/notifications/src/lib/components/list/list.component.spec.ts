import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { provideMockStore } from '@ngrx/store/testing';
import { INotification } from '@sofipay/models';
import { NotificationsUserActions } from '../../store/notifications.actions';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close', () => {
    jest.spyOn(component['store'], 'dispatch');
    component.close({} as INotification);
    expect(component['store'].dispatch).toHaveBeenCalledWith(NotificationsUserActions.removeNotification({ notification: {} as INotification }));
  });
});

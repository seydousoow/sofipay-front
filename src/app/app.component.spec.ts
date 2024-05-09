import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SvgIconRegistryService } from 'angular-svg-icon';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NxWelcomeComponent],
      providers: [
        { provide: SvgIconRegistryService, useValue: { loadSvg: jest.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeDefined();
  });

  it(`should have as title 'sofitay'`, () => {
    expect(component.title).toEqual('sofitay');
  });
});

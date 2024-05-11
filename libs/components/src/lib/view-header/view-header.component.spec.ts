import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewHeaderComponent } from './view-header.component';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';
import { ActivatedRoute, provideRouter } from '@angular/router';

const fakeActivatedRoute = { snapshot: { data: {} } } as ActivatedRoute;

describe('ViewHeaderComponent', () => {
  let component: ViewHeaderComponent;
  let fixture: ComponentFixture<ViewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SvgIconRegistryService, SvgLoader, { provide: ActivatedRoute, useValue: fakeActivatedRoute }, provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

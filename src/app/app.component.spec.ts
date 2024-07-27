import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {asy} from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
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

  it(`should have as title 'sofipay'`, () => {
    expect(component.title).toEqual('SOFIPAY');
  });
});

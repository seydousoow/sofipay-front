import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';
import { Router } from '@angular/router';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkComponent],
      providers: [{ provide: Router, useValue: { navigate: jest.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.internalLink = ['/'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call window.open', () => {
    window.open = jest.fn();
    component.internalLink = undefined;
    component.href = 'https://chanel.com';
    component.target = '_blank';
    component.elementEvents();
    expect(window.open).toHaveBeenCalledWith('https://chanel.com', '_blank');
  });

  it('should call router.navigate', () => {
    component.elementEvents();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
  });
});

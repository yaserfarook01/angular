import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should_create_navbar_component', () => {
    expect(component).toBeTruthy();
  });

  it('should_display_FitHub_in_the_navbar_title', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.navbartitle');
    expect(titleElement.textContent).toContain('FitHub');
  });
});

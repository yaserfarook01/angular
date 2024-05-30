import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgeCheckerComponent } from './age-checker.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


describe('AgeCheckerComponent', () => {
  let component: AgeCheckerComponent;
  let fixture: ComponentFixture<AgeCheckerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgeCheckerComponent],
      imports:[FormsModule, RouterTestingModule]

    });
    fixture = TestBed.createComponent(AgeCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should_create_the_age_checker_component', () => {
    expect(component).toBeTruthy();
  });

  it('should_have_initial_values_for_age_and_ageGroup', () => {
    expect((component as any).age).toEqual(0);
    expect((component as any).ageGroup).toEqual('');
  });

  it('should_set_age_group_correctly_for_different_ages', () => {
    (component as any).age = 5;
    (component as any).checkAge();
    expect((component as any).ageGroup).toEqual('Childhood');

    (component as any).age = 25;
    (component as any).checkAge();
    expect((component as any).ageGroup).toEqual('Adult');

    (component as any).age = 70;
    (component as any).checkAge();
    expect((component as any).ageGroup).toEqual('Senior citizen');
  });
});

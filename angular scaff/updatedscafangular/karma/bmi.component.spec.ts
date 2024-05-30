
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BmiComponent } from './bmi.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BmiComponent', () => {
  let component: BmiComponent;
  let fixture: ComponentFixture<BmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmiComponent],
      imports: [FormsModule , RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should_create_the_bmi_component', () => {
    expect(component).toBeTruthy();
  });

  it('should_calculate_BMI_correctly', () => {
    (component as any).weight = 70; // Set weight to 70 kg
    (component as any).height = 175; // Set height to 175 cm
    (component as any).calculateBMI();
    fixture.detectChanges();
    expect((component as any).bmi).toBeCloseTo(22.86, 2); // Expect BMI to be approximately 22.86
    expect((component as any).bmiCategory).toBe('Normal weight'); // Expect category to be 'Normal weight'
  });
});

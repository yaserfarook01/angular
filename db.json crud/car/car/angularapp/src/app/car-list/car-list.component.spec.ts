import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarListComponent } from './car-list.component';
import { CarService } from '../services/car.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;
  let service: CarService;

  const mockCars = [
    {
      id: 1,
      model: 'Model S',
      make: 'Tesla',
      year: 2022,
      color: 'Red',
      mileage: 15000,
    },
    {
      id: 2,
      model: 'Mustang',
      make: 'Ford',
      year: 2021,
      color: 'Blue',
      mileage: 10000,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarListComponent],
      providers: [CarService],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CarService);
  });

  fit('should create CarListComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should call getCars', () => {
    spyOn(service, 'getCars').and.returnValue(of([]));
    component.getCars();
    expect(component.getCars).toBeDefined();
    expect(component.getCars instanceof Function).toBeTruthy();
    expect(service.getCars).toHaveBeenCalled();
  });

  fit('should call deleteCar', () => {
    spyOn(service, 'deleteCar').and.returnValue(of());
    component.deleteCar(1); // You can pass a valid car ID
    expect(component.deleteCar).toBeDefined();
    expect(component.deleteCar instanceof Function).toBeTruthy();
    expect(service.deleteCar).toHaveBeenCalledWith(1);
  });

});

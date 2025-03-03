import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarService } from './car.service';

describe('CarService', () => {
  let service: CarService;
  let httpTestingController: HttpTestingController;

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
      imports: [HttpClientTestingModule],
      providers: [CarService],
    });
    service = TestBed.inject(CarService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  fit('should create CarService', () => {
    expect(service).toBeTruthy();
  });

  fit('should retrieve cars from the API via GET', () => {
    service.getCars().subscribe((cars: any) => {
      expect(cars).toEqual(mockCars);
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCars);
  });

  fit('should add a car via POST', () => {
    const newCar = {
      model: 'Civic',
      make: 'Honda',
      year: 2022,
      color: 'Black',
      mileage: 20000,
    };

    service.addCar(newCar).subscribe((car) => {
      expect(car).toEqual(newCar);
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('POST');
    req.flush(newCar);
  });

  fit('should delete a car via DELETE', () => {
    const carId = 1;

    service.deleteCar(carId).subscribe(() => {});

    const req = httpTestingController.expectOne(`${service['backendUrl']}/${carId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LaptopService } from './laptop.service'; // Assuming this is the new service
import { Laptop } from '../model/laptop.model'; // Assuming this is the new model

describe('LaptopService', () => {
  let service: LaptopService;
  let httpTestingController: HttpTestingController;

  // Define mock data for laptops
  const mockLaptops: Laptop[] = [
    {
      id: 1,
      brand: 'Brand A',
      model: 'Model X',
      screenSize: 15.6,
      ram: 8,
      storage: 512,
      processor: 'Intel Core i5',
      graphicsCard: 'Nvidia GeForce GTX 1650',
    },
    {
      id: 2,
      brand: 'Brand B',
      model: 'Model Y',
      screenSize: 13.3,
      ram: 16,
      storage: 256,
      processor: 'Intel Core i7',
      graphicsCard: 'Intel Iris Xe',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LaptopService], // Replace with the LaptopService
    });
    service = TestBed.inject(LaptopService); // Replace with the LaptopService
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  fit('service_should_be_created', () => {
    expect(service).toBeTruthy();
  });

  fit('should_retrieve_laptops_from_the_API_via_GET', () => {
    (service as any).getLaptops().subscribe((laptops: Laptop[]) => {
      expect(laptops).toEqual(mockLaptops);
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockLaptops);
  });

  fit('should_add_a_laptop_via_POST', () => {
    const newLaptop: Laptop = {
      brand: 'Brand C',
      model: 'Model Z',
      screenSize: 14,
      ram: 32,
      storage: 1024,
      processor: 'AMD Ryzen 9',
      graphicsCard: 'Nvidia GeForce RTX 3080',
    };

    (service as any).addLaptop(newLaptop).subscribe((laptop) => {
      expect(laptop).toEqual({ ...newLaptop, id: 3 }); // Assuming the backend returns the ID
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('POST');
    req.flush({ ...newLaptop, id: 3 });
  });

  fit('should_delete_a_laptop_via_DELETE', () => {
    const laptopId = 1;

    (service as any).deleteLaptop(laptopId).subscribe(() => {
      // Additional expectations can be added here
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}/${laptopId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});

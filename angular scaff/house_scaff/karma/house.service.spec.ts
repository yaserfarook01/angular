import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HouseService } from './house.service';

describe('HouseService', () => {
  let service: HouseService;
  let httpTestingController: HttpTestingController;

  // Mock data for houses
  const mockHouses = [
    {
      id: 1,
      address: '123 Elm Street',
      type: 'Detached',
      bedrooms: 3,
      bathrooms: 2,
      size: 1500,
    },
    {
      id: 2,
      address: '456 Oak Avenue',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 1,
      size: 900,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HouseService],
    });
    service = TestBed.inject(HouseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  fit('should_create_HouseService', () => {
    expect(service).toBeTruthy();
  });

  fit('should_retrieve_houses_from_the_API_via_GET', () => {
    service.getHouses().subscribe((houses: any) => {
      expect(houses).toEqual(mockHouses);
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockHouses);
  });

  fit('should_add_a_house_via_POST', () => {
    const newHouse = {
      address: '789 Maple Lane',
      type: 'Semi-Detached',
      bedrooms: 4,
      bathrooms: 3,
      size: 1800,
    };

    service.addHouse(newHouse).subscribe((house) => {
      expect(house).toEqual(newHouse);
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('POST');
    req.flush(newHouse);
  });

  fit('should_delete_a_house_via_DELETE', () => {
    const houseId = 1;

    service.deleteHouse(houseId).subscribe(() => {});

    const req = httpTestingController.expectOne(`${service['backendUrl']}/${houseId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});

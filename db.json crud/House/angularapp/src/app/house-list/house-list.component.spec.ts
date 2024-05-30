import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HouseListComponent } from './house-list.component';
import { HouseService } from '../services/house.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HouseListComponent', () => {
  let component: HouseListComponent;
  let fixture: ComponentFixture<HouseListComponent>;
  let service: HouseService;

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
      declarations: [HouseListComponent],
      providers: [HouseService],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(HouseListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HouseService);
  });

  fit('should_create_HouseListComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should_call_getHouses', () => {
    spyOn(service, 'getHouses').and.returnValue(of(mockHouses));
    component.getHouses();
    expect(component.getHouses).toBeDefined();
    expect(component.getHouses instanceof Function).toBeTruthy();
    expect(service.getHouses).toHaveBeenCalled();
  });

  fit('should_call_deleteHouse', () => {
    spyOn(service, 'deleteHouse').and.returnValue(of());
    component.deleteHouse(1); // Passing a valid house ID
    expect(component.deleteHouse).toBeDefined();
    expect(component.deleteHouse instanceof Function).toBeTruthy();
    expect(service.deleteHouse).toHaveBeenCalledWith(1);
  });

});

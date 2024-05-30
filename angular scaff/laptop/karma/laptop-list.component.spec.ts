import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaptopListComponent } from './laptop-list.component';
import { LaptopService } from '../services/laptop.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LaptopListComponent', () => {
  let component: LaptopListComponent;
  let fixture: ComponentFixture<LaptopListComponent>;
  let service: LaptopService;

  // Mock data for laptops
  const mockLaptops = [
    {
      id: 1,
      brand: 'Brand A',
      model: 'Model X',
      screenSize: 15.6,
      ram: 8,
      storage: 512,
      processor: 'Intel Core i5',
      graphicsCard: 'Nvidia GeForce GTX 1650'
    },
    {
      id: 2,
      brand: 'Brand B',
      model: 'Model Y',
      screenSize: 13.3,
      ram: 16,
      storage: 256,
      processor: 'Intel Core i7',
      graphicsCard: 'Intel Iris Xe'
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaptopListComponent],
      providers: [LaptopService],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(LaptopListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LaptopService);
  });

  fit('should_create_LaptopListComponent', () => {
    expect(component as any).toBeTruthy();
  });

  fit('should_call_getLaptops', () => {
    spyOn(service, 'getLaptops').and.returnValue(of(mockLaptops));
    (component as any).getLaptops();
    expect((component as any).getLaptops).toBeDefined();
    expect((component as any).getLaptops instanceof Function).toBeTruthy();
    expect((service as any).getLaptops).toHaveBeenCalled();
  });


  fit('should_call_deleteLaptop', () => {  // Update test case name
    spyOn((service as any), 'deleteLaptop').and.returnValue(of());
    (component as any).deleteLaptop();
    expect((component as any).deleteLaptop).toBeDefined();
    expect((component as any).deleteLaptop instanceof Function).toBeTruthy();
    expect((service as any).deleteLaptop).toHaveBeenCalled();
  });


});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockListComponent } from './stock-list.component'; // Update import
import { StockService } from '../services/stock.service'; // Update import
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StockListComponent', () => { // Update component name
  let component: StockListComponent; // Update component type
  let fixture: ComponentFixture<StockListComponent>; // Update component type
  let service: StockService; // Update service type

  // Mock data for stocks
  const mockStocks = [
    {
      id: 1,
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      price: 145.12,
      change: '+2.45'
    },
    {
      id: 2,
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      price: 2745.89,
      change: '-10.32'
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockListComponent], // Update component name
      providers: [StockService], // Update service name
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(StockListComponent); // Update component name
    component = fixture.componentInstance; // Update component type
    service = TestBed.inject(StockService); // Update service name
  });

  fit('should_create_StockListComponent', () => { // Update test description
    expect(component as any).toBeTruthy();
  });

  fit('should_call_getStocks', () => { // Update test description
    spyOn(service, 'getStocks').and.returnValue(of(mockStocks));
    (component as any).getStocks();
    expect((component as any).getStocks).toBeDefined();
    expect((component as any).getStocks instanceof Function).toBeTruthy();
    expect((service as any).getStocks).toHaveBeenCalled();
  });


  fit('should_call_deleteStock', () => {  // Update test case name
    spyOn((service as any), 'deleteStock').and.returnValue(of());
    (component as any).deleteStock();
    expect((component as any).deleteStock).toBeDefined();
    expect((component as any).deleteStock instanceof Function).toBeTruthy();
    expect((service as any).deleteStock).toHaveBeenCalled();
  });
});

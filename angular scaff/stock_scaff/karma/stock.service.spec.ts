import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockService } from './stock.service'; // Assuming this is the new service
import { Stock } from '../model/stock.model'; // Assuming this is the new model

describe('StockService', () => { // Update service name
  let service: StockService; // Update service type
  let httpTestingController: HttpTestingController;

  // Define mock data for stocks
  const mockStocks: Stock[] = [
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
      imports: [HttpClientTestingModule],
      providers: [StockService], // Replace with the StockService
    });
    service = TestBed.inject(StockService); // Replace with the StockService
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  fit('service_should_be_created', () => { // Update test description
    expect(service).toBeTruthy();
  });

  fit('should_retrieve_stocks_from_the_API_via_GET', () => { // Update test description
    (service as any).getStocks().subscribe((stocks: Stock[]) => {
      expect(stocks).toEqual(mockStocks);
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockStocks);
  });

  fit('should_add_a_stock_via_POST', () => { // Update test description
    const newStock: Stock = {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      price: 250.43,
      change: '+1.20',
    };

    (service as any).addStock(newStock).subscribe((stock) => {
      expect(stock).toEqual({ ...newStock, id: 3 }); // Assuming the backend returns the ID
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('POST');
    req.flush({ ...newStock, id: 3 });
  });

  fit('should_delete_a_stock_via_DELETE', () => { // Update test description
    const stockId = 1;

    (service as any).deleteStock(stockId).subscribe(() => {
      // Additional expectations can be added here
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}/${stockId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});

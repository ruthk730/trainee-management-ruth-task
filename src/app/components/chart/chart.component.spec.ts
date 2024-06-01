import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { DataService } from 'src/app/services/data.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', [], {
      sampleKey: {
        data: [10, 20, 30],
        labels: ['Jan', 'Feb', 'Mar'],
        name: 'Sample Chart',
        isUpdated: true
      }
    });

    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
      providers: [{ provide: DataService, useValue: mockDataService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.chartItemKey = 'sampleKey';
    component.chartIndex = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart data on init if data service has the key', () => {
    spyOn(component, 'simulateDataUpdate').and.callThrough();
    component.ngOnInit();
    expect(component.simulateDataUpdate).toHaveBeenCalled();
  });

  it('should set the chart title from data service', () => {
    component.ngOnInit();
    expect(component.chartTitle).toBe('Sample Chart');
  });

  it('should periodically update chart data', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.chartData.datasets[0].data).toEqual([10, 20, 30]);
      done();
    }, 2100); // 100ms buffer to ensure the interval has executed
  });

  it('should clear the interval on destroy', () => {
    const clearIntervalSpy = spyOn(window, 'clearInterval').and.callThrough();
    component.ngOnDestroy();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('should display the canvas for non-third chart indices', () => {
    component.chartIndex = 1;
    fixture.detectChanges();
    const canvasElement = fixture.debugElement.query(By.css('canvas'));
    expect(canvasElement).toBeTruthy();
  });

  it('should display the title div for the third chart index', () => {
    component.chartIndex = 2;
    fixture.detectChanges();
    const titleDiv = fixture.debugElement.query(By.css('.third-chart'));
    expect(titleDiv).toBeTruthy();
    expect(titleDiv.nativeElement.textContent).toBe('Sample Chart');
  });
});

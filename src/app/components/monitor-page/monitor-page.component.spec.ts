import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MonitorPageComponent } from './monitor-page.component';
import { DataService } from 'src/app/services/data.service';
import { of } from 'rxjs';
import { Trainee } from 'src/app/models/trainee .model';

describe('MonitorPageComponent', () => {
  let component: MonitorPageComponent;
  let fixture: ComponentFixture<MonitorPageComponent>;
  let dataServiceStub: Partial<DataService>;

  const mockTrainees: Trainee[] = [
    {
      id: "1",
      name: "John Doe",
      date: "2024-05-01",
      grade: 95,
      subject: "Math",
      address: "123 Main St",
      mail: "john.doe@example.com",
      city: "Anytown",
      country: "USA",
      ZIP: "12345"
    },
    {
      id: "2",
      name: "Alice Smith",
      date: "2024-05-16",
      grade: 75,
      subject: "Science",
      address: "456 Elm St",
      mail: "alice.smith@example.com",
      city: "Smallville",
      country: "Canada",
      ZIP: "67890"
    }
    // Add other mock trainees as needed
  ];

  const mockExamsCount = { "1": 5, "2": 3 };
  const mockAverageGrades = { "1": 90, "2": 80 };

  beforeEach(async () => {
    dataServiceStub = {
      trainees: mockTrainees,
      idFilter: '',
      nameFilter: '',
      filterStatus: 'both',
      getTrainees: () => of(mockTrainees),
      getExamsCountByStudent: () => of(mockExamsCount),
      getAverageGradesByStudent: () => of(mockAverageGrades)
    };

    await TestBed.configureTestingModule({
      declarations: [MonitorPageComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatTableModule,
        FormsModule
      ],
      providers: [{ provide: DataService, useValue: dataServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter trainees by ID', () => {
    component.dataService.idFilter = '1';
    component.applyIdFilter();
    expect(component.filteredTrainees.length).toBe(1);
    expect(component.filteredTrainees[0].id).toBe('1');
  });

  it('should filter trainees by name', () => {
    component.dataService.nameFilter = 'Alice';
    component.applyNameFilter();
    expect(component.filteredTrainees.length).toBe(1);
    expect(component.filteredTrainees[0].name).toBe('Alice Smith');
  });

  it('should filter trainees by status', () => {
    component.filterStatus = 'passed';
    component.applyStatusFilter();
    expect(component.filteredTrainees.length).toBe(2);

    component.filterStatus = 'failed';
    component.applyStatusFilter();
    expect(component.filteredTrainees.length).toBe(0);

    component.filterStatus = 'both';
    component.applyStatusFilter();
    expect(component.filteredTrainees.length).toBe(2);
  });

  it('should sort and remove duplicates', () => {
    const traineesWithDuplicates: Trainee[] = [
      ...mockTrainees,
      {
        id: "1",
        name: "John Doe",
        date: "2024-05-01",
        grade: 95,
        subject: "Math",
        address: "123 Main St",
        mail: "john.doe@example.com",
        city: "Anytown",
        country: "USA",
        ZIP: "12345"
      }
    ];
    const sortedUniqueTrainees = component.sortAndRemoveDuplicates(traineesWithDuplicates, 'id');
    expect(sortedUniqueTrainees.length).toBe(mockTrainees.length);
  });

  it('should correctly determine if a trainee has passed', () => {
    const passedTrainee = mockTrainees[0]; // John Doe, grade 95
    const failedTrainee = mockTrainees[1]; // Alice Smith, grade 75
    expect(component.isPassed(passedTrainee)).toBe(true);
    expect(component.isPassed(failedTrainee)).toBe(true);
  });
});

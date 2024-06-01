
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DataPageComponent } from './data-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Trainee } from 'src/app/models/trainee .model';

describe('DataPageComponent', () => {
  let component: DataPageComponent;
  let fixture: ComponentFixture<DataPageComponent>;
  let dataService: DataService;
  let dialog: MatDialog;

  const mockTrainees: Trainee[] = [
    { id: '1', name: 'John Doe', grade: 90, date: '2021-01-01', mail: 'john@example.com', address: '123 Main St', city: 'Anytown', country: 'USA', ZIP: '12345', subject: 'Math' },
    { id: '2', name: 'Jane Smith', grade: 85, date: '2021-02-01', mail: 'jane@example.com', address: '456 Oak St', city: 'Anytown', country: 'USA', ZIP: '12345', subject: 'Science' }
  ];

  beforeEach(async () => {
    const dataServiceMock = {
      getTrainees: jasmine.createSpy('getTrainees').and.returnValue(of(mockTrainees)),
      addTrainee: jasmine.createSpy('addTrainee').and.returnValue(of({})),
      deleteTrainee: jasmine.createSpy('deleteTrainee').and.returnValue(of({})),
      updateTrainee: jasmine.createSpy('updateTrainee').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [DataPageComponent],
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        MatDialog
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPageComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch trainees on init', () => {
    expect(dataService.getTrainees).toHaveBeenCalled();
    expect(component.tempTrainees).toEqual(mockTrainees);
  });

  it('should filter trainees', fakeAsync(() => {
    component.dataService.filterData = 'John';
    component.applyFilter();
    tick();
    expect(component.tempTrainees.length).toBe(1);
    expect(component.tempTrainees[0].name).toBe('John Doe');
  }));

  it('should add a trainee', () => {
    const newTrainee: Trainee = { id: '3', name: 'New Trainee', grade: 75, date: '2021-03-01', mail: 'new@example.com', address: '789 Pine St', city: 'Anytown', country: 'USA', ZIP: '12345', subject: 'History' };
    component.addTrainee(newTrainee);
    expect(dataService.addTrainee).toHaveBeenCalledWith(newTrainee);
  });

  it('should delete a trainee', () => {
    component.selectedRow = mockTrainees[0];
    component.removeData();
    expect(dataService.deleteTrainee).toHaveBeenCalledWith(mockTrainees[0].id);
  });

  it('should update a trainee', () => {
    const updatedTrainee = { ...mockTrainees[0], name: 'Updated Name' };
    component.updateData(updatedTrainee);
    expect(dataService.updateTrainee).toHaveBeenCalledWith(updatedTrainee);
  });

  it('should open add user dialog', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(true)
    } as any);
    component.openAddUserDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should select a row and show details', () => {
    const trainee = mockTrainees[0];
    component.selectRow(trainee);
    component.showDetails(trainee);
    expect(component.selectedRow).toBe(trainee);
    expect(component.selectedTrainee).toBe(trainee);
  });

  it('should toggle edit mode', () => {
    component.toggleEditMode();
    expect(component.editMode).toBeTrue();
    component.toggleEditMode();
    expect(component.editMode).toBeFalse();
  });
});

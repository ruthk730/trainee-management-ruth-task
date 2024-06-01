import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserDialogComponent } from './add-user-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Trainee } from 'src/app/models/trainee .model';

describe('AddUserDialogComponent', () => {
  let component: AddUserDialogComponent;
  let fixture: ComponentFixture<AddUserDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<AddUserDialogComponent>>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDataService = jasmine.createSpyObj('DataService', ['addTrainee']);

    await TestBed.configureTestingModule({
      declarations: [AddUserDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: DataService, useValue: mockDataService }
      ],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog on cancel', () => {
    const closeButton = fixture.debugElement.query(By.css('button[mat-button]'));
    closeButton.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should call addTrainee with form value on submit', () => {
    const formElement = fixture.debugElement.query(By.css('form')).nativeElement;

    component.addTrainee = jasmine.createSpy().and.callThrough();
    const newTrainee: Trainee = {
      id: "1",
      name: 'Test User',
      date: '2023-01-01',
      grade: 90,
      subject: 'Math',
      address: '123 Test St',
      mail: 'test@example.com',
      city: 'Test City',
      country: 'Test Country',
      ZIP: '12345'
    };

    formElement.querySelector('input[name="name"]').value = newTrainee.name;
    formElement.querySelector('input[name="date"]').value = newTrainee.date;
    formElement.querySelector('input[name="grade"]').value = newTrainee.grade;
    formElement.querySelector('input[name="subject"]').value = newTrainee.subject;
    formElement.querySelector('input[name="address"]').value = newTrainee.address;
    formElement.querySelector('input[name="mail"]').value = newTrainee.mail;
    formElement.querySelector('input[name="city"]').value = newTrainee.city;
    formElement.querySelector('input[name="country"]').value = newTrainee.country;
    formElement.querySelector('input[name="ZIP"]').value = newTrainee.ZIP;

    formElement.querySelector('input[name="name"]').dispatchEvent(new Event('input'));
    formElement.querySelector('input[name="date"]').dispatchEvent(new Event('input'));
    formElement.querySelector('input[name="grade"]').dispatchEvent(new Event('input'));
    formElement.querySelector('input[name="subject"]').dispatchEvent(new Event('input'));
    formElement.querySelector('input[name="address"]').dispatchEvent(new Event('input'));
    formElement.querySelector('input[name="mail"]').dispatchEvent(new Event('input'));
    formElement.querySelector('input[name="city"]').dispatchEvent(new Event('input'));
    formElement.querySelector('input[name="country"]').dispatchEvent(new Event('input'));
    formElement.querySelector('input[name="ZIP"]').dispatchEvent(new Event('input'));

    fixture.detectChanges();

    formElement.querySelector('button[type="submit"]').click();

    expect(component.addTrainee).toHaveBeenCalledWith(newTrainee);
  });

  it('should close dialog with trainee data on successful addition', () => {
    const newTrainee: Trainee = {
      id: "1",
      name: 'Test User',
      date: '2023-01-01',
      grade: 90,
      subject: 'Math',
      address: '123 Test St',
      mail: 'test@example.com',
      city: 'Test City',
      country: 'Test Country',
      ZIP: '12345'
    };

    mockDataService.addTrainee.and.returnValue(of(newTrainee));
    component.addTrainee(newTrainee);

    expect(mockDataService.addTrainee).toHaveBeenCalledWith(newTrainee);
    expect(mockDialogRef.close).toHaveBeenCalledWith(newTrainee);
  });

  it('should log an error message on failed addition', () => {
    const newTrainee: Trainee = {
      id: "1",
      name: 'Test User',
      date: '2023-01-01',
      grade: 90,
      subject: 'Math',
      address: '123 Test St',
      mail: 'test@example.com',
      city: 'Test City',
      country: 'Test Country',
      ZIP: '12345'
    };

    const error = new Error('Error adding trainee');
    mockDataService.addTrainee.and.returnValue(throwError(error));
    spyOn(console, 'error');

    component.addTrainee(newTrainee);

    expect(mockDataService.addTrainee).toHaveBeenCalledWith(newTrainee);
    expect(console.error).toHaveBeenCalledWith('Error adding trainee:', error);
  });
});

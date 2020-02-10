import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrainingService } from '../training.service';
import { Training } from '../view-model/Training';
import { Observable, of,SubscribableOrPromise } from 'rxjs';
import { AddTrainingComponent } from './add-training.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSliderModule } from '@angular/material';


describe('AddTrainingComponent', () => {
    let taskList: Training[] = [{ id: 1, name: 'Training1', startDate: new Date(), endDate: new Date() }];
    const addTaskResponse: any = { message: 'Training added'};
    let component: AddTrainingComponent;
    let taskService: TrainingService;
    let fixture: ComponentFixture<AddTrainingComponent>;
    let httpMock: HttpTestingController;
     
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                NgbModule,
                MatSliderModule,
                HttpClientTestingModule
            ],

          declarations: [
            AddTrainingComponent
          ],
          providers: [
            TrainingService
          ]
        });
        fixture = TestBed.createComponent(AddTrainingComponent);
        component = fixture.componentInstance;
        taskService = TestBed.get(TrainingService);
        httpMock = TestBed.get(HttpTestingController);
        spyOn(taskService, 'addTraining').and.returnValue(of(addTaskResponse));

        fixture.detectChanges();
      });
      
    // Method to check if component is instantiated
    it('should instantiate', () => {
        expect(component).toBeDefined();
    });

    // Method to check if FormGroup is invalid on component instantiation
    it('FormGroup should be invalid onInit', () => {
        component.ngOnInit();
        expect(component.taskFormGroup.valid).toBe(false);
    });

    // Method to test add training 
    it('add training', () => {
        component.addTaskHelper();
        expect(component.messageInfo.messageText).toBe('Task added');
    });

});

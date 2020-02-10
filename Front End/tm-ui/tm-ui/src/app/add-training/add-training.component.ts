import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { TrainingService } from '../training.service';
import { Training } from '../view-model/Training';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError  } from 'rxjs/operators';
import { MessageInfo } from '../message-info';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.sass']
})
export class AddTrainingComponent implements OnInit {

  public taskFormGroup: FormGroup;
  private trainingDetails: Training;
  public messageInfo: MessageInfo = { showMessage: false, messageText: '', messageType: '' };

  constructor(private taskService: TrainingService,
    private formBuilder: FormBuilder) {
    
  }

  // Initialise Task form
  public ngOnInit() {
    // Build Task form
    this.buildForm();
  }

  // Method to Add new training
  public addTask() {
    if (this.taskFormGroup.valid) {
      // Check task type      
        this.addTaskHelper();
    } else {
      console.log('TaskFormGroup is Invalid.');      
    }
  }

  // Method to reset training form details
  public reset() {
    this.taskFormGroup.reset();
  }

  // Method to Build training form
  private buildForm() {
    // Build form
    this.taskFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

    // Method to format Start and End Date
  private formatStartAndEndDate(trainingDetails) {
    // Format Dates
    trainingDetails.startDate = `${trainingDetails.startDate.year}-${trainingDetails.startDate.month < 10 ? '0' + trainingDetails.startDate.month : trainingDetails.startDate.month}-${trainingDetails.startDate.day < 10 ? '0' + trainingDetails.startDate.day : trainingDetails.startDate.day}`;
    trainingDetails.endDate = `${trainingDetails.endDate.year}-${trainingDetails.endDate.month < 10 ? '0' + trainingDetails.endDate.month : trainingDetails.endDate.month}-${trainingDetails.endDate.day < 10 ? '0' + trainingDetails.endDate.day : trainingDetails.endDate.day}`;
    // Return
    return trainingDetails;
  }
  // Helper method for adding training
  public addTaskHelper() {
    // Copy the form values over the User object values
    this.trainingDetails = Object.assign({}, this.trainingDetails, this.taskFormGroup.value);
    
    // Format Dates
    this.formatStartAndEndDate(this.trainingDetails);
    if(this.trainingDetails.endDate > this.trainingDetails.startDate)  
    {
        // Call service method
        this.taskService.addTraining(this.trainingDetails).subscribe((data) => {
          console.log('Added Task successfully');
          // Show success message
          this.messageInfo = {
            showMessage: true,
            messageText: data["message"].toString(),
            messageType: 'success'
          };

          // Hide success message after 3 seconds
          //setTimeout(() => this.messageInfo = { showMessage: true, messageText: '', messageType: '' }, 3000);

          // reset form group
          this.taskFormGroup.reset();
        }, (error) => {
          this.messageInfo = {
            showMessage: true,
            messageText: error.error.message,
            messageType: 'danger'
          };
          console.log('Error while adding task ' + error);
          // Hide error message after 3 seconds
          setTimeout(() => this.messageInfo = { showMessage: false, messageText: '', messageType: '' }, 16000);
        });
      }
      else
      {
        this.taskService.getErrorMessage("ErrorCode2").subscribe((data) => {
          // Show success message
          this.messageInfo = {
            showMessage: true,
            messageText: data,
            messageType: 'danger'
          };
        });
      }
  }
}

import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NgbdSortableHeader, SortEvent, compare} from '../sortable.directive';
import { TrainingService } from '../training.service';
import { Training } from '../view-model/Training';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchTask } from './search-task';
//import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-training.component.html',
  styleUrls: ['./view-training.component.sass']
})
export class ViewTrainingComponent implements OnInit {

  public taskList: Training[] = [];
  public searchFormGroup: FormGroup;
  public searchTaskModel: SearchTask;
  public isTaskListFiltered: boolean = false;
  public page: number = 1;
  public pageSize: number = 10;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private formBuilder: FormBuilder, 
    private taskService: TrainingService,
    private modalService: NgbModal) {
  }

  // Initialise Task form
  public ngOnInit() {
    // Build Task form
    this.buildForm();

    // Retrieve tasks list
    this.getTasks();
  }

  // Method to search Tasks
  public searchTasks() {
    try {
      // Get Search field values from form group
      this.searchTaskModel = Object.assign({}, this.searchTaskModel, this.searchFormGroup.value);
      // Call Service method
      this.taskService.searchTrainings(this.searchTaskModel["trainingname"]).subscribe((tasks) => {
        this.taskList = tasks;
        this.isTaskListFiltered = true;
      },(error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Method to clear Search fields
  public clearSearchFields() {
    // Clear Search fields
    this.searchFormGroup.reset();

    // Retrieve Tasks
    this.getTasks();

    // Set filtered flag to false
    this.isTaskListFiltered = false;
  }

  // Method to sort records in task table
  public onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting
    if (direction === '') {
      this.taskList = this.taskList;
    } else {
      this.taskList = this.taskList.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  // Method to Build Task form
  private buildForm() {
    // Build Task form
    this.searchFormGroup = this.formBuilder.group({
      trainingname: ['', [Validators.required]]
    });
  } 

  // Method to retrieve Task list
  private getTasks() {
    let taskList: Training[] = [];
    this.taskService.getTrainingLists().subscribe((tasks) => {
      this.taskList = tasks;
      this.isTaskListFiltered = false;
    }, (error) => {
      console.log('Error occurred while retrieving Task list ' + error);
    });
  }
}

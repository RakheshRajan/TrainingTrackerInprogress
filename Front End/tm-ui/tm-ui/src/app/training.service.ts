import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Training } from './view-model/Training';
import { AppConfig } from './app.config';
import { SearchTask } from './view-task/search-task';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  apiBaseUrl: string = AppConfig.apiBaseUrl;
  constructor(private http: HttpClient) { }

  // Method to add new Task
  public addTraining(training: Training) {
    return this.http.post(this.apiBaseUrl + '/Add', training);
  }
  // Method to retrieve Task list
  public getTrainingLists(): Observable<Training[]> {
    return this.http.get<Training[]>(this.apiBaseUrl + '/GetAllTrainings');
  }
  // Method to search task as per given serach criteria
  public searchTrainings(searchStr: string = ''): Observable<any> {
    return this.http.get(this.apiBaseUrl + '/Filter/' + searchStr);
  }
  public getErrorMessage(errorCode: string = ''): Observable<any> {
    return this.http.get(this.apiBaseUrl + '/GetErrorMessage/' + errorCode);
  }
}

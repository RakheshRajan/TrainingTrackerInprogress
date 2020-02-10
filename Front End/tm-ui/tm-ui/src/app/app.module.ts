import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { ViewTrainingComponent } from './view-task/view-training.component';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdSortableHeader} from './sortable.directive';
import { CustomHttpInterceptorService } from './CustomHttpInterceptorService';
import { MatSliderModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@NgModule({
  declarations: [
    AppComponent,
    AddTrainingComponent,
    ViewTrainingComponent,
    NgbdSortableHeader,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatSliderModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClient,
    {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true},],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }

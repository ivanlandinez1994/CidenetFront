import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { CreateEmployeePageComponent } from './components/create-employee-page/create-employee-page.component';


@NgModule({
  imports: [CommonModule, SharedModule, AutoCompleteModule, CalendarModule,
    MessagesModule, ToastModule, ConfirmDialogModule, MessageModule, ReactiveFormsModule],
  declarations: [
    CreateEmployeePageComponent
  ],
  providers: [],
})
export class EmployeeModule { }
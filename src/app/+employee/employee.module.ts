import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { EmployeeComponent } from './components/employee/viewer-employee/employee.component';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  imports: [CommonModule, SharedModule, AutoCompleteModule, CalendarModule,
    MessagesModule, ToastModule, ConfirmDialogModule, MessageModule,
    ReactiveFormsModule, InputTextModule, ToolbarModule, TableModule,
    DialogModule, FormsModule ],
  declarations: [
    EmployeeComponent
  ],
  providers: [],
})
export class EmployeeModule { }
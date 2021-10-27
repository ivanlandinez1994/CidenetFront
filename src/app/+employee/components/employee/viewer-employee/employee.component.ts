import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '@employee/services/employee.service';
import { Employee } from '@employee/models/employee';
import { EmployeeFilter } from '@employee/models/employeeFilter';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss'],
    styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }

  @media screen and (max-width: 960px) {
      :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
          text-align: center;
      }

      :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
          display: flex;
      }
  }

`],
    providers: [MessageService, ConfirmationService]
})
export class EmployeeComponent implements OnInit {

    productDialog: boolean;
    operationDialog: string;
    submitted: boolean;
    status: any;
    cols: any[];
    columns: any[];
    listIdentificationType: any;
    listEmployess: any[];
    employeeForm: FormGroup;
    enableNewUser = false;
    codeServiceType: any;
    descriptionServiceType: any;
    rols: any;
    enableSave = false;
    selectedUsers: any[];
    _selectedColumns: any[];
    employeeToSave: Employee;
    employeeFilter: EmployeeFilter;
    listCountries: any[];
    listAreas: any[];

    constructor(private employeeService: EmployeeService, private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {

    }

    ngOnInit() {
        this.loadForm();
        this.loadColumns();
        this.loadInitColumns();
        this.bringEmployees();
        this.loadCountry();
        this.loadArea();
    }

    ngAfterViewInit() {

    }

    ngAfterViewChecked(): void {
        this.changeDetectorRef.detectChanges();
    }

    ngOnChanges() {

    }

    addUser() {
        this.enableNewUser = true;
    }

    openNew() {
        this.loadForm();
        this.submitted = false;
        this.productDialog = true;
        this.operationDialog = 'create';
    }

    hideDialog() {
        this.productDialog = false;
        this.operationDialog = '';
        this.submitted = false;
        this.bringEmployees();
    }

    loadColumns() {
        this.columns = [
            { field: 'name', header: 'Nombre' },
            { field: 'firstLastName', header: 'Apellido' },
            { field: 'secondLastName', header: 'Segundo apellido' },
            { field: 'othersName', header: 'Otros Nombres' },
            { field: 'identificationType', header: 'Tipo Identificacion' },
            { field: 'numberIdentification', header: 'Numero Identificacion' },
            { field: 'email', header: 'Email' },
            { field: 'country', header: 'Country' },
            { field: 'admissionDate', header: 'Fecha admision' },
            { field: 'area', header: 'Area' },
            { field: 'active', header: 'Estado' }
        ];
    }

    loadInitColumns() {
        this._selectedColumns = [
            { field: 'name', header: 'Nombre' },
            { field: 'firstLastName', header: 'Apellido' },
            { field: 'identificationType', header: 'Tipo Identificacion' },
            { field: 'numberIdentification', header: 'Numero Identificacion' },
            { field: 'email', header: 'Email' },
            { field: 'area', header: 'Area' }
        ];
    }

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    loadForm() {
        this.employeeForm = this.fb.group({
            employeeId: [''],
            name: ['', Validators.required],
            firstLastName: ['', [Validators.maxLength(35), Validators.pattern('^((?!\\s{2}).)*$'), Validators.required]],
            secondLastName: ['', [Validators.maxLength(100), Validators.pattern('^((?!\\s{2}).)*$'), Validators.required]],
            othersName: [''],
            country: ['', Validators.required],
            identificationType: ['', Validators.required],
            numberIdentification: ['', Validators.required],
            admissionDate: ['', Validators.required],
            area: ['', [Validators.maxLength(100), Validators.required]],
            email: ['']
        });
    }

    bringEmployees() {
        this.employeeFilter = {
            firstName: this.employeeForm.get('name').value,
            otherNames: this.employeeForm.get('othersName').value,
            firstLastName: this.employeeForm.get('firstLastName').value,
            secondLastName: this.employeeForm.get('secondLastName').value,
            identificationType: this.employeeForm.get('identificationType').value,
            numberIdentification: this.employeeForm.get('numberIdentification').value,
            country: this.employeeForm.get('country').value,
            email: this.employeeForm.get('email').value,
            active: true,
        }
        this.employeeService.bringEmployees(this.employeeFilter).subscribe(data => {
            if (data.message != null) {
                this.listEmployess = data.message;
            }
        })
    }

    saveEmployee() {
        let messageOk = 'Usuario ' + (this.operationDialog == 'create' ? 'creado' : 'editado');
        let messageError = 'Ocurrió un error al intentar ' +
            (this.operationDialog == 'create' ? 'crear' : 'editar' + ' el usuario');
        this.employeeToSave = {
            employeeId: this.employeeForm.get('employeeId').value != null ?
                this.employeeForm.get('employeeId').value : null,
            name: this.employeeForm.get('name').value,
            firstLastName: this.employeeForm.get('firstLastName').value,
            secondLastName: this.employeeForm.get('secondLastName').value,
            othersName: this.employeeForm.get('othersName').value,
            country: this.employeeForm.get('country').value.cod,
            identificationType: this.employeeForm.get('identificationType').value,
            numberIdentification: this.employeeForm.get('numberIdentification').value,
            admissionDate: this.employeeForm.get('admissionDate').value,
            area: this.employeeForm.get('area').value.cod,
            active: true,
            email: null
        }
        if (this.employeeToSave.employeeId != null) {
            this.employeeService.updateEmployee(this.employeeToSave).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: messageOk, life: 3000 });
                this.bringEmployees();
            }, () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: messageError, life: 3000 });
            });
        } else {
            this.employeeService.saveEmployee(this.employeeToSave).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: messageOk, life: 3000 });
                this.bringEmployees();
            }, () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: messageError, life: 3000 });
            });

        }
        this.cancelar();
    }

    editEmployee(employee: any) {
        this.loadForm();
        this.employeeToSave = employee;
        this.employeeForm = this.fb.group({
            employeeId: [employee.employeeId],
            name: [employee.name, Validators.required],
            firstLastName: [employee.firstLastName, [Validators.maxLength(35), Validators.pattern('^((?!\\s{2}).)*$'), Validators.required]],
            secondLastName: [employee.secondLastName, [Validators.maxLength(100), Validators.pattern('^((?!\\s{2}).)*$'), Validators.required]],
            othersName: [employee.othersName],
            country: [employee.country, Validators.required],
            identificationType: [employee.identificationType, Validators.required],
            numberIdentification: [employee.numberIdentification, Validators.required],
            admissionDate: [new Date(employee.admissionDate), Validators.required],
            area: [employee.area, [Validators.maxLength(100), Validators.required]],
            email: [employee.email]
        });
        this.loadArea();
        this.loadCountry();
        this.productDialog = true;
        this.operationDialog = 'update';
    }

    deleteEmployee(id: string, name: string) {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar? ' + name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.employeeService.deleteEmployee(id).subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empleado eliminado', life: 3000 });
                    this.bringEmployees();
                }, () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error eliminando el empleado ' + name, life: 3000 });
                    this.bringEmployees();
                })
            }
        });
    }

    loadCountry() {
        this.employeeService.bringCountries().subscribe(data => {
            this.listCountries = data.message;
            this.listCountries.map(element => {
                if (this.employeeToSave != null && element.cod == this.employeeToSave.country) {
                    this.employeeForm.get('country').setValue(element);
                }
            })
        });
    }

    loadArea() {
        this.employeeService.bringAreas().subscribe(data => {
            this.listAreas = data.message;
            this.listAreas.map(element => {
                if (this.employeeToSave != null && element.cod == this.employeeToSave.area) {
                    this.employeeForm.get('area').setValue(element);
                }
            })
        })
    }

    messageDialogSave() {
        this.messageService.add({ key: 'tst', severity: 'info', summary: 'Employee', detail: 'Creación Exitosa', icon: "pi pi-check" });
    }

    cancelar() {
        this.productDialog = false;
        this.operationDialog = '';
        this.submitted = false;
        this.employeeForm.reset()
    }

    onRowSelect(event) {
        // this.messageService.add({severity:'info', summary:'Product Selected', detail: event.data.name});
        console.log('on row select');
        console.log(event);
    }

    onRowUnselect(event) {
        // this.messageService.add({severity:'info', summary:'Product Unselected',  detail: event.data.name});
        console.log('onrow unselect');
        console.log(event);
    }

    set selectedColumns(val: any[]) {
        //restore original order
        if (this._selectedColumns != null && !this._selectedColumns.includes(val)) {
          this._selectedColumns = val;
        } else {
          this._selectedColumns = this.columns.filter(col => val.includes(col));
        }
      }
}

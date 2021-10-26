import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'app/+employee/services/employee.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Employee } from '../../models/employee';

@Component({
    templateUrl: './create-employee-page.component.html',
    providers: [ConfirmationService, MessageService]
})
export class CreateEmployeePageComponent implements OnInit {

    selectedCountryAdvanced: any[];
    employeeForm: FormGroup;
    listCountries: any[];
    countryCodes: string[];
    listAreas: any[];
    areaCodes: string[];
    employeeToSave: Employee;
    msgs1: Message[];

    listCountry: any[];

    constructor(
        private fB: FormBuilder,
        private confirmationService: ConfirmationService,
        private service: MessageService,
        private employeeService: EmployeeService
    ) { }
    /**
     * On init
      */
    ngOnInit(): void {
        this.employeeForm = this.fB.group({
            id: [''],
            name: ['', Validators.required],
            firstLastName: ['', [Validators.maxLength(35), Validators.pattern('^((?!\\s{2}).)*$'), Validators.required]],
            secondLastName: ['', [Validators.maxLength(100), Validators.pattern('^((?!\\s{2}).)*$'), Validators.required]],
            othersName: [''],
            country: ['', Validators.required],
            identificationType: ['', Validators.required],
            numberIdentification: ['', Validators.required],
            admissionDate: ['', Validators.required],
            area: ['', [Validators.maxLength(100), Validators.required]],
            active: ['']
        });
        this.countryCodes = [];
        this.listCountries = [];
        this.areaCodes = [];
        this.listAreas = [];
    }

    loadCountry() {
        this.employeeService.bringCountries().subscribe(data => {
            this.listCountries = data.message;
        });
    }

    loadArea() {
        this.employeeService.bringAreas().subscribe(data => {
            this.listAreas = data.message;            
        })
    }

    saveEmployee() {
        debugger;
        if (this.employeeForm.valid) {
            this.confirmSave();
        }
    }

    confirmSave() {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: '¿Está seguro de almacenar los cambios realizados?',
            accept: () => {
                this.employeeToSave = {
                    employeeId: null,
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
                debugger;
                this.employeeService.saveEmployee(this.employeeToSave).subscribe(() => {
                    this.messageDialogSave();
                })
                this.employeeForm.reset();
            }
        });
    }

    messageDialogSave() {
        this.service.add({ key: 'tst', severity: 'info', summary: 'Employee', detail: 'Creación Exitosa', icon: "pi pi-check" });
    }

    cancelar() {
        this.employeeForm.reset()
    }
}
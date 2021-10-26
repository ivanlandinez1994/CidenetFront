import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor() { }

    ngOnInit() {
        this.model = [
            {
                label: 'Features', icon: 'pi pi-fw pi-home',
                items: [
                    { label: 'Crear Empleado', icon: 'pi pi-fw pi-home', routerLink: ['/create-employee'] },
                    { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/employee'] },
                ]
            }

        ];
    }
}

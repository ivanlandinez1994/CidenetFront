import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateEmployeePageComponent } from './+employee/components/create-employee-page/create-employee-page.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'create-employee', component: CreateEmployeePageComponent },
            { path: 'error', component: AppErrorComponent },
            { path: 'notfound', component: AppNotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

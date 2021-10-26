import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppTopBarComponent } from '@shared/components/topbar/app.topbar.component';
import { AppMainComponent } from '@shared/components/main/app.main.component';
import { AppMenuComponent } from '@shared/components/menu/app.menu.component';
import { AppBreadcrumbComponent } from '@shared/components/breadcrumb/app.breadcrumb.component';
import { AppBreadcrumbService } from '@shared/services/app.breadcrumb.service';
import { MenuService } from '@shared/services/app.menu.service';
import { AppFooterComponent } from '@shared/components/footer/app.footer.component';
import { AppMenuitemComponent } from '@shared/components/menuitem/app.menuitem.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HttpService } from '@shared/services/http.service';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppTopBarComponent,
    AppMainComponent,
    AppMenuComponent,
    AppBreadcrumbComponent,
    AppFooterComponent,
    AppMenuitemComponent
  ],
  providers: [
    AppBreadcrumbService,
    MenuService,
    HttpService
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,

    //primeng references
    BreadcrumbModule,
    RippleModule,
    ButtonModule,
  ]
})
export class SharedModule {


}

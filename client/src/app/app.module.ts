import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './guards/auth.guard';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ProjectService} from './services/project.service';
import {AuthService} from './services/auth.service';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {DeleteFormModalComponent} from './modals/delete-form-modal/delete-form-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {MyProjectsComponent} from './components/my-projects/my-projects.component';
import {ProjectComponent} from './components/project/project.component';
import { CreateUpdateFormModalComponent } from './modals/create-update-form-modal/create-update-form-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DeleteFormModalComponent,
    NavbarComponent,
    MyProjectsComponent,
    ProjectComponent,
    CreateUpdateFormModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    Ng2SearchPipeModule
  ],
  providers: [
    AuthService,
    ProjectService,
    AuthGuard
  ],
  entryComponents: [
    DeleteFormModalComponent,
    CreateUpdateFormModalComponent
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

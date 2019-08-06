import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './guards/auth.guard';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ProjectService} from './services/project.service';
import {AuthService} from './services/auth.service';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {EditFormModalComponent} from './modals/edit-form-modal/edit-form-modal.component';
import {DeleteFormModalComponent} from './modals/delete-form-modal/delete-form-modal.component';
import {CreateFormModalComponent} from './modals/create-form-modal/create-form-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {MyProjectsComponent} from './components/my-projects/my-projects.component';
import {ProjectComponent} from './components/project/project.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    EditFormModalComponent,
    DeleteFormModalComponent,
    CreateFormModalComponent,
    NavbarComponent,
    MyProjectsComponent,
    ProjectComponent
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
    EditFormModalComponent,
    DeleteFormModalComponent,
    CreateFormModalComponent
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

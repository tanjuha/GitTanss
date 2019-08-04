import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';

import {AuthGuard} from './guards/auth.guard';
import {HomeModule} from './home/home.module';
import {HomeRoutingModule} from './home/home-routing.module';


import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {UserService} from './services/user.service';
import {ProjectService} from './services/project.service';
import {AuthService} from './services/auth.service';
import {CommonModule} from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {EditFormModalComponent} from './modals/edit-form-modal/edit-form-modal.component';
import {DeleteFormModalComponent} from './modals/delete-form-modal/delete-form-modal.component';
import {CreateFormModalComponent} from './modals/create-form-modal/create-form-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditFormModalComponent,
    DeleteFormModalComponent,
    CreateFormModalComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    AppRoutingModule,
    CommonModule,
    HomeModule,
    HomeRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    UserService,
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

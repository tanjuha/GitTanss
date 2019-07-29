import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {UserService} from './shared/services/user.service';
import {AuthService} from './shared/services/auth.service';
import {AuthGuard} from './auth/auth.guard';
import {HomeModule} from './home/home.module';
import {HomeRoutingModule} from './home/home-routing.module';
import {HomeGuard} from './home/home-guard';
import {ProjectService} from './shared/services/project.service';
import {AngularFontAwesomeModule} from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    AppRoutingModule,
    HomeModule,
    HomeRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    UserService,
    AuthService,
    ProjectService,
    AuthGuard,
    HomeGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

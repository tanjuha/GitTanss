import {NgModule} from '@angular/core';
import { ProjectComponent } from './project/project.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { MyProjectsComponent } from './my-projects/my-projects.component';


@NgModule({
  declarations: [
    ProjectComponent,
    MyProjectsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class HomeModule {}

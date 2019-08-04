import {NgModule} from '@angular/core';
import { ProjectComponent } from './project/project.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { MyProjectsComponent } from './my-projects/my-projects.component';


@NgModule({
  declarations: [
    ProjectComponent,
    MyProjectsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class HomeModule {}

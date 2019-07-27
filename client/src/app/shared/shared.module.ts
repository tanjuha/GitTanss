import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditFormModalComponent } from './modal/edit-form-modal/edit-form-modal.component';
import { DeleteFormModalComponent } from './modal/delete-form-modal/delete-form-modal.component';
import {CommonModule} from '@angular/common';
import { CreateFormModalComponent } from './modal/create-form-modal/create-form-modal.component';
import { AddUsersFormModalComponent } from './modal/add-users-form-modal/add-users-form-modal.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    EditFormModalComponent,
    DeleteFormModalComponent,
    CreateFormModalComponent,
    AddUsersFormModalComponent
  ],
  entryComponents: [
    EditFormModalComponent,
    DeleteFormModalComponent,
    CreateFormModalComponent,
    AddUsersFormModalComponent
  ]
})
export class SharedModule {}

import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditFormModalComponent } from './modal/edit-form-modal/edit-form-modal.component';
import { DeleteFormModalComponent } from './modal/delete-form-modal/delete-form-modal.component';
import {CommonModule} from '@angular/common';
import { CreateFormModalComponent } from './modal/create-form-modal/create-form-modal.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    EditFormModalComponent,
    DeleteFormModalComponent,
    CreateFormModalComponent
  ],
  entryComponents: [
    EditFormModalComponent,
    DeleteFormModalComponent,
    CreateFormModalComponent
  ]
})
export class SharedModule {}

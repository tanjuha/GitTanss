import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-edit-form-modal',
  templateUrl: './edit-form-modal.component.html',
  styleUrls: ['./edit-form-modal.component.css']
})
export class EditFormModalComponent implements OnInit {

  @Input()
  name_project;
  description;

  editForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public project: ProjectService,
    public formBuilder: FormBuilder
  ) { }


  get form() { return this.editForm.controls; }

  private createForms() {
    this.editForm = this.formBuilder.group({
      name_project: '',
      description: '',
    });
  }

  private submitForm() {
    this.activeModal.close(this.editForm.value);
  }

/*  submitForm() {
    console.log('edit form work');
      const formData = this.editForm.value;
      this.project.update(formData, this.id).subscribe(res => {
          console.log('successfully update user');
        },
        err => {
          console.log(err);
        }
      );
      console.log('update project');
  }*/

  ngOnInit() {
    this.editForm = new FormGroup({
      'name_project': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });
  }

}

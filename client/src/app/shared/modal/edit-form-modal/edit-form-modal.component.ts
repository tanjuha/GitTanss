import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-edit-form-modal',
  templateUrl: './edit-form-modal.component.html',
  styleUrls: ['./edit-form-modal.component.css']
})
export class EditFormModalComponent implements OnInit {

  editForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, public project: ProjectService) { }

  @Input()
  id;
  name_project;
  description;

  submitForm() {
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
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      'name_project': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });
  }

}

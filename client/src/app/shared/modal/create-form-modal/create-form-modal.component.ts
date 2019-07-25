import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-create-form-modal',
  templateUrl: './create-form-modal.component.html',
  styleUrls: ['./create-form-modal.component.css']
})
export class CreateFormModalComponent implements OnInit {

  createForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, public project: ProjectService) { }

  submitForm() {
    const formData = this.createForm.value;
    this.project.create(formData).subscribe(res => {
        console.log('successfully create user');
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.createForm = new FormGroup({
      'name_project': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'user_id': new FormControl()
    });
  }

}

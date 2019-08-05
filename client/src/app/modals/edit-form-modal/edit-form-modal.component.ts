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
  title;
  description;
  myProject: any;
  editForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public project: ProjectService,
    public formBuilder: FormBuilder
  ) {
    this.createForms();
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });
  }


  get form() { return this.editForm.controls; }

  private createForms() {
    this.editForm = this.formBuilder.group({
      title: '',
      description: '',
    });
  }

  private submitForm() {
    this.activeModal.close(this.editForm.value);
  }
}

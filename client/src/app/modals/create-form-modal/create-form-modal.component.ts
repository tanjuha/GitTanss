import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProjectService} from '../../services/project.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-create-form-modal',
  templateUrl: './create-form-modal.component.html',
  styleUrls: ['./create-form-modal.component.css', '../../../shared/app-style.css']
})
export class CreateFormModalComponent implements OnInit {

  @Input()
  myProject: any;
  myCreateForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public project: ProjectService,
    public auth: AuthService,
    private formBuilder: FormBuilder) {

    this.createForms();
  }

  ngOnInit() {
    this.myCreateForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });

  }

  get form() { return this.myCreateForm.controls; }

  private createForms() {
    this.myCreateForm = this.formBuilder.group({
      title: '',
      description: '',
    });
  }

  private submitForm() {
    this.activeModal.close(this.myCreateForm.value);
  }


}

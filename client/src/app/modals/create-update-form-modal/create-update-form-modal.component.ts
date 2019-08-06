import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProjectService} from '../../services/project.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-update-form-modal',
  templateUrl: './create-update-form-modal.component.html',
  styleUrls: ['./create-update-form-modal.component.css', '../../../shared/app-style.css']
})
export class CreateUpdateFormModalComponent implements OnInit {

  public titleCard = 'Name project';
  public descriptionCard = 'Description';

  @Input()
  title;
  titleModal;
  description;
  myProject: any;
  myForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public project: ProjectService,
    public formBuilder: FormBuilder
  ) {
    if (!(this.title || this.description) ) {
      this.title = '';
      this.description = '';
    }
    this.createForms();
  }


  ngOnInit() {
    this.myForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });
  }

  get form() { return this.myForm.controls; }

  private createForms() {
    this.myForm = this.formBuilder.group({
      title: '',
      description: '',
    });
  }

  private submitForm() {
    this.activeModal.close(this.myForm.value);
  }

}

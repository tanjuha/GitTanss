import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-form-modal',
  templateUrl: './delete-form-modal.component.html',
  styleUrls: ['./delete-form-modal.component.css']
})
export class DeleteFormModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  @Input() title;

  ngOnInit() {
  }

}

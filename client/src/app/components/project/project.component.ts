import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ProjectService} from '../../services/project.service';
import {AuthService} from '../../services/auth.service';
import {CreateUpdateFormModalComponent} from '../../modals/create-update-form-modal/create-update-form-modal.component';
import {Message} from '../../../models/message.model';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: [
    './project.component.css',
    '../../../shared/app-style.css'
  ]
})

export class ProjectComponent implements OnInit {

  rowDescription: number;
  projects:  any = [];
  searchValue: string;
  message: Message;

  constructor( private project: ProjectService,
               private modalService: NgbModal,
               public auth: AuthService) { }

  ngOnInit() {
    this.rowDescription = 6;
    this.message = new Message('danger', '');
    this.project.getProjects().subscribe((data: any) => this.projects = data);
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  edit(project) {
    const modalRef = this.modalService.open(CreateUpdateFormModalComponent);
    modalRef.componentInstance.titleModal = 'Edit project';
    modalRef.componentInstance.rowDescription = this.rowDescription;
    modalRef.componentInstance.title = project.title;
    modalRef.componentInstance.description = project.description;
    modalRef.componentInstance.statusTitle = true;
    modalRef.result.then((result) => {
      project.description = result.description;
      this.project.edit(project.id, project.title, result.description)
        .subscribe(() => {
            this.showMessage({
              text: `Update ${project.title} project`,
              type: 'success'
            });
        },
          () =>  this.showMessage({
          text: 'Failed update project',
          type: 'danger'
        })
      );
    }).catch(() => {
      this.showMessage({
        text: `Failed update ${project.title} project`,
        type: 'danger'
      });
    });
  }
}


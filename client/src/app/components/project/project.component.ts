import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ProjectService} from '../../services/project.service';
import {AuthService} from '../../services/auth.service';
import {CreateUpdateFormModalComponent} from '../../modals/create-update-form-modal/create-update-form-modal.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: [
    './project.component.css',
    '../../../shared/app-style.css'
  ]
})

export class ProjectComponent implements OnInit {

  projects:  any = [];
  searchValue: string;

  constructor( private project: ProjectService,
               private modalService: NgbModal,
               public auth: AuthService) { }

  ngOnInit() {
    this.project.getProjects().subscribe((data: any) => this.projects = data);
  }

  edit(project) {
    const modalRef = this.modalService.open(CreateUpdateFormModalComponent);
    modalRef.componentInstance.titleModal = 'Edit project';
    modalRef.componentInstance.title = project.title;
    modalRef.componentInstance.description = project.description;
    modalRef.result.then((result) => {
      project.description = result.description;
      project.title = result.title;
      this.project.edit(project.id, result.title, result.description)
        .subscribe(res => {
          console.log('Message-alert successfully edit project');
        },
        err => {
          console.log(err);
        }
      );
      console.log('Message-alert edit project');
    }).catch((error) => {
      console.log(error);
    });
  }
}


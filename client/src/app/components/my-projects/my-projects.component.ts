import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ProjectService} from '../../services/project.service';
import {AuthService} from '../../services/auth.service';
import {DeleteFormModalComponent} from '../../modals/delete-form-modal/delete-form-modal.component';
import {CreateUpdateFormModalComponent} from '../../modals/create-update-form-modal/create-update-form-modal.component';
import {Message} from '../../../models/message.model';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: [
    './my-projects.component.css',
    '../../../shared/app-style.css'
  ]
})

export class MyProjectsComponent implements OnInit {

  rowDescription: number;
  projects: any = [] ;
  searchValue: string;
  message: Message;


  constructor( private project: ProjectService,
               private modalService: NgbModal,
               private auth: AuthService ) {}

  ngOnInit() {
    this.rowDescription = 6;
    this.message = new Message('danger', '');
    this.project.getProjectsByUserId()
      .subscribe((data: any) => this.projects = data);
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  create() {
    const modalRef = this.modalService.open(CreateUpdateFormModalComponent);
    modalRef.componentInstance.myProject = {};
    modalRef.componentInstance.rowDescription = this.rowDescription;
    modalRef.componentInstance.titleModal = 'Create project';
    modalRef.result.then((result) => {
      this.project.create(this.auth.currentUser.userid, result.title, result.description)
        .subscribe(res => {
            this.showMessage({
              text: 'Created new project',
              type: 'success'
            });
           this.projects.unshift(res);
        },
          () =>  this.showMessage({
            text: 'Failed create project',
            type: 'danger'
          })
      );
    })
      .catch(() => {
        this.showMessage({
          text: 'Failed create project',
          type: 'danger'
        });
    });
  }

  edit(project) {
    const modalRef = this.modalService.open(CreateUpdateFormModalComponent);
    modalRef.componentInstance.myProject = {};
    modalRef.componentInstance.titleModal = 'Edit project';
    modalRef.componentInstance.rowDescription = this.rowDescription;
    modalRef.componentInstance.title = project.title;
    modalRef.componentInstance.description = project.description;
    modalRef.result.then((result) => {
      this.project.edit(project.id, result.title, result.description)
        .subscribe(() => {
            this.showMessage({
              text: `Update ${result.title} project`,
              type: 'success'
            });
        project.title = result.title;
        project.description = result.description;
        },
          () =>    this.showMessage({
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

  delete(project, index) {
    const modalRef = this.modalService.open(DeleteFormModalComponent);
    modalRef.componentInstance.title = project.title;
    modalRef.result.then(() => {
      this.project.deleteProject(project.id)
        .subscribe((data: any) => {
          this.projects = data;
      });
      this.showMessage({
        text: `Deleted ${project.title} project`,
        type: 'success'
      });
      this.projects.splice(index, 1);
    }).catch(() => {
      this.showMessage({
        text: `Failed delete ${project.title} project`,
        type: 'danger'
      });
    });
  }

}

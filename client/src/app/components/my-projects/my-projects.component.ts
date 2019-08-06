import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ProjectService} from '../../services/project.service';
import {AuthService} from '../../services/auth.service';
import {DeleteFormModalComponent} from '../../modals/delete-form-modal/delete-form-modal.component';
import {CreateUpdateFormModalComponent} from '../../modals/create-update-form-modal/create-update-form-modal.component';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: [
    './my-projects.component.css',
    '../../../shared/app-style.css'
  ]
})

export class MyProjectsComponent implements OnInit {

  projects: any = [] ;
  searchValue: string;

  constructor( private project: ProjectService,
               private modalService: NgbModal,
               private auth: AuthService ) {
  }

  ngOnInit() {
    this.project.getProjectsByUserId().subscribe((data: any) => this.projects = data);
  }


  create() {
    const modalRef = this.modalService.open(CreateUpdateFormModalComponent);
    modalRef.componentInstance.myProject = {};
    modalRef.componentInstance.titleModal = 'Create project';
    modalRef.result.then((result) => {
      this.project.create(this.auth.currentUser.userid, result.title, result.description)
        .subscribe(res => {
          console.log( 'Message-alert = create user ');
           this.projects.unshift(res);
        },
          () => {
          console.log( 'Message-alert = err create user ');
        }
      );
    })
      .catch((error) => {
      console.error(error);
    });
  }

  edit(project) {
    const modalRef = this.modalService.open(CreateUpdateFormModalComponent);
    modalRef.componentInstance.myProject = {};
    modalRef.componentInstance.titleModal = 'Edit project';
    modalRef.componentInstance.title = project.title;
    modalRef.componentInstance.description = project.description;
    modalRef.result.then((result) => {
      this.project.edit(project.id, result.title, result.description)
        .subscribe(() => {
        console.log('Message-alert');
        project.title = result.title;
        project.description = result.description;
        },
          () => {
          console.log('Message-alert');
        }
      );
    }).catch((error) => {
      console.error(error);
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
      this.projects.splice(index, 1);
    }).catch((error) => {
      console.error(`Message-alert error delete project - ${error}`);
    });
  }

}

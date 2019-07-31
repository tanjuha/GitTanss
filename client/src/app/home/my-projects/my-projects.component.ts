import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';
import {CreateFormModalComponent} from '../../shared/modals/create-form-modal/create-form-modal.component';
import {EditFormModalComponent} from '../../shared/modals/edit-form-modal/edit-form-modal.component';
import {DeleteFormModalComponent} from '../../shared/modals/delete-form-modal/delete-form-modal.component';
import {AddUsersFormModalComponent} from '../../shared/modals/add-users-form-modal/add-users-form-modal.component';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  projects: any ;

  constructor( private project: ProjectService,
               private modalService: NgbModal,
               private userService: UserService,
               private auth: AuthService) {
  }

  ngOnInit() {

    this.project.getProjectsByUserId().subscribe((data: any) => this.projects = data);
  }

  create() {
    const modalRef = this.modalService.open(CreateFormModalComponent);
    modalRef.componentInstance.myProject = {};
    modalRef.result.then((result) => {
      this.projects.unshift(result);
      this.project.create(result.name_project, result.description,  this.auth.currentUserValue).subscribe(res => {
          console.log( 'create user = ' + res);
        },
        err => {
          console.log( ' err create user = ' + err);
        }
      );
      console.log(result + 'name project = ' + result.description);
    }).catch((error) => {
      console.log(error);
    });
  }

  edit(project) {
    const modalRef = this.modalService.open(EditFormModalComponent);
    modalRef.componentInstance.name_project = project.name_project;
    modalRef.componentInstance.description = project.description;
    modalRef.result.then((result) => {
      project.description = result.description;
      project.name_project = result.name_project;
      this.project.edit(result.name_project, result.description, project.id).subscribe(res => {
          console.log('successfully edit project');
        },
        err => {
          console.log(err);
        }
      );
      console.log('edit project');
    }).catch((error) => {
      console.log(error);
    });
  }

  delete(project, index) {
    const modalRef = this.modalService.open(DeleteFormModalComponent);
    modalRef.componentInstance.name_project = project.name_project;
    modalRef.result.then((result) => {
      this.project.deleteProject(project.id).subscribe((data: any) => {
        this.projects = data;
      });
      this.projects.splice(index, 1);
      console.log(`delete project - ${result} , - id = ${project.id}`);
    }).catch((error) => {
      console.log(`error delete project - ${error}`);
    });
  }

  addUsers(project) {
    const modalRef = this.modalService.open(AddUsersFormModalComponent);
    modalRef.componentInstance.name_project = project.name_project;
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}

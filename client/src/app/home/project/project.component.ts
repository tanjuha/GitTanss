import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditFormModalComponent} from '../../shared/modal/edit-form-modal/edit-form-modal.component';
import {DeleteFormModalComponent} from '../../shared/modal/delete-form-modal/delete-form-modal.component';
import {CreateFormModalComponent} from '../../shared/modal/create-form-modal/create-form-modal.component';
import {AddUsersFormModalComponent} from '../../shared/modal/add-users-form-modal/add-users-form-modal.component';
import {Project} from '../../shared/models/project.model';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any;

  constructor( private project: ProjectService, private modalService: NgbModal) { }

  ngOnInit() {
    this.project.getProjects().subscribe((data: any) => this.projects = data);
  }

  create() {
    const modalRef = this.modalService.open(CreateFormModalComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  edit(project) {
    const modalRef = this.modalService.open(EditFormModalComponent);
    modalRef.componentInstance.id = project.id;
    modalRef.componentInstance.name_project = project.name_project;
    modalRef.componentInstance.description = project.description;
    modalRef.result.then((result) => {
      console.log(result);
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


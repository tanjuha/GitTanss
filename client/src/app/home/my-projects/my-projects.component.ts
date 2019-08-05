import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProjectService} from '../../services/project.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {CreateFormModalComponent} from '../../modals/create-form-modal/create-form-modal.component';
import {EditFormModalComponent} from '../../modals/edit-form-modal/edit-form-modal.component';
import {DeleteFormModalComponent} from '../../modals/delete-form-modal/delete-form-modal.component';
import {Router} from '@angular/router';


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
               private auth: AuthService,
               private router: Router) {
  }

  ngOnInit() {

    this.project.getProjectsByUserId().subscribe((data: any) => this.projects = data);
  }

  create() {
    const modalRef = this.modalService.open(CreateFormModalComponent);
    modalRef.componentInstance.myProject = {};
    modalRef.result.then((result) => {
      this.project.create(this.auth.currentUser.userid, result.title, result.description).subscribe(res => {
          console.log( 'create user = ' + this.auth.currentUser.userid);
           this.projects.unshift(res);
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

  edit(project, index) {
    const modalRef = this.modalService.open(EditFormModalComponent);
    modalRef.componentInstance.myProject = {};
    modalRef.componentInstance.title = project.title;
    modalRef.componentInstance.description = project.description;
    modalRef.result.then((result) => {
      this.project.edit(index, result.title, result.description).subscribe(res => {
          console.log('successfully edit project' + project);
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
    modalRef.componentInstance.title = project.title;
    modalRef.result.then(() => {
      this.project.deleteProject(project.id).subscribe((data: any) => {
        this.projects = data;
      });
      this.projects.splice(index, 1);
    }).catch((error) => {
      console.log(`error delete project - ${error}`);
    });
  }

}

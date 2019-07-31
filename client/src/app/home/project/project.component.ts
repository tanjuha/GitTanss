import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditFormModalComponent} from '../../shared/modals/edit-form-modal/edit-form-modal.component';
import {User} from '../../shared/models/user.model';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any ;
  currentUser: User;
  currentUserId: any;


  constructor( private project: ProjectService,
               private modalService: NgbModal,
               public userService: UserService,
               public auth: AuthService) { }

  ngOnInit() {

    // get current user username from jwt
    this.currentUser = this.auth.decodeToken();

    // get current user id
    this.userService.getUserByUsername(this.currentUser.username).subscribe(data => {
      this.currentUserId = data.map(elem => elem.id);
    });

    this.project.getProjects().subscribe((data: any) => this.projects = data);
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
}


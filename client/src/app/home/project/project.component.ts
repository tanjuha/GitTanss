import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditFormModalComponent} from '../../shared/modals/edit-form-modal/edit-form-modal.component';
import {AuthService} from '../../shared/services/auth.service';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any ;

  constructor( private project: ProjectService,
               private modalService: NgbModal,
               public auth: AuthService) { }

  ngOnInit() {
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


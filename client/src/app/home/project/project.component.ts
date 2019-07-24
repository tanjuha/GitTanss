import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any;
  formProject: FormGroup;

  constructor( private project: ProjectService) { }

  ngOnInit() {
    this.formProject = new FormGroup({
      'name_project': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'user_id': new FormControl()
    });
    this.project.getProjects().subscribe((data: any) => this.projects = data);
  }

  delete(id) {
    this.project.deleteProject(id).subscribe((data: any) => {
      this.projects = data;
    });
  }

  createProject() {
    const formData = this.formProject.value;
     this.project.create(formData).subscribe(res => {
         console.log('successfully create user');
       },
       err => {
         console.log(err);
       }
     );
    console.log(formData);
  }

  update(id) {
    const formData = this.formProject.value;
    this.project.update(formData, id).subscribe(res => {
        console.log('successfully update user');
      },
      err => {
        console.log(err);
      }
    );
    console.log('update project');
  }

}


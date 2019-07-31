import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Project} from '../models/project.model';
import {AuthService} from './auth.service';

@Injectable()
export class ProjectService {

  private getProjectsUrl = `${environment.url}/projects`;
  private  getProjectsByUserIdUrl = `${environment.url}/projects`;
  private deleteProjectUrl = `${environment.url}/project`;
  private createProjectUrl = `${environment.url}/project`;
  private  updateProjectUrl = `${environment.url}/project/edit`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getProjects() {
     return this.http.get<Project[]>(this.getProjectsUrl);
  }

  getProjectsByUserId () {
    const  projects  = this.auth.currentUserValue;
      return this.http.get<Project[]>(`${this.getProjectsByUserIdUrl}/${projects}`);
  }

  deleteProject(id: Project) {
    return this.http.delete<Project[]>(`${this.deleteProjectUrl}/${id}`);
  }

  create(name_project, description, user_id) {
    return this.http.post<Project[]>(this.createProjectUrl, {name_project,  description, user_id});
  }

  edit(name_project, description, id: Project) {
    return this.http.put<Project[]>(`${this.updateProjectUrl}/${id}`, {name_project,  description, id});
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '../models/project.model';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

@Injectable()
export class ProjectService {

  private getProjectsUrl = `${environment.url}/projects`;
  private  getProjectsByUserIdUrl = `${environment.url}/projects/user`;
  private deleteProjectUrl = `${environment.url}/projects`;
  private createProjectUrl = `${environment.url}/project`;
  private  updateProjectUrl = `${environment.url}/projects`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getProjects() {
     return this.http.get(this.getProjectsUrl);
  }

  getProjectsByUserId () {
    const  projects  = this.auth.currentUser.userid;
      return this.http.get(`${this.getProjectsByUserIdUrl}/${projects}`);
  }

  deleteProject(id: Project) {
    return this.http.delete(`${this.deleteProjectUrl}/${id}`);
  }

  create(userId, title, description, ) {
    return this.http.post(this.createProjectUrl, {userId, title, description});
  }

  edit(id, title, description) {
    return this.http.put(`${this.updateProjectUrl}/${id}`, {title,  description});
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Project} from '../../models/project.model';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';


@Injectable()

export class ProjectService {

  private projectsUrl = `${environment.url}/projects`;
  private  getProjectsByUserIdUrl = `${environment.url}/projects/user`;
  private createProjectUrl = `${environment.url}/project`;

  constructor(private http: HttpClient,
              private auth: AuthService) {}

  getProjects(): Observable<any> {
     return this.http.get(this.projectsUrl);
  }

  getProjectsByUserId(): Observable<any> {
    const  projects  = this.auth.currentUser.userid;
      return this.http.get(`${this.getProjectsByUserIdUrl}/${projects}`);
  }

  deleteProject(id: Project): Observable<any> {
    return this.http.delete(`${this.projectsUrl}/${id}`);
  }

  create(userId: User, title: Project, description: Project): Observable<any> {
    return this.http.post(this.createProjectUrl, {userId, title, description});
  }

  edit(id: Project, title: Project, description: Project): Observable<any> {
    return this.http.put(`${this.projectsUrl}/${id}`, {title, description});
  }
}

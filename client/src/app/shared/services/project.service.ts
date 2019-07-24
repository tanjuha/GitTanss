import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProjectService {

  private getProjectsUrl = `${environment.url}/projects`;
  private deleteProjectUrl = `${environment.url}/projects`;
  private createProjectUrl = `${environment.url}/project`;
  private  updateProjectUrl = `${environment.url}/project/edit`;

  constructor(private http: HttpClient) {}

  getProjects() {
     return this.http.get<any>(this.getProjectsUrl);
  }

  deleteProject(id: any) {
    return this.http.delete<any>(`${this.deleteProjectUrl}/${id}`);
  }

  create(project) {
    return this.http.post<any>(this.createProjectUrl, project);
  }

  update(project, id: any) {
    return this.http.put<any>(`${this.updateProjectUrl}/${id}`, project);
  }
}

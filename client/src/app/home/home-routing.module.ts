import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectComponent} from './project/project.component';
import {HomeComponent} from './home.component';
import {MyProjectsComponent} from './my-projects/my-projects.component';
import {AuthGuard} from '../guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
        {path: 'my-projects', component: MyProjectsComponent},
        {path: 'projects', component: ProjectComponent },
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {}

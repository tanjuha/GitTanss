import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {MyProjectsComponent} from './components/my-projects/my-projects.component';
import {ProjectComponent} from './components/project/project.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NotFoundComponent} from './components/not-found/not-found.component';


const homeRoutes: Routes = [
  { path: 'my-projects', component: MyProjectsComponent},
  { path: 'projects', component: ProjectComponent},
];

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '', component: NavbarComponent, children: homeRoutes, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}

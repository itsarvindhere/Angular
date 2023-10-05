import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

// ROUTES
const routes: Routes = [
  // {path: '', redirectTo: "/users", pathMatch: 'full'},
    {path: '', component: HomeComponent, title: "Home"},
    {path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent, title: "User Details"}
    ], title: "Users"},
    {
      path: 'servers', 
      component: ServersComponent,
      // canActivate: [AuthGuard],
      canActivateChild: [AuthGuard], 
      children: [
      {path: ':id', component: ServerComponent, title: "Server Details"},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard], title: "Edit Server"}
    ],title: "Servers"},
    {path: '**', component: PageNotFoundComponent, title: "404 Page"}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
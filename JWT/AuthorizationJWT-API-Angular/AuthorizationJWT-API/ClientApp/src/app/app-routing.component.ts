import { UserMainComponent } from './user-area/user-main/user-main.component';
import { AdminMainComponent } from './admin-area/admin-main/admin-main.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'sign-up', pathMatch: 'full', component: SignUpComponent },
    { path: 'sign-in', pathMatch: 'full', component: SignInComponent },
    { path: 'admin', pathMatch: 'full', component: AdminMainComponent },
    { path: 'user', pathMatch: 'full', component: UserMainComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
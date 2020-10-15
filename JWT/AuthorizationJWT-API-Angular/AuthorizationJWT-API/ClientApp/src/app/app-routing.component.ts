import { ProductsListComponent } from './admin-area/products/products-list/products-list.component';
import { AddProductComponent } from './admin-area/products/add-product/add-product.component';
import { SignedInGuard } from './guards/signed-in.guard';
import { NotSignedInGuard } from './guards/not-signed-in.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserMainComponent } from './user-area/user-main/user-main.component';
import { AdminMainComponent } from './admin-area/admin-main/admin-main.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'sign-up', pathMatch: 'full', canActivate: [NotSignedInGuard], component: SignUpComponent },
    { path: 'sign-in', pathMatch: 'full', canActivate: [NotSignedInGuard], component: SignInComponent },
    {
        path: 'admin',
        canActivate: [AdminGuard],
        component: AdminMainComponent,
        children: [
            { path: '', pathMatch: 'full', component: ProductsListComponent, canActivate: [AdminGuard] },
            { path: 'add-product', pathMatch: 'full', component: AddProductComponent, canActivate: [AdminGuard] }
        ]
    },
    { path: 'user', pathMatch: 'full', canActivate: [SignedInGuard], component: UserMainComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
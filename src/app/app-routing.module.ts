import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../screens/login/login.component';
import { AlwaysAuthGuard } from './always-auth.guard';
import { NavbarComponent } from '../screens/navbar/navbar.component';
import { UserComponent } from '../screens/user/user.component';
import { ProfileComponent } from '../screens/profile/profile.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'dhagama', component: NavbarComponent,
        children: [
            { path: 'usuarios', component: UserComponent },
            { path: 'perfil', component: ProfileComponent },
        ],
        canActivate: [AlwaysAuthGuard]
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: true
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

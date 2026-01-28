import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { authGuard } from './shared/auth-guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'employee', component: EmployeeComponent, 
        canActivate: [authGuard]
     },
    { path: '', component: HomeComponent },
];

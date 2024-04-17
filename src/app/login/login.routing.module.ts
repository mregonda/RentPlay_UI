import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "../home-page/home-page.component";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {LoginComponent} from "./login.component";

const routes: Routes = [
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule{
}
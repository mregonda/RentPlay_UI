import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {HomePageComponent} from "./home-page/home-page.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import { InstrumentspecificdetailsComponent } from './instrumentspecificdetails/instrumentspecificdetails.component';
import { AdminComponent } from './admin/admin.component';
import {OwnerViewComponent} from "./owner-view/owner-view.component";
import {CartComponent} from "./cart/cart.component";
import { CustomerComponent } from './customer/customer.component';
import {PaymentComponent} from "./payment/payment.component";
import { RequestsComponent } from './requests/requests.component';
import {PayComponent} from "./pay/pay.component";

const routes: Routes = [
  { path:'login',component:LoginComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'home',component:HomePageComponent},
  {path:'instrumentdetail',component:InstrumentspecificdetailsComponent},
  {path:'admin',component:AdminComponent},
  {path: 'owner',component:OwnerViewComponent},
  {path: 'cart',component:CartComponent},
  {path: 'customer',component:CustomerComponent},
  {path: 'payments',component:PaymentComponent},
  {path: 'requests',component:RequestsComponent},
  {path:'pay',component:PayComponent},
  {path:'**',component:HomePageComponent},

    ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }

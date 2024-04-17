import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastContainerModule, ToastrModule} from "ngx-toastr"
import {MatIconModule} from "@angular/material/icon";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MainComponent } from './main/main.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import { OwnerViewComponent } from './owner-view/owner-view.component';
import { InstrumentspecificdetailsComponent } from './instrumentspecificdetails/instrumentspecificdetails.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CustomerComponent } from './customer/customer.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { PaymentComponent } from './payment/payment.component';
import {MatRadioModule} from "@angular/material/radio";
import { RequestsComponent } from './requests/requests.component';
import { PayComponent } from './pay/pay.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    ForgotPasswordComponent,
    MainComponent,
      InstrumentspecificdetailsComponent,
    AdminComponent,
    OwnerViewComponent,
    CartComponent,
    CustomerComponent,
    PaymentComponent,
    RequestsComponent,
    PayComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTabsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 1000,
            positionClass: 'toast-top-right'
        }),
        FormsModule,
        ToastContainerModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSidenavModule,
        SlickCarouselModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

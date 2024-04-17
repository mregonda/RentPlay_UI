import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  answerForm:FormGroup;
  otpForm: FormGroup;
  email: string;
  otp: string;
  sentOTP: string;
  submitted:boolean | false;
  showOtpPrompt: boolean | false;
  otpSent: boolean| false;
  allowEditP: boolean | false;
  password: string;

  constructor(private router:Router, private formBuilder:FormBuilder,private userService:UserService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.answerForm=this.formBuilder.group(
        {
            email:['',Validators.required],
          answer1:['',Validators.required],
          answer2:['',Validators.required]
        }
    );

      this.otpForm=this.formBuilder.group(
          {
              email:['',Validators.required],
              otp:['',Validators.required]
          }
      );
  }

  submit(){
      this.submitted = true
      let data = {
          "email": this.answerForm.controls.email.value,
          "answer1": this.answerForm.controls.answer1.value,
          "answer2": this.answerForm.controls.answer2.value,

      }
      console.log(data)
      this.userService.validateAnswers(data).pipe(catchError((error:HttpErrorResponse)  => {
          // this.isAuthenticated=true;
          console.log(error);
          return throwError('Something Failed');
      }))
          .subscribe(data => {
              console.log(data)
                  if(data.success) {
                      this.toastr.success("You are right!")
                      this.showOtpPrompt = true
                  }
                  else{
                      console.log(data.message);
                      this.toastr.error(data.message);
                  }
              }
          );
  }

    sendOtp(){
      let data = {
          "email": this.email
      }
      console.log(data);
      this.otpSent = true

        this.userService.sendOTP(data).pipe(catchError((error:HttpErrorResponse)  => {
            // this.isAuthenticated=true;
            console.log('SomethingFailed');
            return throwError('Something Failed');
        }))
            .subscribe(data => {
                    console.log(data)
                    if(data.success) {
                        this.otpSent= true
                        this.sentOTP = data.OTP
                        this.toastr.success("OTP sent successfully")
                    }
                    else{
                        this.toastr.error(data.message);
                    }
                }
            );
  }

    validateOtp(){
      console.log(this.otp,this.sentOTP)
      if(this.otp == this.sentOTP){
          this.allowEditP = true
      }
      else {
          console.log("WRONG PASSWORD")
          this.toastr.error("OTP doesn't match")
      }
    }

    resetPassword(){
        let data = {
            "password": this.password,

        }
        console.log(data);
        this.otpSent = true

        this.userService.resetPassword(this.email,data).pipe(catchError((error:HttpErrorResponse)  => {
            // this.isAuthenticated=true;
            console.log('SomethingFailed');
            return throwError('Something Failed');
        }))
            .subscribe(data => {
                    console.log(data)
                    if(data.success) {
                        this.router.navigate(['/login'])
                        this.toastr.success("Password changed successfully")

                    }
                    else{
                        console.log(data.message);
                        this.toastr.error(data.message);
                    }
                }
            );
    }

}

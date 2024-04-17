import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {NavigationExtras, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  signUpForm: FormGroup;
  generatedUserName: string;
  userName: string;
  password: string;
  sSubmitted: boolean | false;
  lSubmitted: boolean | false;
  loginFailedFlag : boolean | false;
  radio:number| 2;
  role:string;

  constructor(public userService:UserService, private router:Router, private formBuilder:FormBuilder,
              private toastr:ToastrService) { }


  ngOnInit(): void {
      this.loginForm=this.formBuilder.group(
          {
            userid:['',Validators.required],
            password:['',Validators.required]
          }
      );

      this.signUpForm=this.formBuilder.group(
          {
              email:['',Validators.required],
              username:[''],
              password:['',Validators.required],
              answer1:['',Validators.required],
              answer2:['',Validators.required],
              radio:['',Validators.required]
          }
      );
  }

  radioChange(){
      console.log(this.signUpForm.controls.radio.value)
  }
  validate(){
      this.lSubmitted=true
      if(this.loginForm.valid)
      {
          let idata = {
              "username":this.loginForm.controls.userid.value,
              "password": this.loginForm.controls.password.value
          }
          this.userService.loginUser(idata).
          pipe(catchError((error:HttpErrorResponse)  => {
             // this.isAuthenticated=true;

              console.log(error);
              this.toastr.error("Authentication failed");
              return throwError('Authentication Failed');
          }))
              .subscribe(
                  data =>
                  {
                      console.log("inside sub");
                      if(data.success)
                      {
                          let navigationExtras: NavigationExtras = {
                              state: {
                                  user: {username:idata.username,
                                  userId:data.userID}
                              },
                          };
                          let user={username:idata.username}
                          localStorage.clear();
                          localStorage.setItem('userId',data.userID);
                          localStorage.setItem('userName',idata.username);
                          localStorage.setItem('role',data.role);
                          this.router.navigateByUrl('/home',navigationExtras);

                          this.toastr.success("Sucessfully logged in")
                       //   this.loginFlag=true;
                      }
                      else
                      {
                          this.toastr.error(data.message);
                        //  this.loginInvalidFlag=true;
                      }
                  }
              );
      }
      else{
         return;
      }
  }

  signup(){
      this.sSubmitted = true;
      if(!this.signUpForm.valid){
          this.toastr.error("Please fill all the details");
          return;
      }
      if(this.signUpForm.controls.password.value.length < 8){
          this.toastr.error("password length is less than 8");
          return;
      }
      let role = 'USER';
      if(this.signUpForm.controls.radio.value == undefined){
          this.toastr.error('Please select whether you are a customer or owner of instruments')
          return
      }
      if(this.signUpForm.controls.radio.value == 1){
          role = 'OWNER'
      }
      let data = {
          "email": this.signUpForm.controls.email.value,
          "username": this.signUpForm.controls.username.value,
          "password": this.signUpForm.controls.password.value,
          "role": role,
          "answer1": this.signUpForm.controls.answer1.value,
          "answer2": this.signUpForm.controls.answer2.value,

      }
      console.log(data)
      this.userService.signUpUser(data).pipe(catchError((error:HttpErrorResponse)  => {
          // this.isAuthenticated=true;
          console.log('Authentication Failed');
          return throwError('Authentication Failed');
      }))
          .subscribe(data => {
              if(data.success) {
                  this.toastr.success(data.message)
                  this.router.navigate(['/login']);
                  this.signUpForm.reset();
              }
              else{
                  this.toastr.error(data.message);
              }
          }
      );
  }

  generateUserName(){
      let email = this.signUpForm.controls.email.value;
      if(email.length == 0){
          console.log(email)
          return;
      }
     this.userService.generateUserName(email).pipe(catchError((error:HttpErrorResponse)  => {
         // this.isAuthenticated=true;
         console.log('Authentication Failed');
         return throwError('Authentication Failed');
     }))
         .subscribe(data => {
             if(data.success){
                 this.generatedUserName = data.generatedUsername;
             }
         });
  }
}

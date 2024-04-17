import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { UserService } from '../user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {Router} from "@angular/router";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
info:any;
status:any;

@ViewChild("demo") demo: ElementRef;

  constructor(private service:UserService, private router:Router) {
    this.service.getadminapproval()
    .subscribe((response:any) => {
      
      this.info=response.Details;
      
      
      
    });}
    clearStatus(){
      
      this.status= " ";
     }

    RejectRequest(){
      console.log(this.demo);
      this.demo.nativeElement.innerText = "Rejected";
      }

      ApproveRequest(data:any){
        let data1 = {
          "id": data,
        }
        
      this.service.postadminapproval(data1).subscribe(
        (specificinstr:any)=>{
          if(specificinstr.success){
          this.demo.nativeElement.innerText = "Approved";
          }
        });
       
        
      }
        
       
     routeToHome(){
      this.router.navigate(['/home'])
     }
      
    }
  
  

  



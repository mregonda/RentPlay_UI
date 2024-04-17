import { Component, OnInit } from '@angular/core';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import {NavigationExtras, Router} from "@angular/router";
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

winfos:any;
cinfos:any;
pinfos:any;
pmsg:any;
user:any;

  constructor(private service:UserService, private toastr:ToastrService) { 
    
    
  }

  ngOnInit(): void {
    console.log(history.state.user.userId)
    this.user=history.state.user.userId
    console.log("user",this.user)
    let data1={
      "userID": this.user
    }
    this.service.waitingorders(data1)
    .subscribe((response:any) => {
      
      this.winfos=response.waitingApprovalInstruments
    
      
    });

    this.service.currentorders(data1)
    .subscribe((response:any) => {
      
      this.cinfos=response.currentInstruments
      
      
      
    });

    this.service.pastorders(data1)
    .subscribe((response:any) => {
      
      this.pinfos=response.pastInstruments
      this.pmsg=response.message
      
      
    });
  }
  
addReview(data1:any,data2:any){
  console.log(data1,data2)
  let val={
    
    "ref_id_owner":null,
    "ref_id_instrument": data1,
    "ref_type": "instrument",
    "reviewComment": data2

  }

  this.service.addReview(val)
    .subscribe((response:any) => {
      
      if (response.success){
        this.toastr.success("Thank you for your review!")
      }
    
      
    });
}

addRating(data1:any,data2:any){
  console.log(data1,data2)
  let val={
    "ref_id_owner":null,
    "ref_id_instrument": data1,
    "ref_type": "instrument",
    "rating": data2

  }

  this.service.addRating(val)
    .subscribe((response:any) => {
      
      if (response.success){
        this.toastr.success("Thank you for adding your rating!")
      }
    
      
    });
}


}

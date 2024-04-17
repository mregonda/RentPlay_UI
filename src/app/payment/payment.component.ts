import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../user.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  transactionId:number;
  sig:string;
  constructor(private router:Router,private toastr:ToastrService,private service:UserService
  ) { }

  ngOnInit(): void {
    if(history.state.transactionId){
      this.transactionId = history.state.transactionId
    }
  }
  routeToHome(){
    if(this.sig==undefined){
      this.toastr.error("Please enter your full name in signature")
      return
    }
    this.toastr.success("Your payment was successful.We'll send you a mail once order is confirmed.")
    this.service.processTransaction(this.transactionId).subscribe(data =>{
      if(data.status){
        this.toastr.success(data.message+"We'll send you a mail once order is confirmed.")
      }
    })


    this.router.navigate(['/home'])
  }


}

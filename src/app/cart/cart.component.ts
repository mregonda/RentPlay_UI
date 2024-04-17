import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart:Map<number,any>;
  cartItems:any[] = [];
  checkedOut:boolean | false;
  promocode:string| '';
  totalPrice:number | 0;
  calPrice:boolean|false;
  bsv:boolean| true;
  fromDate: Date ;
  toDate: Date;
  userId:number;
  transactionId:number;
  showPay:boolean | false;
  constructor(private router:Router,private service:UserService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.cart = new Map();
    if(history.state.cart && history.state.cart.size > 0){
      this.cart = history.state.cart
      this.cart.forEach((value: any, key: number) => {
        console.log(key, value);
        this.cartItems.push(value)
      });
    }
    if(history.state.userId){
      this.userId = parseInt(history.state.userId)
    }
  }

  removeItemfromCart(id:number){
    let index = -1
    for(let i=0;i<this.cartItems.length;i++){
      if(this.cartItems[i].id == id){
        index = i
        break
      }
    }
   // console.log("cart items",this.cartItems)
    this.cartItems.splice(index,1)
    console.log("uc",this.cartItems)
    this.cart.delete(id)
    console.log("ucm",this.cart)
  }

  routeToHome(){
    this.router.navigate(['/home'], {state:{cart:this.cart}});
  }

  checkout(){
    this.checkedOut = true
    this.bsv = false

  }

  calculatePrice(){
    let ids: number[] = []
    this.cartItems.forEach(e=>{
      ids.push(e.id)
    });
    if(this.promocode == undefined){
      this.promocode = ''
    }
    let data = {
      "listOfIDs": ids,
      "couponName": this.promocode
    }
    console.log("inpd",data)
    this.service.calculatePrice(data).subscribe(data =>{
      if(data.success){
        this.totalPrice = data.TotalPrice
        this.calPrice = true
        this.service.getPromoData(this.promocode).subscribe(data =>{
          if(data.success){
            let discount = parseInt((this.totalPrice / 0.9 - this.totalPrice).toString())
            this.toastr.success("You got a discount of $ "+ discount)
          }
        });
      }
    });
  }
  proceed(){
    console.log(this.fromDate,this.toDate)
    if(this.fromDate == undefined || this.toDate == undefined){
      this.toastr.error("Please select from date and to date")
      return
    }
    let ids: number[] = []
    this.cartItems.forEach(e=>{
      ids.push(e.id)
    });
    let fromD = (this.fromDate.getFullYear()+'-'+(this.fromDate.getMonth()+1)+'-'+this.fromDate.getDate()).toString()
    let toD = this.toDate.getFullYear()+'-'+(this.toDate.getMonth()+1)+'-'+this.toDate.getDate()
    console.log('from',fromD)
    console.log('to',toD)
    let data = {
      "listOfIDs": ids,
      "userID": this.userId,
      "totalPrice": this.totalPrice,
      "fromDate": fromD,
      "toDate": toD
    }
    this.service.postTransaction(data).subscribe(data =>{
      if(data.success){
        if(data.message == 'The transaction was added'){
          this.transactionId = data.transactionID
          this.router.navigate(['/payments'],{state:{transactionId:this.transactionId}})
          this.toastr.success(data.message)
        }
        else{
          this.toastr.error('Transaction was not added.Something went wrong.Please try again')
        }
      }

    })


  }

}

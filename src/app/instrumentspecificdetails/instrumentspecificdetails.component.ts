import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UserService} from '../user.service';
import {NavigationExtras, Router} from "@angular/router";

declare const L:any;
@Component({
  selector: 'app-instrumentspecificdetails',
  templateUrl: './instrumentspecificdetails.component.html',
  styleUrls: ['./instrumentspecificdetails.component.css']
})
export class InstrumentspecificdetailsComponent implements OnInit {
  search:any;
  lat:any;
  lng:any;
  la:any;
  cart:Map<number,any>;
  review:any;
  rating:any;
  slideConfig = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1 
  };  

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
  constructor(private service: UserService, private toastr:ToastrService, private router:Router) { 

    
    
  }

  ngOnInit(): void {
        // console.log(history.state);
      this.cart = new Map();
      if(history.state.cart && history.state.cart.size > 0){
          this.cart =  history.state.cart
          /*for(let i =0;i < history.state.cart.length;i++){
              let currentId = history.state.cart[i].id;
              console.log(currentId)
              this.cart.set(currentId,history.state.cart[i].idata)
          }*/
      }
      console.log("Cart history",this.cart)
        this.search=history.state.search;
        
        this.getLocation();
     this.getRating();
     this.getReview();
  }
  
  getRating(){
    let val={
      "instrumentID": this.search.id
    }
    this.service.getRating(val)
    .subscribe((response:any) => {
      
      if (response.success){
        console.log(response.ratings)
        this.rating=response.ratings
      }
    
      
    });

  }
  getReview(){
    let val={
      "instrumentID": this.search.id
    }
    this.service.getReview(val)
    .subscribe((response:any) => {
      
      if (response.success){
        console.log(response.reviews)
        this.review=response.reviews
      }
    
      
    });

  }

  addToCart(){
      /*let navigationExtras: NavigationExtras = {
          state: {
              cart: [{
                  id:this.search.id,
                  idata:this.search
                  }]
          },
      };*/
      let idToAdd = this.search.id;
      let isAdded = false
      for(let entry of this.cart.entries()){
          if (entry[0] == idToAdd){
              isAdded = true
              break
          }
      }
      if (isAdded){
          this.toastr.warning("Instrument already added")
      }
      else{
          this.cart.set(this.search.id,this.search)
      }
      let navigationExtras: NavigationExtras = {
          state: {
              cart: this.cart
          }
      }
      this.router.navigate(['/home'],navigationExtras)
  }

    getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position:any) => {
        if (position) {
          
          this.la=position.coords;
          this.lat = this.search["lat"];
          this.lng = this.search["lon"];
          console.log("hii")
          console.log([this.lat,this.lng])
          console.log("heyy")
          console.log([(this.la.latitude).toString(), (this.la.longitude).toString()])
         
          let map = L.map('map').setView([this.lat,this.lng], 13);
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
        //         var marker = L.marker([this.lat, this.lng]).addTo(map);
        //         marker.bindPopup('Instrument loc').openPopup();
        //  marker.addTo(map); // Adding marker to the map
        //         var marker1 = L.marker([this.la.latitude, this.la.longitude]).addTo(map);
        //         marker1.bindPopup('This is me!').openPopup();
        //  marker1.addTo(map); // Adding marker to the map
        
        var start = [this.la.latitude, this.la.longitude]
        var dest =[this.lat, this.lng]
        L.Routing.control({
          waypoints: [
            L.latLng(start),
            L.latLng(dest)
          ]
        }
        
        
       ).addTo(map);
       var marker = L.marker(start).addTo(map);
       marker.bindPopup('My location').openPopup();
       marker.addTo(map);
               }
      
      

     else {
        alert("Geolocation is not supported by this browser.");
    }
      
});
}
}
}

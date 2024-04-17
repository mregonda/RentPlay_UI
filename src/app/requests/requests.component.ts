
import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import {UserService} from "../user.service";
declare const L:any;
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {


  lat:any;
  lng:any;
  la:any;
  instrument:any;
  details:any;
  constructor(private service:UserService, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    
     this.instrument=history.state.instrument.id;
     console.log(this.instrument,"this is an instrument")
     let val={
      "instrumentID":this.instrument
     }
     this.service.getCustomerRequest(val)
        .subscribe((response:any) => {
          console.log(response.customerInfo,"This is customer info")
          if (response.success){
          this.details= response.customerInfo
          this.getLocation();
        }
      else{
        this.toastr.error("No Customer requests yet!")
      }
      });
      

  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position:any) => {
        if (position) {
          
          this.la=position.coords;
          console.log(this.details)
          console.log(this.details.lat,"this is latitiude")
          this.lat =  this.details.lat;
          this.lng =  this.details.lon;
          console.log("hii")
          console.log([this.lat,this.lng])
          console.log("heyy")
          console.log([(this.la.latitude).toString(), (this.la.longitude).toString()])
         
          let map = L.map('map').setView([this.lat,this.lng], 13);
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
       
        
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

import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavigationExtras,Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../user.service";
declare const L:any;
@Component({
  selector: 'app-owner-view',
  templateUrl: './owner-view.component.html',
  styleUrls: ['./owner-view.component.css']
})
export class OwnerViewComponent implements OnInit {
  instrForm:FormGroup;
  submitted:boolean|false;
  images: string[] = [];
  video: string[] = [];
  userId:number;
  ownerId:number;
  search:any;
  lat:any;
  lng:any;
  la:any;
  lat1:any;
  lng1:any;
  instrname:any;
  @ViewChild("request") request: ElementRef;
pinfos:any;
  constructor(private router:Router,private formBuilder:FormBuilder,private toastr:ToastrService,private  service:UserService) { 
  }
  ngOnInit(): void {
    
      this.getLocation()
      this.getsecLocation()
      console.log(history.state)
      if(history.state.user){
          this.userId = history.state.user.userId
      }
      console.log(this.userId)
      this.getOwnerId();
    this.instrForm=this.formBuilder.group(
        {
          name:['',Validators.required],
           category:['',Validators.required],
            price:['',Validators.required],
            age:['',Validators.required],
            brand:['',Validators.required],
        }
    );
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position:any) => {
        if (position) {
          
          this.la=position.coords;
          
          this.lat =  "39.178885";
          this.lng =  "-86.519750";
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
              
      
      
// // for map2
//           this.lat1 =  "39.173241";
//           this.lng1 =  "-86.5248698";
//           let map2 = L.map('map2').setView([this.lat1,this.lng1], 13);
//           L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                     maxZoom: 19,
//                     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                 }).addTo(map2);

            }
     else {
        alert("Geolocation is not supported by this browser.");
    }
      
});
}
}

getsecLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position:any) => {
        if (position) {
          
          this.la=position.coords;
          
          this.lat1 =  "39.173241";
          this.lng1 =  "-86.5248698";
          console.log("hii")
          console.log([this.lat,this.lng])
          console.log("heyy")
          console.log([(this.la.latitude).toString(), (this.la.longitude).toString()])
         
          let map2 = L.map('map2').setView([this.lat1,this.lng1], 13);
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map2);
       
        
        var start = [this.la.latitude, this.la.longitude]
        var dest =[this.lat1, this.lng1]
        L.Routing.control({
          waypoints: [
            L.latLng(start),
            L.latLng(dest)
          ]
        }
        
        
       ).addTo(map2);
       var marker = L.marker(start).addTo(map2);
       marker.bindPopup('My location').openPopup();
       marker.addTo(map2);
              
      

            }
     else {
        alert("Geolocation is not supported by this browser.");
    }
      
});
}
}


  getOwnerId(){
      this.service.getOwnerId(this.userId).subscribe(data =>{
          if(data.success){
              this.ownerId = data.instrumentOwnerID
              this.getPastInstruments();
          }
          else{
              this.toastr.error("Sorry, something went wrong.Please signup")
              this.router.navigate(['/login']);
          }
      });
  }


  getMediaLink(event:any,type:string) {
      if (event.target.files[0]) {
              let image = event.target.files[0]
              this.uploadMedia(image,type);
      }
  }

  uploadMedia(file:any,type:string){
      console.log('in up m')
      const formData = new FormData();
      formData.append('mediaFile',file);
      let mediaLink = ''
      /*const response = new Observable(observer =>{
          setTimeout(() => {
              observer.next(this.service.uploadMedia(formData));
              observer.complete();
          },3000);

      });*/
      this.service.uploadMedia(formData).subscribe(data =>{
          console.log(data)
          if(data.result == 'File uploaded'){
              this.toastr.success('Uploaded successfully')
              mediaLink = data.mediaLink
              if(type == 'IMAGE'){
                  this.images.push(mediaLink)
              }
              else {
                  this.video.push(mediaLink)
              }
          }
      });
     // return this.service.uploadMedia(formData).toPromise() ;
      //return response;
  }

  getVideo(event:any){
      this.video  = event.target.files[0]
  }

    routeToHome(){
      this.router.navigate(['/home'])
    }
  uploadInstrument(){
      this.submitted=true
      if(!this.instrForm.valid)
      {
          this.toastr.error('Please fill all the required details');
          return
      }
      if(this.images.length == 0){
          this.toastr.error('Upload atleast one image');
          return
      }
      if(this.video.length == 0){
          this.toastr.error('Video required!! Upload video');
          return
      }
      let mediaLinks:any[]=[]
      for(let i=0;i<this.images.length;i++){
          mediaLinks.push({
              "mediaLink": this.images[i],
              "mediaType": 'image'
          })
      }
      for(let i=0;i<this.video.length;i++){
          mediaLinks.push({
              "mediaLink": this.video[i],
              "mediaType": 'video'
          })
      }
      let data = {
          "instrumentOwnerID":this.ownerId,
          "instrumentName":this.instrForm.controls.name.value,
          "instrumentCategory":this.instrForm.controls.category.value,
          "brandName":this.instrForm.controls.brand.value,
          "price":parseInt(this.instrForm.controls.price.value),
          "age":parseInt(this.instrForm.controls.age.value),
          "isAvailable":true,
          "mediaLinks":mediaLinks
      }
      console.log(data)
      this.service.postInstrument(data).subscribe(data =>{
          if(data.success){
              this.toastr.success('Posted instrument successfully')
              this.instrForm.reset();
              this.images=[]
              this.video = []
              this.submitted = false
          }
          else{
              this.toastr.error('Something went wrong')
          }
      })

  }


  getPastInstruments(){
      let data = {
          'ownerID': this.ownerId
      }
      console.log(data)
      this.service.getPastInstrumentsForOwner(data).subscribe(data =>{
          console.log(data)
          if(data.success){
              this.search = data.instruments;
          }
      });
  }


customerRequest(data:any){
    
    let navigationExtras: NavigationExtras = {
        state: {
            instrument: {
                id: data
            }
        },
    };

    this.router.navigate(['/requests'],navigationExtras)
   }

    // this.request.nativeElement.innerText = "Customer Name: Cole Metzger";
}



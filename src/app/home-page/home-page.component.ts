import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UserService} from '../user.service';
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {NavigationExtras, Router} from "@angular/router";
import {ActivatedRoute} from '@angular/router';

declare const L:any;


interface Filters {
    value: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {


  // constructor(private toastr:ToastrService) { }

  lat:any;
  lng:any;
  username:any;
  loggedIn:boolean| false;
  selectedFilter: string;
  selectedSubFilter: string;
  search:any;
  resultLength:number;
  isOwner:boolean|false;
  isAdmin:boolean|false;
  userId:any;
  cart:Map<number, any>;

  //categories: ['brass','string', 'woodwind', 'percussion'];
  //brands: ['Bach','Stentor','Getzen','Yamaha','Meinl','Eastman Strings','Camac','Jupiter','Lorée'];
  filterTypes:Filters[]= [{value:'Category'},
      {value:'Ratings'},{value:'Brands'},{value:'Instrument'},{value:'Price'},{value:'Age'}];
  //price:['0-20','20-40','40-60','60-80','80-100'];
  //ratings:['1-5','2-5','3-5','4-5'];
  //age:['1-10','10-20','20-30','30-40']
  //Instruments:['trumpet','violin','trombone','flute','tambourine','tuba','viola','cello','harp','piccolo', 'oboe', 'clarinet']
  subfilters:any| [];
    price:Filters[]= [{value:'0-20'},
        {value:'20-40'},{value:'40-60'},{value:'60-80'},{value:'80-100'}];
    brands:Filters[]=[{value:'Bach'},
        {value:'Stentor'},{value:'Getzen'},{value:'Yamaha'},{value:'Meinl'},{value:'Eastman Strings'},{value:'Camac'},{value:'Jupiter'},{value:'Lorée'}];
    categories:Filters[]= [{value:'brass'},
        {value:'string'},{value:'woodwind'},{value:'percussion'}];
    ratings:Filters[]= [{value:'1-5'},
        {value:'2-5'},{value:'3-5'},{value:'4-5'}];
    age:Filters[]= [{value:'0-1'},
        {value:'1-2'},{value:'2-3'},{value:'3-4'},{value:'4-5'}];
    instruments:Filters[]=[{value:'trumpet'},
        {value:'violin'},{value:'trombone'},{value:'flute'},{value:'tambourine'},{value:'tuba'},{value:'cello'},{value:'harp'},{value:'piccolo'},{value:'oboe'},{value:'clarinet'}];

  
  constructor(private service: UserService, private toastr:ToastrService , private router:Router,private route: ActivatedRoute) {
      this.service.Search()
        .subscribe((response:any) => {
          console.warn("data",response);
          this.search=response.instruments;
          console.log(response)
            this.resultLength = this.search.length
          console.warn(this.search);
        });
      }

    ngOnInit(): void {
        //console.log(this.location.getState())
        console.log("state",history.state)
     /* if(history.state.user){
          this.loggedIn = true
          this.username =history.state.user.username;
          this.userId = history.state.user.userId
      }
      */
        this.cart = new Map();
        if(history.state.cart && history.state.cart.size > 0){
            this.cart = history.state.cart
        }
        console.log("cart",this.cart)
        if(localStorage.getItem('userId') && localStorage.getItem('userName')){
            if(localStorage.getItem('userId') == undefined || localStorage.getItem('userId') == null){
                this.router.navigate(['/login'])
            }
            this.loggedIn = true
            this.username =localStorage.getItem('userName');
            this.userId = localStorage.getItem('userId');
            let role = localStorage.getItem('role');
            if(role == 'OWNER'){
                this.isOwner = true
            }
            if(role == 'ADMIN'){
                this.isAdmin = true
            }
        }
     // console.log('w')
        //console.log(this.router.getCurrentNavigation()?.extras.state)
        /*if (this.router.getCurrentNavigation()?.extras.state) {
            let user = this.router.getCurrentNavigation()?.extras.state;
            console.log(user);
        }*/
        
    }

    routeToOwner(){
        let navigationExtras: NavigationExtras = {
            state: {
                user: {
                    userId:this.userId}
            },
        };
        this.router.navigate(['/owner'],navigationExtras)
    }

    routeToCustomer(){
        let navigationExtras: NavigationExtras = {
            state: {
                user: {
                    userId:this.userId}
            },
        };
        this.router.navigate(['/customer'],navigationExtras)
    }

    routeToAdmin(){
        
        this.router.navigate(['/admin'])
    }

logout(){
    this.loggedIn=false
}

  postSearch(data:any){
        let data1 = {
          "instrument": data,
        }
      this.service.checkInstrument(data1).subscribe(
        (response:any)=>{
          if(response.success){
        this.search= response.instruments}
        
        });
        }
    
    instrumentlist = ["cello","clarinet","flute","harp","oboe","piccolo","tambourine","trombone","trumpet","tuba","viola","violin"];
    searchTerm: string='';
    values: any[]=[];
    

      autocomplete(){
        if(this.searchTerm && this.searchTerm!=''){
          let _term = this.searchTerm.toLowerCase();
          this.values= this.instrumentlist.filter(
            (el:any)=>{
              return el.toLowerCase().startsWith(_term.toLowerCase());
            }
          );
        }
        else{
          this.values=[];
        }
      
      }
      selectSearch(name:string) {
        this.searchTerm = name;
        this.values = [];
    }


    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position) {
                    console.log("Latitude: " + position.coords.latitude +
                        "Longitude: " + position.coords.longitude);
                    // this.lat = position.coords.latitude;
                    // this.lng = position.coords.longitude;
                    // console.log(this.lat);
                    // console.log(this.lat);

                    [this.lat, this.lng] = this.search[0]["Location"];
                    let map = L.map('map').setView([this.lat, this.lng], 13);
                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);
                    var marker = L.marker([this.lat, this.lng]).addTo(map);
                }

            });

        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

// getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//             if (position) {
//                 console.log("Latitude: " + position.coords.latitude +
//                     "Longitude: " + position.coords.longitude);
//                 // this.lat = position.coords.latitude;
//                 // this.lng = position.coords.longitude;
//                 // console.log(this.lat);
//                 // console.log(this.lat);

//                 [this.lat, this.lng] = [this.search[0]["lat"],this.search[0]["lon"]];
//                 let map = L.map('map').setView([this.lat, this.lng], 13);

//                 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

//                 var marker = L.marker([this.lat, this.lng]).addTo(map);
//             }

//         });

//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }


    
   
    getSubFilters(){
      console.log(this.selectedFilter);
      if(this.selectedFilter == 'Price'){
          this.subfilters = this.price
      }
    if(this.selectedFilter == 'Brands'){
        this.subfilters = this.brands
    }
    if(this.selectedFilter == 'Category'){
        this.subfilters = this.categories
    }
    if(this.selectedFilter == 'Ratings'){
        this.subfilters = this.ratings
    }
    if(this.selectedFilter == 'Age'){
        this.subfilters = this.age
    }
    if(this.selectedFilter == 'Instrument'){
        this.subfilters = this.instruments
    }
}



    filterInstruments(){
          console.log(this.selectedSubFilter)
          let data = {
              "instrumentName": "",
              "instrumentCategory": "",
              "brandName": "",
              "priceRange": "",
              "ageRange": "",
              "ratingsRange": "",
              "distanceRange": ""
          }
        if(this.selectedFilter == 'Price'){
            data['priceRange'] = this.selectedSubFilter
        }
        if(this.selectedFilter == 'Brands'){
            data['brandName'] = this.selectedSubFilter
        }
        if(this.selectedFilter == 'Category'){
            data['instrumentCategory'] = this.selectedSubFilter
        }
        if(this.selectedFilter == 'Ratings'){
            data['ratingsRange'] = this.selectedSubFilter
        }
        if(this.selectedFilter == 'Age'){
            data['ageRange'] = this.selectedSubFilter
        }
        if(this.selectedFilter == 'Instrument'){
            data['instrumentName'] = this.selectedSubFilter
        }
        console.log(data)
        this.service.filterInstrument(data).
        pipe(catchError((error:HttpErrorResponse)  => {
            // this.isAuthenticated=true;

            console.log(error);
            this.toastr.error("Authentication failed");
            return throwError('Authentication Failed');
        })).subscribe(

                data =>
                {
                    console.log(data)
                    if(data.success)
                    {
                      this.search= data.instruments;
                    }
                    else
                    {
                        this.toastr.error(data.message);
                    }
                }
            );
    }

    instrumentDetail(data:any) {
        let data1 = {
          "instrumentID": data,
        }
        
      this.service.checkSpecificInstrument(data1).subscribe(
        (specificinstr:any)=>{
          if(specificinstr.success){
            this.search= (specificinstr.instrumentDetails)
            this.router.navigate(['/instrumentdetail'],{state:{
                search:this.search,cart:this.cart}});
        }});
      }

    routeToCart(){
          this.router.navigate(['/cart'], {state:{cart:this.cart,
              userId:this.userId}});
    }

      
  }
    




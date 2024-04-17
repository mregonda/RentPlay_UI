import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl="https://flask-rentalservice.herokuapp.com"
    constructor(private http:HttpClient,private router:Router) {}

    public generateUserName(email:string):Observable<any> {
            console.log("service class");
            let url=this.baseUrl+"/generateUsername/";
            console.log("ths url is: "+url);
            return this.http.get(url+email);
        }

    public signUpUser(data:object):Observable<any> {
        let url = this.baseUrl + "/register"
        return this.http.post(url,data);
    }

    public loginUser(data:object):Observable<any> {
        let url = this.baseUrl + "/login"
        return this.http.post(url,data);
    }

    public validateAnswers(data:object):Observable<any> {
        let url = this.baseUrl + "/checksecurityquestions"
        return this.http.post(url,data);
    }

    public sendOTP(data:object):Observable<any> {
        let url = this.baseUrl + "/sendOTP"
        return this.http.post(url,data);
    }



    public resetPassword(email:string,data:object):Observable<any> {
        let url = this.baseUrl + "/resetpassword/"+ email
        return this.http.post(url,data);
    }

    public Search(){
        return this.http.get(this.baseUrl+"/search");
    }

    public checkInstrument(data:any){
         return this.http.post(this.baseUrl+"/search",data);
     }


     public checkSpecificInstrument(data:any){
        return this.http.post(this.baseUrl+"/getinstrumentdetails",data);
    }

    public filterInstrument(data:any):Observable<any>{
         let url = this.baseUrl + "/filterListing";
         return this.http.post(url,data);
     }

     public getadminapproval(){
        return this.http.get(this.baseUrl+"/adminapprovalstatus");
     }

     public postadminapproval(data:any){
        return this.http.post(this.baseUrl+"/adminapprovalstatus",data);
     }
     public uploadMedia(data:any):Observable<any>{
        let url = this.baseUrl + "/uploadmedia"
         return this.http.post(url,data);
     }

     public postInstrument(data:any):Observable<any>{
        let url = this.baseUrl + "/addinstrument"
         return this.http.post(url,data);
     }

    public getOwnerId(userId:number):Observable<any> {
        let data = {
            "userID":userId
        }
        let url = this.baseUrl + "/getownerid"
        return this.http.post(url,data);
    }

    public getPastInstrumentsForOwner(data:any):Observable<any> {
        let url = this.baseUrl + '/getallownedinstruments';
        return this.http.post(url,data);
    }

    public waitingorders(data:any):Observable<any>{
        let url = this.baseUrl + '/viewinstrumentswaitingapproval';
        return this.http.post(url,data);
    }
    public currentorders(data:any):Observable<any>{
        let url = this.baseUrl + '/viewinstrumentscurrent';
        return this.http.post(url,data);
    }
    public pastorders(data:any):Observable<any>{
        let url = this.baseUrl + '/viewinstrumentspast';
        return this.http.post(url,data);
    }
    public calculatePrice(data:any):Observable<any>{
        let url = this.baseUrl + '/calculatetotalprice';
        return this.http.post(url,data);
    }

    public getPromoData(code:string):Observable<any>{
        let data = {
            "couponName":code
        }
        let url = this.baseUrl + '/getcoupondetails';
        return this.http.post(url,data);
    }

    public postTransaction(data:any):Observable<any>{
        let url = this.baseUrl + '/addrentertransaction';
        return this.http.post(url,data);
    }

    public processTransaction(id:number):Observable<any>{
        let data = {
            "transactionID":id
        }
        let url = this.baseUrl + '/makepayment ';
        return this.http.post(url,data);
    }
  
    public addReview(data:any):Observable<any>{
        let url= this.baseUrl+"/addreview";
        return this.http.post(url,data);
     }

     public addRating(data:any):Observable<any>{
        let url= this.baseUrl+"/addrating";
        return this.http.post(url,data);
     }
     public getReview(data:any):Observable<any>{
        let url= this.baseUrl+"/getinstrumentreviews";
        return this.http.post(url,data);
     }
     public getRating(data:any):Observable<any>{
        let url= this.baseUrl+"/getinstrumentratings";
        return this.http.post(url,data);
     }
     public getCustomerRequest(data:any):Observable<any>{
        let url= this.baseUrl+"/getcustomerrequest";
        return this.http.post(url,data);
     }
}
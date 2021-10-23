import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private token: string;
  private baseUrl = 'https://findfalcone.herokuapp.com';
  public vehicles = new Subject<any>();
  public planets = new Subject<any>();
  public selectedVehicles:any = [];
  public selectedPlanets:any = [];
  public findFalconeResult = new Subject<any>();
  httpError: boolean = false;
  constructor(private http: HttpClient) { 
    this.token = '';
    this.getToken();
  }

  getToken(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }
  
    this.http.post(this.baseUrl+"/token", {}, httpOptions ).pipe(
      catchError((error)=>{
        return throwError("Error");
      })
    ).subscribe((data:any)=>{
      this.token = data.token;
    })
  }

  getPlanets(){
    this.http.get(this.baseUrl+"/planets").pipe(
      catchError((error)=>{
        return throwError("Error");
      })
    ).subscribe((data:any)=>{
      this.planets.next(data);
    })
  }
  
  getVehicles(){
    this.http.get(this.baseUrl+"/vehicles").pipe(
      catchError((error)=>{
        return throwError("Error");
      })
    ).subscribe((data:any)=>{
      this.vehicles.next(data);
    });
  }

  updateVehicle(name:string, currentName:string, vehicleList:any){
    console.log(this.vehicles);
    for( var vehicle of vehicleList){
      if(vehicle.name === name && vehicle.total_no!==0){
        vehicle.total_no --;
      }
      if(vehicle.name === currentName){
        vehicle.total_no++;
      }
    }
    this.vehicles.next(vehicleList);
  }

  updateSelectedVehicles(vehicleList:any){
    this.selectedVehicles = vehicleList;
  }
   
  updateSelectedPlanets(planetsList:any){
    this.selectedPlanets = planetsList;
  }

  getResults(){
    var planets:string[] = [];
    var vechicle:string[] = [];
    for(var x=0; x<this.selectedPlanets.length;x++){
      planets.push(this.selectedPlanets[x].name);
      vechicle.push(this.selectedVehicles[x].name);
    }
    var requestBody = {
      token: this.token, 
      planet_names: planets,
      vehicle_names: vechicle
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      })
    };
    console.log("test");
    this.http.post(this.baseUrl+"/find", requestBody, httpOptions).pipe(
      catchError((error)=>{
        return throwError("Error");
      })
    ).subscribe((data:any)=>{
      this.findFalconeResult.next(data);
    })
  }

}

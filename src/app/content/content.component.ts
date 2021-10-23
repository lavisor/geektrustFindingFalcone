import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'falcone-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  
   public vehicles: any;
   public planets: any;
   public selectedPlanet: any = [];
   public selectedVehice:any = [];
   public selectedTimeTaken: any = [];
   public totalTimeTaken: number = 0;
   public Max_planet_selectedCount: number = 4;
   public isFindFalconEnabled: boolean = false;
   public destination1: string = "destination1";
   public destination2: string = "destination2";
   public destination3: string = "destination3";
   public destination4: string = "destination4";
  constructor(private commonService: CommonService, private router: Router) {
    this.commonService.getPlanets();
    this.commonService.getVehicles();
    this.commonService.vehicles.subscribe( data =>{
      this.vehicles = data;
      for(let vehicle of this.vehicles){
        if(vehicle.isAvailable === false){
          vehicle.isAvailable = false;
        }else{
          vehicle.isAvailable = true;
        }
        
      }
    });

    this.commonService.planets.subscribe( data =>{
      this.planets = data;
      for(let planet of this.planets){
        if(planet.isAvailable === false){
          planet.isAvailable = false;
        }else{
          planet.isAvailable = true;
        }
      }
    });
  }

  ngOnInit(): void {

  }


  updatePlanets(planet:any, index:number){
    this.selectedPlanet[index] = planet;
    if(this.selectedVehice[index]){
      this.selectedTimeTaken[index] = planet.distance/ this.selectedVehice[index].speed;
      this.calculateTotalTime();
    }

    if(this.selectedPlanet.length ==  this.Max_planet_selectedCount && this.selectedVehice.length == this.Max_planet_selectedCount ){
      this.isFindFalconEnabled = true;
    }

    this.commonService.updateSelectedPlanets(this.selectedPlanet);
  }

  updateVehicles(vehicle:any, index:number){
    this.selectedVehice[index] = vehicle;
    if(this.selectedPlanet[index]){
      this.selectedTimeTaken[index] = this.selectedPlanet[index].distance / vehicle.speed;
      this.calculateTotalTime();
    }

    if(this.selectedPlanet.length ==  this.Max_planet_selectedCount && this.selectedVehice.length == this.Max_planet_selectedCount ){
      this.isFindFalconEnabled = true;
    }
    this.commonService.updateSelectedVehicles(this.selectedVehice);
  }

  calculateTotalTime(){
    this.totalTimeTaken  = 0;
    for(var x=0; x < this.selectedTimeTaken.length; x++){
      this.totalTimeTaken += this.selectedTimeTaken[x];
    }
  }

  findFalcone(){
    if(this.isFindFalconEnabled){
      this.commonService.getResults();
      this.router.navigate(['/falconeresult']);
    }
  }

}

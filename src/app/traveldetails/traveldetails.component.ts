import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonService } from '../common.service';
@Component({
  selector: 'falcone-traveldetails',
  templateUrl: './traveldetails.component.html',
  styleUrls: ['./traveldetails.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TraveldetailsComponent implements OnInit {
  @Input() planets: any;
  @Input() vehicles: any;
  @Input() identifier: any;
  @Output() planetEmit = new EventEmitter<any>();
  @Output() vehicleEmit = new EventEmitter<any>();

  private imgSrc = "./../../assets/icons/planets/";
  currentPlanet: any;
  currentVehicle: any ;
  planetControl = new FormControl();
  vehicleControl = new FormControl();
  filteredPlanet: Observable<any[]>;
  previousPlanet: any;
  

  constructor(private commonService:CommonService) { 
    this.commonService.planets.subscribe( data =>{

    });


    this.filteredPlanet = this.planetControl.valueChanges.pipe(
      startWith(''),
      map(value => {
          return this.planets.filter((option:any) => 
            option.name?.toLowerCase().includes(typeof(value) == "string" ? value.toLowerCase() : value.name.toLowerCase()));
      })
      );

      this.commonService.vehicles.subscribe( data =>{
        this.vehicles = data;
      });
  }

  ngOnInit(): void {

  }

  getPlanetName(planet: any){
    return planet ? planet.name: undefined;
  }

  getVehicleName(vechicle: any){
    return vechicle ? vechicle.name: undefined;
  }

  getImage(name: string){
    return this.imgSrc + name+".ico";
  }

  onPlanetChanged(event:any){
    console.log(event.option.value);
    for(var planet of this.planets){
      if(planet.name == event.option.value.name){
        planet.isAvailable = false;
        event.option.value.isAvailable = false;
      }
      if(planet.name == this.previousPlanet?.name){
        planet.isAvailable = true;
      }
    }

    this.planetEmit.emit(event.option.value);
    this.previousPlanet = event.option.value;
  }

  onVehicleChanged(event:any){
    if(event.value.total_no === 0){
      event.preventDefault();
    }
    console.log(this.currentVehicle);
    this.commonService.updateVehicle(event.value.name,this.currentVehicle?.name , this.vehicles);
    this.vehicleEmit.emit(event.value);
  }
}

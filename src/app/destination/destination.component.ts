import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'falcone-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {
  @Input() destinations: any;
  @Input() vehicles: any;
  @Input() identifier: any;

  @Output() currentPlanet: any = new EventEmitter<string>();;
  @Output() currentVehicle: any = new EventEmitter<string>();;

  isExpanded: boolean = true;
  choosenPlanet: any;
  choosenVehicle: any;
  distance: number = 0;
  time: number = 0;
  baseUrl: string = '';
  imgUrl: string = '';
  showImg: boolean = false;
  destinationLabel: string = "Destination";
  planetLabel: string = "Choose planet";

  constructor() {
   this.baseUrl = '../../assets/images/planets/';
   }

  getPlanetFromChild(planet:any){
    this.choosenPlanet = planet;
    this.currentPlanet.emit(planet);
    this.getImgForPlanet();
  }

  getVehicleFromChild(vehicle:any){
    this.choosenVehicle = vehicle;
    this.currentVehicle.emit(vehicle);
  }

  getImgForPlanet(){
    if(this.choosenPlanet){
      this.imgUrl = "url("+this.baseUrl + this.choosenPlanet.name + ".png)";
      this.showImg = true;
    }
  }

  ngOnInit(): void {
    console.log(this.destinations);
    console.log(this.vehicles);
  }

}

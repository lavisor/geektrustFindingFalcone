import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-falcone-result',
  templateUrl: './falcone-result.component.html',
  styleUrls: ['./falcone-result.component.scss']
})
export class FalconeResultComponent implements OnInit {

  public falconeResult: any;
  public planetFoundIn: string = '';
  public resultContent: string = "Please go back and select planets.";
  public btnText: string = "Go Back";
  public resultStatus: boolean = false;
  public loadedResult: boolean = false;
  constructor(private commonService: CommonService, private router: Router) {
   this.commonService.findFalconeResult.subscribe(data => {
      this.falconeResult = data;
      this.loadedResult = true;
      this.planetFoundIn = this.falconeResult.planet_name;
      if(this.falconeResult.status == "success"){
        this.resultContent = "Queen of Falicornia was found in " + this.planetFoundIn + '.';
        this.btnText = "Go Back";
        this.resultStatus = true;
      }else {
        this.resultContent = "Queen of Falicornia was not found in any choosen planets. Would you like to retry?";
        this.btnText = "Retry mission"
        this.resultStatus = false;
      }
    });
    this.resetLoader();
   }


  ngOnInit(): void {

  }

  resetLoader(){
    setTimeout(()=>{
      this.loadedResult = true;
    }, 5000)
  }


  goBack(){
    this.commonService.getPlanets();
    this.commonService.getVehicles();
    this.router.navigate(['/']);
  }

}

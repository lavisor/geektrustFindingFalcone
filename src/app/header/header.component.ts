import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'falcone-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
  }

  goBack(){
    this.commonService.getPlanets();
    this.commonService.getVehicles();
    this.router.navigate(['/']);
  }

  geektrustRedirect(){
    window.open('https://www.geektrust.in/', '_blank');
  }
}

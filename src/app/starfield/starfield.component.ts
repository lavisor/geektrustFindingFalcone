import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { StarFieldOptions } from './../models/starfield-options';

@Component({
  selector: 'falcone-starfield',
  templateUrl: './starfield.component.html',
  styleUrls: ['./starfield.component.scss']
})
export class StarfieldComponent implements AfterViewInit {

  id = "tsparticles";
  particlesOptions = StarFieldOptions;

  constructor() { }

  ngAfterViewInit() {

  }

  particlesLoaded(container: any) {
    console.log(container);
  }

  particlesInit(main: any) {
    console.log(main);
  }

}

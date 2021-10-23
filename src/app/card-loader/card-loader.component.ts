import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'falcone-card-loader',
  templateUrl: './card-loader.component.html',
  styleUrls: ['./card-loader.component.scss']
})
export class CardLoaderComponent implements OnInit {
  @Input() hideExpantion: any;

  destinationLabel: string = "Destination";
  isExpanded: boolean = true;
  constructor() { 
  }

  ngOnInit(): void {
  }

}

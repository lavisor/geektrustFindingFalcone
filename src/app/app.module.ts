import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgParticlesModule } from "ng-particles";

import { MaterialStylesModule } from './material-styles/material-styles.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TraveldetailsComponent } from './traveldetails/traveldetails.component';
import { DestinationComponent } from './destination/destination.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete-custom';
import { StarfieldComponent } from './starfield/starfield.component';
import { FalconeResultComponent } from './falcone-result/falcone-result.component';
import { CardLoaderComponent } from './card-loader/card-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    TraveldetailsComponent,
    DestinationComponent,
    StarfieldComponent,
    FalconeResultComponent,
    CardLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialStylesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutocompleteLibModule,
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

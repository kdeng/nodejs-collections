import { AppRouterModule } from './app-routing.module';
import { RouterLinkStubDirective, RouterOutletStubComponent} from './router-subs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { D3Service } from 'd3-ng2-service';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { HomeComponent } from "./components/home/home.component";
import { BarChartComponent } from './components/bar-chart/bar-chart.component'; // <-- import statement

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PieChartComponent,
    RouterOutletStubComponent,
    RouterLinkStubDirective,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouterModule
  ],
  providers: [
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { HomeComponent } from "./components/home/home.component";
import { BarChartComponent } from "./components/bar-chart/bar-chart.component";


const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent
  },
  {
    path: 'pie-chart',
    component: PieChartComponent
  },
  {
    path: 'stacked-bar-chart',
    component: BarChartComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouterModule {
}

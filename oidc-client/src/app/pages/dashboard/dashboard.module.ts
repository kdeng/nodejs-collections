import { NgModule } from '@angular/core';
import { routing } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from "@angular/common";


@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {}

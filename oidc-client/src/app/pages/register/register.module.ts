import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './register.routing';
import { RegisterComponent } from './register.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        routing
    ],
    declarations: [
        RegisterComponent
    ]
})
export class RegisterModule {
}

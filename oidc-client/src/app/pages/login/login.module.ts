import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './login.routing';
import { LoginComponent } from './login.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        routing
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {
}

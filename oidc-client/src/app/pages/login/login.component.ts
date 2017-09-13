import { Component, Inject, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(@Inject('ENV') private enviornment) {
        // blank constructor
    }

    ngOnInit(): void {
        console.log('ngOnInit::LoginComponent');
    }

    doStuffLogin(): void {

    }

}

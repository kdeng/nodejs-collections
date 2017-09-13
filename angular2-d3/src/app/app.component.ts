import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    console.log('AppComponent constructor');
  }

  ngOnInit() {
    console.log('AppComponent ngOnInit');
  }

}

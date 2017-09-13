import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pages',
    template: `
        <div class="ffx-main">
            <div class="ffx-content">
                <router-outlet></router-outlet>
            </div>
        </div>
        <footer class="ffx-footer clearfix">
        </footer>
    `
})
export class PagesComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        console.log('PageComponent::ngOnInit');
    }

}

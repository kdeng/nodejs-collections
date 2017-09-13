import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthService } from './service/auth.service';
import { StuffOIDCServiceService } from './service/stuff-oidc.service';
import { routing } from './app.routing';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        PagesModule,
        HttpModule,
        routing
    ],
    providers: [
        AuthService,
        StuffOIDCServiceService,
        {
            provide: 'ENV',
            useValue: environment
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

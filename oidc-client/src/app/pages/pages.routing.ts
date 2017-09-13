import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';


// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: 'app/pages/login/login.module#LoginModule'
    },
    {
        path: 'register',
        loadChildren: 'app/pages/register/register.module#RegisterModule'
    },
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

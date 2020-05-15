import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AdditionalChartsComponent } from './additional-charts/additional-charts.component';

const routes: Routes = [
    {
        path: 'charts',
        component: AdditionalChartsComponent
    },
    {
        path: '**',
        component: HomePageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule { }

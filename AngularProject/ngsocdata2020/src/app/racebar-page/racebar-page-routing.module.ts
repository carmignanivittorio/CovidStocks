import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RacebarPageComponent } from './racebar-page/racebar-page.component';

const routes: Routes = [
    {
        path: '**',
        component: RacebarPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RacebarPageRoutingModule { }

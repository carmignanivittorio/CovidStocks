import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartitionedPageComponent } from './partitioned-page/partitioned-page.component';

const routes: Routes = [
    {
        path: '**',
        component: PartitionedPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartitionedPageRoutingModule { }

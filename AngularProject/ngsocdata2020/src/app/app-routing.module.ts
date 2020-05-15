import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'markets',
    loadChildren: () => import('./racebar-page/racebar-page.module')
      .then(mod => mod.RacebarPageModule)
  },
  {
    path: 'world',
    loadChildren: () => import('./partitioned-page/partitioned-page.module')
      .then(mod => mod.PartitionedPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home-page/home-page.module')
      .then(mod => mod.HomePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

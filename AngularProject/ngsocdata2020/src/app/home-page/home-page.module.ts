import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PartitionedPageModule } from '../partitioned-page/partitioned-page.module';
import { AdditionalChartsComponent } from './additional-charts/additional-charts.component';
import { RacebarPageModule } from '../racebar-page/racebar-page.module';



@NgModule({
  declarations: [HomePageComponent, AdditionalChartsComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    NgbModule,
    HttpClientModule,
    PartitionedPageModule,
    RacebarPageModule
  ]
})
export class HomePageModule { }

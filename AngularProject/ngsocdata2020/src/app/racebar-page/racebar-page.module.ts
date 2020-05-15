import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacebarPageComponent } from './racebar-page/racebar-page.component';
import { RacebarPageRoutingModule } from './racebar-page-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [RacebarPageComponent],
  imports: [
    CommonModule,
    RacebarPageRoutingModule,
    HttpClientModule
  ],
  exports: [
    RacebarPageComponent
  ]
})
export class RacebarPageModule { }

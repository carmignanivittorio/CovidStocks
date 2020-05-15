import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartitionedPageComponent } from './partitioned-page/partitioned-page.component';
import { PartitionedPageRoutingModule } from './partitioned-page-routing.module';
import { ChoiceButtonsComponent } from './choice-buttons/choice-buttons.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { CovidStatsComponent } from './covid-stats/covid-stats.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ChartComponent } from './chart/chart.component';
import { StoryDescriptionComponent } from './story-description/story-description.component';
import { EventsComponent } from './events/events.component';
import { ControlsComponent } from './controls/controls.component';
import { Ng5SliderModule } from 'ng5-slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [PartitionedPageComponent, ChoiceButtonsComponent, HeatmapComponent, CovidStatsComponent, TimelineComponent, ChartComponent, StoryDescriptionComponent, EventsComponent, ControlsComponent],
  imports: [
    CommonModule,
    PartitionedPageRoutingModule,
    FormsModule,
    NgbModule,
    Ng5SliderModule,
    FontAwesomeModule,
    HttpClientModule,
    ChartsModule
  ],
  exports: [
    PartitionedPageComponent
  ]
})
export class PartitionedPageModule { }

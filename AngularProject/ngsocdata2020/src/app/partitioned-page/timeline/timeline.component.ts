import { Component, OnInit, Input } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Input()
  public posterDataObj;

  // public value: number = undefined;
  public options: Options = undefined;

  constructor() {
  }

  ngOnInit() {
    // this.value = this.posterDataObj.dateRange[0].getTime();
    this.options = {
      stepsArray: this.posterDataObj.dateRange.map((date: Date) => {
        return { value: date.getTime() };
      }),
      translate: (value: number, label: LabelType): string => {
        return moment(value).format('Do MMM YY');
      }
    };
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { fadeInUpOnEnterAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  animations: [
    fadeInUpOnEnterAnimation(),
    fadeOutUpOnLeaveAnimation()
  ]
})
export class EventsComponent implements OnInit {

  @Input()
  public posterDataObj;

  public eventList = [];

  public beforeStorySelected = undefined;
  public beforeDateSelected = undefined;

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.beforeDateSelected !== this.posterDataObj.dateSelected) {
      if (this.beforeDateSelected === this.posterDataObj.dateSelected - 86400000) {
        this.incrementEventList();
        this.beforeDateSelected = this.posterDataObj.dateSelected;
      } else {
        this.buildEventList();
        this.beforeDateSelected = this.posterDataObj.dateSelected;
        this.beforeStorySelected = this.posterDataObj.storySelected;
      }
    } else if (this.beforeStorySelected !== this.posterDataObj.storySelected) {
      this.buildEventList();
      this.beforeStorySelected = this.posterDataObj.storySelected;

    }
  }

  buildEventList() {
    const eventList = [];
    const currentDateIndex = this.posterDataObj.dateRangeInts.findIndex(x => x === this.posterDataObj.dateSelected);
    let eventsLeft = 2;
    for (let previousDateIndex = currentDateIndex ; (previousDateIndex > 0) && (eventsLeft > 0) ; previousDateIndex--) {
      const dateInQuestion = this.posterDataObj.dateRangeInts[previousDateIndex];
      if (this.posterDataObj.eventData[this.posterDataObj.storySelected][dateInQuestion] !== undefined) {
        eventList.push(this.posterDataObj.eventData[this.posterDataObj.storySelected][dateInQuestion]);
        eventsLeft -= 1;
      }
    }

    this.eventList = eventList;
  }

  incrementEventList() {
    if (this.posterDataObj.eventData[this.posterDataObj.storySelected][this.posterDataObj.dateSelected]) {
      if (this.eventList.length >= 2) {
        this.eventList.shift();
      }
      this.eventList.push(this.posterDataObj.eventData[this.posterDataObj.storySelected][this.posterDataObj.dateSelected]);
    }
  }

}

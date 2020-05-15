import { Component, OnInit, Input } from '@angular/core';
import { faPlay, faStepBackward, faFastBackward, faPause } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  @Input()
  public posterDataObj;

  public faPlay = faPlay;
  public faStepBackward = faStepBackward;
  public faFastBackward = faFastBackward;
  public faPause = faPause;

  public currentIndex = 0;
  public maxIndex;

  public playing = false;
  public stopped = false;

  constructor() { }

  ngOnInit() {
    this.maxIndex = this.posterDataObj.dateRangeInts.length - 1;
  }

  public playForward() {
    setTimeout(() => {
      if (this.stopped) {
        return;
      } else if (this.currentIndex === (this.maxIndex - 1)) {
        return;
      } else {
        this.currentIndex += 1;
        this.posterDataObj.dateSelected = this.posterDataObj.dateRangeInts[this.currentIndex];
        this.playForward();
      }

    }, 300);
  }

  public findCurrentIndex() {
    this.currentIndex = this.posterDataObj.dateRangeInts.findIndex(x => x === this.posterDataObj.dateSelected);
  }

  public clickPlay() {
    if (this.playing) {
      this.stopped = true;
      this.playing = false;
    } else {
      this.stopped = false;
      this.findCurrentIndex();
      this.playForward();
      this.playing = true;
    }
  }

  public clickOneBefore() {
    this.stopped = true;
    this.playing = false;
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.posterDataObj.dateSelected = this.posterDataObj.dateRangeInts[this.currentIndex];
    }
  }

  public clickStart() {
    this.stopped = true;
    this.playing = false;
    this.currentIndex = 0;
    this.posterDataObj.dateSelected = this.posterDataObj.dateRangeInts[this.currentIndex];
  }

}

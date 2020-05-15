import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story-description',
  templateUrl: './story-description.component.html',
  styleUrls: ['./story-description.component.css']
})
export class StoryDescriptionComponent implements OnInit {

  @Input()
  public posterDataObj;

  constructor() { }

  ngOnInit() {
  }

}

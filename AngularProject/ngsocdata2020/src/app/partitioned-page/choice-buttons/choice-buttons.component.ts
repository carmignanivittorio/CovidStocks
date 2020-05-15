import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-choice-buttons',
  templateUrl: './choice-buttons.component.html',
  styleUrls: ['./choice-buttons.component.css']
})
export class ChoiceButtonsComponent implements OnInit {

  @Input()
  public posterDataObj;

  constructor() { }

  ngOnInit() {
  }

}

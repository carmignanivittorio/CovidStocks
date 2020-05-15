import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-covid-stats',
  templateUrl: './covid-stats.component.html',
  styleUrls: ['./covid-stats.component.css']
})
export class CovidStatsComponent implements OnInit {

  @Input()
  public posterDataObj;

  public totalCases;
  public totalDeaths;

  public beforeStorySelected = undefined;
  public beforeDateSelected = undefined;

  constructor() { }

  ngOnInit() {}

  ngDoCheck() {
    if ((this.beforeStorySelected !== this.posterDataObj.storySelected) ||
        (this.beforeDateSelected !== this.posterDataObj.dateSelected)) {
          this.calculateTotal();
    }
  }

  calculateTotal() {
    const countryList = this.posterDataObj.story[this.posterDataObj.storySelected].covidCountries;
    this.totalCases = 0;
    this.totalDeaths = 0;
    countryList.forEach(countryName => {
      if (this.posterDataObj.covidData[countryName]) {
        this.totalCases += this.posterDataObj.covidData[countryName][this.posterDataObj.dateSelected].confirmed_cum;
        this.totalDeaths += this.posterDataObj.covidData[countryName][this.posterDataObj.dateSelected].deaths_cum;
      }

    });
    this.beforeStorySelected = this.posterDataObj.storySelected;
    this.beforeDateSelected = this.posterDataObj.dateSelected;
  }

}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input()
  public posterDataObj;


  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    legend: {
      position: 'right',
      fontFamily: 'FranklinGothic',
    },
    animation: {
      duration: 0, // general animation time
    },
    responsiveAnimationDuration: 0, // animation duration after a resize
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month'
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'rgba(255,255,255,1)',
          },
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,255,255,1)',
          },
          ticks: {
            fontColor: 'black',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1578009600000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public beforeStorySelected = undefined;
  public beforeDateSelected = undefined;

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {
    if ((this.beforeStorySelected !== this.posterDataObj.storySelected) ||
      (this.beforeDateSelected !== this.posterDataObj.dateSelected)) {
      this.updateGraph();
    }

    if (this.beforeStorySelected !== this.posterDataObj.storySelected) {
      this.lineChartOptions.annotation.annotations = this.buildAnnotations();
      this.beforeStorySelected = this.posterDataObj.storySelected;
    }
  }

  public updateGraph() {
    if (this.posterDataObj.stockData['Bitcoin/USD']) {
      this.lineChartData = this.buildDatasetToDate();
      this.lineChartLabels = this.buildLabelsToData();
      // this.chart.update();
      this.beforeStorySelected = this.posterDataObj.storySelected;
      this.beforeDateSelected = this.posterDataObj.dateSelected;
    }
  }

  public buildDatasetToDate() {
    // public lineChartData: ChartDataSets[] = [
    //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    //   { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
    // ];
    const lineChartData: ChartDataSets[] = [];
    this.posterDataObj.story[this.posterDataObj.storySelected].stockPicks.forEach(stockPick => {
      const currentData = [];
      for (let index = 0; this.posterDataObj.dateRangeInts[index] <= this.posterDataObj.dateSelected; index++) {
        currentData.push(this.posterDataObj.stockData[stockPick][this.posterDataObj.dateRangeInts[index]].adj_close_norm);
      }
      lineChartData.push({
        data: currentData,
        label: stockPick
      });
    });
    return lineChartData;
  }

  public buildLabelsToData() {
    // public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const lineChartLabels: Label[] = [];
    for (let index = 0; this.posterDataObj.dateRangeInts[index] <= this.posterDataObj.dateSelected; index++) {
      // lineChartLabels.push(moment(this.posterDataObj.dateRangeInts[index]).format('Do MMM YY'));
      lineChartLabels.push(this.posterDataObj.dateRangeInts[index]);
    }
    return lineChartLabels;
  }

  public buildAnnotations() {
    return [];
  //   const annotations = [];
  //   for (const storyKey in this.posterDataObj.eventData[this.posterDataObj.storySelected]) {
  //     annotations.push(this.posterDataObj.eventData[this.posterDataObj.storySelected][storyKey]);
  // }
  //   return annotations;
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }

}

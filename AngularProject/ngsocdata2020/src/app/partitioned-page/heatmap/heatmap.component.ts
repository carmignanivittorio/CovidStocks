import { Component, OnInit, Input, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  @Input()
  public posterDataObj;

  public chartList: am4maps.MapChart[] = [null, null, null];
  public polygonSeriesList = [null, null, null];

  // public chart: am4maps.MapChart = undefined;
  // public polygonSeries;

  public beforeStorySelected = undefined;
  public beforeDateSelected = undefined;

  public chartData = {
    1577836800000: [{
      id: 'US',
      name: 'United States',
      value: 100,
      deaths: 23
    }, {
      id: 'FR',
      name: 'France',
      value: 50,
      deaths: 12
    }],
    1577923200000: [{
      id: 'US',
      name: 'United States',
      value: 200,
      deaths: 123
    }, {
      id: 'FR',
      name: 'France',
      value: 100,
      deaths: 24
    },
    {
      id: 'ES',
      name: 'Spain',
      value: 10000000,
      deaths: 24
    }]
  };

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createChart();
  }

  public buildNewChart(countryCodesIncluded, divname, listIndex) {
    this.zone.runOutsideAngular(() => {
      // Create map instance
      const chart = am4core.create(divname, am4maps.MapChart);

      // Set map definition
      chart.geodata = am4geodata_worldLow;

      // Set projection
      chart.projection = new am4maps.projections.EqualEarth();
      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      polygonSeries.include = countryCodesIncluded;

      // Set min/max fill color for each area
      polygonSeries.heatRules.push({
        property: 'fill',
        target: polygonSeries.mapPolygons.template,
        min: chart.colors.getIndex(1).brighten(1),
        max: chart.colors.getIndex(1).brighten(-0.3)
      });

      // Make map load polygon data (country shapes and names) from GeoJSON
      polygonSeries.useGeodata = true;

      // Set heatmap values for each country
      // polygonSeries.data = this.chartData['1577836800000'];

      // Set up heat legend
      const heatLegend = chart.createChild(am4maps.HeatLegend);
      heatLegend.series = polygonSeries;
      heatLegend.align = 'right';
      heatLegend.valign = 'bottom';
      heatLegend.width = am4core.percent(20);
      heatLegend.marginRight = am4core.percent(4);
      heatLegend.minValue = 0;
      heatLegend.maxValue = 40000000;

      // Set up custom heat map legend labels using axis ranges
      const minRange = heatLegend.valueAxis.axisRanges.create();
      minRange.value = heatLegend.minValue;
      minRange.label.text = 'Less Cases';
      const maxRange = heatLegend.valueAxis.axisRanges.create();
      maxRange.value = heatLegend.maxValue;
      maxRange.label.text = 'More';

      // Blank out internal heat legend value axis labels
      heatLegend.valueAxis.renderer.labels.template.adapter.add('text', function (labelText) {
        return '';
      });

      // Configure series tooltip
      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name} - Cases: {value} Deaths: {deaths}";
      polygonTemplate.nonScalingStroke = true;
      polygonTemplate.strokeWidth = 0.5;

      // Create hover state and set alternative fill color
      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = am4core.color('#3c5bdc');

      this.chartList[listIndex] = chart;
      this.polygonSeriesList[listIndex] = polygonSeries;
    });
  }


  ngAfterViewChecked() {
    if (this.beforeDateSelected !== this.posterDataObj.dateSelected) {
      this.refreshData();
      this.beforeDateSelected = this.posterDataObj.dateSelected;
    } else if (this.beforeStorySelected !== this.posterDataObj.storySelected) {
      if (this.chartList[this.posterDataObj.storySelected] !== null) {
        this.chartList[this.posterDataObj.storySelected].dispose();
        this.chartList[this.posterDataObj.storySelected] = null;
      }
      this.createChart();
      this.refreshData();
      this.beforeStorySelected = this.posterDataObj.storySelected;
    }
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartList[this.posterDataObj.storySelected]) {
        this.chartList[this.posterDataObj.storySelected].dispose();
      }
    });
  }

  public refreshData() {
    this.zone.runOutsideAngular(() => {
      if ((this.posterDataObj.covidHeatmapData) &&
        (this.polygonSeriesList[this.posterDataObj.storySelected])) {
        this.polygonSeriesList[this.posterDataObj.storySelected].data = this.posterDataObj.covidHeatmapData[this.posterDataObj.dateSelected];
      }
    });
  }

  public createChart() {
    if (this.posterDataObj.story[this.posterDataObj.storySelected].heatmapCountries) {
      if (this.chartList[this.posterDataObj.storySelected] === null) {
        this.buildNewChart(this.posterDataObj.story[this.posterDataObj.storySelected].heatmapCountries,
          'chartdiv-' + this.posterDataObj.storySelected.toString(),
          this.posterDataObj.storySelected);
      }
    } else {
      setTimeout(() => {
        this.createChart();
      }, 200);
    }
  }

}

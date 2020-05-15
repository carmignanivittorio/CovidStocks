import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import { HttpClient } from '@angular/common/http';
// import dataJSON from '../../../assets/covid/datacovid_country_date.json';
// import stockJSON from '../../../assets/covid/datastock_country_date.json';

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_material);

@Component({
  selector: 'app-racebar-page',
  templateUrl: './racebar-page.component.html',
  styleUrls: ['./racebar-page.component.css']
})
export class RacebarPageComponent implements OnInit, OnDestroy {

  private dataJSON: any;
  private stockJSON: any;
  private chartCases: am4charts.XYChart;
  private data: any;
  private dates: string[];
  private countries = ['China', 'United_States_of_America', 'Italy', 'Spain', 'Germany', 'France', 'United_Kingdom', 'Japan'];
  private countriesLabels = {
    United_States_of_America: 'USA',
    France: 'France',
    Italy: 'Italy',
    Germany: 'Germany',
    United_Kingdom: 'United Kingdom',
    China: 'China',
    Japan: 'Japan',
    Spain: 'Spain'
  };
  private countryToStock = {
    United_States_of_America: '^GSPC',
    France: '^FCHI',
    Italy: 'FLIY',
    Germany: '^GDAXI',
    United_Kingdom: '^FTSE',
    China: 'FXI',
    Japan: '^N225',
    Spain: '^IBEX'
  };
  private stockMaxValues = {
    United_States_of_America: 0,
    France: 0,
    Italy: 0,
    Germany: 0,
    United_Kingdom: 0,
    China: 0,
    Japan: 0,
    Spain: 0
  };
  private isFinished = false;

  constructor(private http: HttpClient, private zone: NgZone) {

    this.http.get<object>('./assets/covid/datacovid_country_date.json').subscribe(dataCovid => {
      this.dataJSON = dataCovid;
      this.http.get<object>('./assets/covid/datastock_country_date.json').subscribe(dataStock => {
        this.stockJSON = dataStock;
        this.data = this.formatData();
        this.dates = Object.keys(this.data);
        this.createChart();
      });
    });

  }// constructor

  ngOnInit() { }// ngOnInit

  public createChart() {

    this.zone.runOutsideAngular(() => {
      const chartCases = am4core.create('chartdiv', am4charts.XYChart);

      chartCases.padding(40, 40, 40, 40);
      chartCases.fontFamily = 'FranklinGothic';

      chartCases.numberFormatter.bigNumberPrefixes = [
        { number: 1e+3, suffix: 'K' },
        { number: 1e+6, suffix: 'M' },
        { number: 1e+9, suffix: 'B' }
      ];

      chartCases.bottomAxesContainer.layout = 'horizontal';

      const label = chartCases.plotContainer.createChild(am4core.Label);
      label.x = am4core.percent(97);
      label.y = am4core.percent(95);
      label.horizontalCenter = 'right';
      label.verticalCenter = 'middle';
      label.dx = -15;
      label.fontSize = 25;

      const playButton = chartCases.plotContainer.createChild(am4core.PlayButton);
      playButton.x = am4core.percent(97);
      playButton.y = am4core.percent(95);
      playButton.dy = -2;
      playButton.verticalCenter = 'middle';
      playButton.events.on('toggled', (event) => {
        if (event.target.isActive) {
          play();
        } else {
          stop();
        }// if-else
      });

      const stepDuration = 500;

      const categoryAxis = chartCases.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = 'label';
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.disabled = true;

      // cases axis
      const valueAxisCases = chartCases.xAxes.push(new am4charts.ValueAxis());
      valueAxisCases.min = 0;
      valueAxisCases.rangeChangeEasing = am4core.ease.linear;
      valueAxisCases.rangeChangeDuration = stepDuration;
      valueAxisCases.extraMax = 0.1;
      valueAxisCases.title.text = 'Number of cases';
      valueAxisCases.tooltip.disabled = true;
      valueAxisCases.renderer.baseGrid.disabled = true;
      // stock axis
      const valueAxisStocks = chartCases.xAxes.push(new am4charts.ValueAxis());
      valueAxisStocks.min = 0;
      valueAxisStocks.rangeChangeEasing = am4core.ease.linear;
      valueAxisStocks.rangeChangeDuration = stepDuration;
      valueAxisStocks.extraMax = 0.1;
      valueAxisStocks.renderer.inversed = true;
      // valueAxisStocks.renderer.opposite = true;
      valueAxisStocks.title.text = 'Stock value';
      valueAxisStocks.tooltip.disabled = true;
      valueAxisStocks.renderer.baseGrid.disabled = true;

      // cases series
      const seriesCases = chartCases.series.push(new am4charts.ColumnSeries());
      seriesCases.dataFields.categoryY = 'label';
      seriesCases.dataFields.valueX = 'cases';
      seriesCases.xAxis = valueAxisCases;
      seriesCases.name = 'Number of cases';
      seriesCases.tooltipText = '{valueX.value}';
      seriesCases.columns.template.strokeOpacity = 0;
      seriesCases.columns.template.column.minHeight = 35;
      seriesCases.columns.template.column.cornerRadiusBottomRight = 5;
      seriesCases.columns.template.column.cornerRadiusTopRight = 5;
      seriesCases.interpolationDuration = stepDuration;
      seriesCases.interpolationEasing = am4core.ease.linear;
      seriesCases.clustered = false;
      // stock series max
      const seriesStocksMax = chartCases.series.push(new am4charts.ColumnSeries());
      seriesStocksMax.dataFields.categoryY = 'label';
      seriesStocksMax.dataFields.valueX = 'stockMax';
      seriesStocksMax.xAxis = valueAxisStocks;
      // seriesStocksMax.name = 'Stock value';
      seriesStocksMax.tooltipText = '{valueX.value}';
      seriesStocksMax.columns.template.strokeOpacity = 0;
      seriesStocksMax.columns.template.fillOpacity = 0.4;
      seriesStocksMax.columns.template.column.minHeight = 35;
      seriesStocksMax.columns.template.column.cornerRadiusBottomLeft = 5;
      seriesStocksMax.columns.template.column.cornerRadiusTopLeft = 5;
      seriesStocksMax.interpolationDuration = stepDuration;
      seriesStocksMax.interpolationEasing = am4core.ease.linear;
      seriesStocksMax.clustered = false;
      // stock series
      const seriesStocks = chartCases.series.push(new am4charts.ColumnSeries());
      seriesStocks.dataFields.categoryY = 'label';
      seriesStocks.dataFields.valueX = 'stock';
      seriesStocks.xAxis = valueAxisStocks;
      seriesStocks.name = 'Stock value';
      seriesStocks.tooltipText = '{valueX.value}';
      seriesStocks.columns.template.strokeOpacity = 0;
      seriesStocks.columns.template.fillOpacity = 0.7;
      seriesStocks.columns.template.column.minHeight = 35;
      seriesStocks.columns.template.column.cornerRadiusBottomLeft = 5;
      seriesStocks.columns.template.column.cornerRadiusTopLeft = 5;
      seriesStocks.interpolationDuration = stepDuration;
      seriesStocks.interpolationEasing = am4core.ease.linear;
      seriesStocks.clustered = false;

      // cases label
      const labelBulletCases = seriesCases.bullets.push(new am4charts.LabelBullet());
      labelBulletCases.label.horizontalCenter = 'left';
      labelBulletCases.label.text = '{values.valueX.workingValue.formatNumber(\'#.as\')}';
      labelBulletCases.label.textAlign = 'end';
      labelBulletCases.label.dx = +10;
      labelBulletCases.label.truncate = false;
      labelBulletCases.label.hideOversized = false;
      // stock label max
      const labelBulletStocksMax = seriesStocksMax.bullets.push(new am4charts.LabelBullet());
      labelBulletStocksMax.label.horizontalCenter = 'right';
      labelBulletStocksMax.label.text = 'Max\n{values.valueX.workingValue.formatNumber(\'#.00\')}';
      labelBulletStocksMax.label.textAlign = 'end';
      labelBulletStocksMax.label.dx = -10;
      // stock label
      const labelBulletStocks = seriesStocks.bullets.push(new am4charts.LabelBullet());
      labelBulletStocks.label.horizontalCenter = 'left';
      labelBulletStocks.label.text = '{values.valueX.workingValue.formatNumber(\'#.00\')}';
      labelBulletStocks.label.textAlign = 'end';
      labelBulletStocks.label.dx = +10;

      chartCases.zoomOutButton.disabled = true;

      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
      seriesCases.columns.template.adapter.add('fill', (fill, target) => {
        return chartCases.colors.getIndex(target.dataItem.index);
      });
      seriesStocksMax.columns.template.adapter.add('fill', (fill, target) => {
        return chartCases.colors.getIndex(target.dataItem.index);
      });
      seriesStocks.columns.template.adapter.add('fill', (fill, target) => {
        return chartCases.colors.getIndex(target.dataItem.index);
      });

      let dateIndex = 0;
      label.text = this.dates[dateIndex];

      let interval;

      function play() {
        interval = setInterval(() => {
          nextDate();
        }, stepDuration);
        nextDate();
      }// play

      function stop() {
        if (interval) {
          clearInterval(interval);
        }// if
      }// stop

      const nextDate = () => {
        dateIndex++;

        if (dateIndex > this.dates.length - 1) {
          if (this.isFinished) {
            this.isFinished = false;
            dateIndex = 0;
          } else {
            this.isFinished = true;
            stop();
            playButton.isActive = false;
          }// if-else
        }// if

        const newData = this.data[this.dates[dateIndex]];
        let itemsWithNonZero = 0;
        for (let i = 0; i < chartCases.data.length; i++) {
          chartCases.data[i].cases = newData[i].cases;
          chartCases.data[i].stock = newData[i].stock;
          if (chartCases.data[i].cases > 0) {
            itemsWithNonZero++;
          }// if
        }// for

        if (dateIndex === 0) {
          seriesCases.interpolationDuration = stepDuration / 4;
          seriesStocksMax.interpolationDuration = stepDuration / 4;
          seriesStocks.interpolationDuration = stepDuration / 4;
          valueAxisCases.rangeChangeDuration = stepDuration / 4;
          valueAxisStocks.rangeChangeDuration = stepDuration / 4;
        } else {
          seriesCases.interpolationDuration = stepDuration;
          seriesStocksMax.interpolationDuration = stepDuration;
          seriesStocks.interpolationDuration = stepDuration;
          valueAxisCases.rangeChangeDuration = stepDuration;
          valueAxisStocks.rangeChangeDuration = stepDuration;
        }// if-else

        chartCases.invalidateRawData();
        label.text = this.dates[dateIndex];

        categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
      };


      categoryAxis.sortBySeries = seriesCases;

      chartCases.data = this.data[this.dates[dateIndex]];
      categoryAxis.zoom({ start: 0, end: 1 / chartCases.data.length });

      seriesCases.events.on('inited', () => {
        setTimeout(() => {
          playButton.isActive = true; // this starts interval
        }, 2000);
      });
    });

  }// createChart

  ngOnDestroy() {

    this.zone.runOutsideAngular(() => {
      if (this.chartCases) {
        this.chartCases.dispose();
      }
    });

  }// ngOnDestroy

  public formatData() {

    const formatData = {};
    Object.keys(this.dataJSON).forEach(country => {
      if (this.countries.includes(country)) {
        Object.keys(this.dataJSON[country]).forEach(date => {
          if (formatData.hasOwnProperty(date)) {
            formatData[date].push({
              country: country,
              label: this.countriesLabels[country],
              cases: this.dataJSON[country][date].confirmed_cum,
              stock: this.stockJSON[this.countryToStock[country]][date].adj_close_norm,
              stockMax: 1
            });
          } else {
            formatData[date] = [{
              country: country,
              label: this.countriesLabels[country],
              cases: this.dataJSON[country][date].confirmed_cum,
              stock: this.stockJSON[this.countryToStock[country]][date].adj_close_norm,
              stockMax: 1
            }];
          }// if-else
          if (this.stockMaxValues[country] < this.stockJSON[this.countryToStock[country]][date].adj_close_norm) {
            this.stockMaxValues[country] = this.stockJSON[this.countryToStock[country]][date].adj_close_norm;
          }// if
        });
      }// if
    });
    Object.keys(formatData).forEach(date => {
      formatData[date].forEach(country => {
        country.stockMax = this.stockMaxValues[country.country];
      });
      formatData[date].sort(this.compareCountriesByName);
    });

    return formatData;

  }// formatData

  public compareCountriesByName(country1: any, country2: any) {

    if (country1.country > country2.country) {
      return 1;
    }// if
    if (country1.country < country2.country) {
      return -1;
    }// if
    return 0;

  }// compareCountriesByName

}// RacebarPageComponent

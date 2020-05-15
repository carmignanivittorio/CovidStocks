import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// {
//   '^OMX': 'OMX Stockhlom',
//   '^OMXH25': 'OMX Helsinki',
//   '^OSEAX': 'Oslo Børs All-share Index',
//   '^OMXCGI': 'OMX Copenhagen',
//   'FXI': 'iShares China Large-Cap ETF',
//   '^IBEX': 'Bolsa de Madrid 35',
//   'AFK': 'VanEck Vectors Africa ETF',
//   'BTC-USD': 'Bitcoin/USD',
//   'CL=F': 'Oil Crude Jun 2020 Futures',
//   'CNYEUR=X?P=CNYEUR=X': 'CNY/EUR',
//   'CNYUSD=X?P=CNYUSD=X': 'CNY/USD',
//   'FLIY': 'Franklin FTSE Italy ETF',
//   'NQ=F': 'Nasdaq 100 June 2020 Futures',
//   '^DJI': 'Dow Jones Industrial Average',
//   '^FCHI': 'CAC 40 France',
//   '^FTSE': 'FTSE 100 London',
//   '^GDAXI': 'DAX Frankfurt',
//   '^GSPC': 'S&P 500',
//   '^HSI': 'Hang Seng Index Hong Kong',
//   '^N225': 'Nikkei 225 Japan',
//   'ASHR': 'Xtrackers Harvest CSI 300 China A-Shares ETF'
// }

@Component({
  selector: 'app-partitioned-page',
  templateUrl: './partitioned-page.component.html',
  styleUrls: ['./partitioned-page.component.css']
})
export class PartitionedPageComponent implements OnInit {

  public posterDataObj = {
    storySelected: 0,
    dateSelected: 1577836800000,
    dateRangeInts: undefined,
    dateRange: undefined,
    story: [
      {
        title: 'Ripple to Wave',
        decription: [
          'From a weak position in January 2020, CNY sees its European pair gaining significant strength. Ending April 2020, CNY/EUR will be up 92%.',
          'On the contrary CNY/USD sees the USD retaining its dominance. The Chinese Market, through the iShares ETF, contracted by 53%, but shows signs of V-shaped recovery.'
        ],
        covidCountries: [
          'China', 'United_States_of_America', 'Italy'
        ],
        stockPicks: [
          'CNY/EUR', 'CNY/USD', 'iShares China Large-Cap ETF'
        ],
        heatmapCountries: [
          'CN', 'US', 'IT'
        ]
      },
      {
        title: 'Tweet Storm',
        decription: [
          'The US economy was tested to decline from its record high to the lowest values of the last 3 years and sharply regaining 60% of the value lost.',
          'While the populist UK government adopted slower measures, Donald Trump saw his approval ratings hit record highs, giving him a stronger fighting chance for the November 2020 election.'
        ],
        covidCountries: [
          'United_States_of_America', 'United_Kingdom', 'France'
        ],
        stockPicks: [
          'Dow Jones Industrial Average', 'S&P 500', 'FTSE 100 London', "Donald Trump's approval rating"
        ],
        heatmapCountries: [
          'US', 'GB', 'FR'
        ]
      }
      ,
      {
        title: 'Locking Down',
        decription: [
          'The developed Nordic markets would receive a strong blow as different approaches towards country lock down would be adopted.',
          "Denmark, Norway and Finland will enforce strict lockdown rules, contrary to Sweden. The countries will see comparable rates of recovery, with Denmark recovering a whopping 68%, causing disbelief that Sweden's approach was worth the toll."
        ],
        covidCountries: [
          'Sweden', 'Finland', 'Denmark', 'Norway'
        ],
        stockPicks: [
          'OMX Stockhlom', 'OMX Helsinki', 'Oslo Børs All-share Index', 'OMX Copenhagen'
        ],
        heatmapCountries: [
          'SE', 'FI', 'DK', 'NO'
        ]
      }
    ],
    covidData: {
      // format
      // China: {
      //   1577836800000: {
      //     confirmed_cum: 0,
      //     deaths_cum: 0
      //   }
      // },
    },
    stockData: {
      // format
      // AFK: {
      //   1577836800000: {
      //     adj_close_norm: 47
      //   },
      //   1577923200000: {
      //     adj_close_norm: 82
      //   }
      // },
    },
    covidHeatmapData: {
    },
    eventData: {
      0: {
        1577923200000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'doesNotAppearOnGraph',
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Wuhan reports cluster of pneumonias'
          },
          body: 'WHO receives notice',
          date: 'January 1st'
        },
        1578700800000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1578700800000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'First death from COVID-19'
          },
          body: '',
          date: 'January 11th'
        },
        1579564800000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'doesNotAppearOnGraph',
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'First case in US soil'
          },
          body: '',
          date: 'January 21st'
        },
        1579737600000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'doesNotAppearOnGraph',
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Wuhan locks down'
          },
          body: '',
          date: 'January 23rd'
        },
        1581379200000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'doesNotAppearOnGraph',
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Disease named'
          },
          body: 'as COVID-19 by WHO',
          date: 'February 11th'
        },
        1582416000000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'doesNotAppearOnGraph',
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Italy cases surge'
          },
          body: '',
          date: 'February 23rd'
        },
        1582934400000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1582934400000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'First US death'
          },
          body: '',
          date: 'February 29th'
        },
        1583712000000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'doesNotAppearOnGraph',
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Italy on lockdown'
          },
          body: '',
          date: 'March 9th'
        },
        1584057600000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1584057600000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'US in national emergency'
          },
          body: '',
          date: 'March 13th'
        },
        1585267200000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1585267200000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Trump signs stimulus bill'
          },
          body: '',
          date: 'March 27th'
        },
        1586822400000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'doesNotAppearOnGraph',
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Economy slides to contraction'
          },
          body: '',
          date: 'April 14th'
        }
      },
      1: {
        1579564800000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1579564800000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'First case in US soil'
          },
          body: '',
          date: 'January 21st'
        },
        1581379200000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1581379200000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'New Stock Market RECORD'
          },
          body: 'Donald Trump tweets',
          date: 'February 11th'
        },
        1582934400000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1582934400000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'First US death'
          },
          body: '',
          date: 'February 29th'
        },
        1584144000000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1584144000000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'BIGGEST STOCK MARKET RISE IN HISTORY YESTERDAY!'
          },
          body: 'Donald Trump tweets',
          date: 'March 14th'
        },
        1584921600000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1584921600000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'UK locks down'
          },
          body: '',
          date: 'March 23rd'
        },
        1585267200000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1585267200000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Trump signs stimulus bill'
          },
          body: '',
          date: 'March 27th'
        },
        1586131200000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1586131200000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Boris Johnson to ICU'
          },
          body: 'He was sick with COVID-19',
          date: 'April 6th'
        },
        1586822400000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1586822400000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Economy slides to contraction'
          },
          body: '',
          date: 'April 14th'
        }
      },
      2: {
        1580256000000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1580256000000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: '1st case in Finland'
          },
          body: '',
          date: 'January 29th'
        },
        1580428800000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1580428800000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: '1st case in Sweden'
          },
          body: '',
          date: 'January 31st'
        },
        1582761600000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1582761600000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: '1st cases in Denmark, Norway'
          },
          body: '',
          date: 'February 27th'
        },
        1584316800000: {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 1584316800000,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Relaxed measures in DK, NO, FI'
          },
          body: '',
          date: 'March 16th'
        },
      },
      1585180800000: {
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: 1585180800000,
        borderColor: 'red',
        borderWidth: 2,
        label: {
          enabled: true,
          fontColor: 'red',
          content: 'SWE cases increase 13% in one day'
        },
        body: 'The highest one-day increase',
        date: 'March 25th'
      },
      1586908800000: {
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: 1586908800000,
        borderColor: 'red',
        borderWidth: 2,
        label: {
          enabled: true,
          fontColor: 'red',
          content: 'DK, FI, NO gradually relax measures'
        },
        body: '',
        date: 'April 15th'
      },
    },
    countryData: {
      'China': {
        id: 'CN',
        idLower: 'cn',
        name: 'China'
      },
      'United_Kingdom': {
        id: 'GB',
        idLower: 'gb',
        name: 'United Kingdom'
      },
      'United_States_of_America': {
        id: 'US',
        idLower: 'us',
        name: 'United States of America'
      },
      'France': {
        id: 'FR',
        idLower: 'fr',
        name: 'France'
      },
      'Sweden': {
        id: 'SE',
        idLower: 'se',
        name: 'Sweden'
      },
      'Norway': {
        id: 'NO',
        idLower: 'no',
        name: 'Norway'
      },
      'Denmark': {
        id: 'DK',
        idLower: 'dk',
        name: 'Denmark'
      },
      'Finland': {
        id: 'FI',
        idLower: 'fi',
        name: 'Finland'
      },
      'Japan': {
        id: 'JP',
        idLower: 'jp',
        name: 'Japan'
      },
      'Canada': {
        id: 'CA',
        idLower: 'ca',
        name: 'Canada'
      },
      'Italy': {
        id: 'IT',
        idLower: 'it',
        name: 'Italy'
      },
      'Saudi_Arabia': {
        id: 'SA',
        idLower: 'sa',
        name: 'Saudi Arabia'
      },
    }
  };

  constructor(private http: HttpClient) {
    this.http.get('./assets/data/covid.json').subscribe(data => {
      this.posterDataObj.covidData = data;
    });
    this.http.get<object>('./assets/data/stock.json').subscribe(data => {
      this.posterDataObj.stockData = data;
    });
    this.http.get<object>('./assets/data/heatmap.json').subscribe(data => {
      this.posterDataObj.covidHeatmapData = data;
    });

  }

  ngOnInit() {
    this.posterDataObj.dateRange = this.createDateRange();
    this.posterDataObj.dateRangeInts = this.posterDataObj.dateRange.map(date => date.getTime()).sort();
  }

  createDateRange(): Date[] {
    const dates: Date[] = [];
    for (let i = 1; i <= 31; i++) {
      const date = new Date(Date.UTC(2020, 0, i));
      dates.push(date);
    }
    for (let i = 1; i <= 29; i++) {
      const date = new Date(Date.UTC(2020, 1, i));
      dates.push(date);
    }
    for (let i = 1; i <= 31; i++) {
      const date = new Date(Date.UTC(2020, 2, i));
      dates.push(date);
    }
    for (let i = 1; i <= 30; i++) {
      const date = new Date(Date.UTC(2020, 3, i));
      dates.push(date);
    }
    return dates;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { isObject } from 'highcharts';
import { CommonService } from '../../services/common.service';
import * as plotlyicons from '../plotlyIcons';
declare let Plotly: any;
declare let document: any;

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
})
export class LineGraphComponent implements OnInit {
  @Input() data!: any[]
  @Input() date!: any[]
  @Input() elementId: string = '';
  @Input() filterType: string = '';
  @Input() graphTitle: string = '';
  @Input() showBarGraph: string = '';
  @Input() unit!: string;

  width: any = screen.width;
  heightVal: any;
  graphConfig: any;
  graphLayout: any;
  showFullscreen: boolean = false;
  noDataLayout: any;

  constructor(private service: CommonService) {
    this.width = screen.width;
  }
  ngOnInit(): void {
    this.renderGraph();
  }

  ngOnChanges(): void {
    this.renderGraph();
  }

  renderGraph(): void {
    if (this.width <= 380) {
      this.heightVal = 250;
    } else if (this.width >= 381 && (this.width <= 800)) {
      this.heightVal = 280;
    } else if (this.width >= 1000 && (this.width <= 1800)) {
      this.heightVal = 250; //this.heightVal = 150;
    } else {
      this.heightVal = 200;
    }

    this.noDataLayout = {
      height: this.heightVal,
      "xaxis": {
        "visible": false
      },
      "yaxis": {
        "visible": false
      },
      "annotations": [
        {
          "text": "No data available for the provided time range",
          "xref": "paper",
          "yref": "paper",
          "showarrow": false,
          "font": {
            "size": 15,
            "family": 'sans-serif'
          },
        }
      ]
    };

    let firstIndexDate;

    if (this.date && this.date[0]) {
      firstIndexDate = this.date[0];
    } else
      firstIndexDate = 0;

    this.graphLayout = {
      barmode: 'stack',
      showlegend: true,
      "yaxis": {
        "visible": true,
        title: this.unit
      },
      "xaxis": {
        title: 'Hours',
        type: 'date',
        "visible": true,
        tickmode: 'linear',
        showticklabels: true,
        automargin: true,
        tick0: firstIndexDate,
        tickangle: -65,
        dtick: 2500 * 24 * 60,
        width: 0.2
      },
      height: this.heightVal,
      margin: {
        l: 40,
        r: 30,
        b: 35,
        t: 35,
      },
      legend: {
        x: 0.5,
        xanchor: 'center',
        y: 3.5,
        bgcolor: 'transparent',
        orientation: "h"
      },
      hovermode: 'x',
      autosize: true
    };



    let day_shiftA: any, day_shiftB: any, day_shiftC: any;
    day_shiftA = {
      name: 'Shift A',
      mode: 'lines',
      stackgroup: 'one',
      type: 'line',
      marker: {
        color: '#c4b7e4',
        line: {
          color: '#c4b7e4',
          width: 2
        }
      }
    }

    day_shiftB = {
      name: 'Shift B',
      mode: 'lines',
      type: 'line',
      stackgroup: 'two',
      marker: {
        color: '#9c9ef1',
        line: {
          color: '#9c9ef1',
          width: 2
        }
      }
    }

    day_shiftC = {
      name: 'Shift C',
      mode: 'lines',
      type: 'line',
      stackgroup: 'three',
      marker: {
        color: '#5b5fc4',
        line: {
          color: '#5b5fc4',
          width: 2
        }
      }
    }
    if (this.filterType === 'monthly') {
      this.graphLayout = { ...this.graphLayout, "xaxis": { title: 'Day' } }
      this.date = this.date.map(el => el.split(' ')[0]);

      day_shiftA = {
        ...day_shiftA,
        x: this.date,
        y: this.data[0]
      }

      day_shiftB = {
        ...day_shiftB,
        x: this.date,
        y: this.data[1]
      }

      day_shiftC = {
        ...day_shiftC,
        x: this.date,
        y: this.data[2]
      }
    } else if (this.filterType === 'daily') {
      let shiftA: any = {}, shiftB: any = {}, shiftC: any = {};
      if (this.data) {
        if (this.data.length > 0 && this.data.length <= 16) {
          shiftA['x'] = this.date.slice(0, this.date.length)
          shiftA['y'] = this.data.slice(0, this.data.length)
        } else if (this.data.length > 16 && this.data.length <= 31) {
          shiftA['x'] = this.date.slice(0, 17);
          shiftA['y'] = this.data.slice(0, 17);
          shiftB['x'] = this.date.slice(16, this.date.length);
          shiftB['y'] = this.data.slice(16, this.data.length);
        } else if (this.data.length > 32) {
          shiftA['x'] = this.date.slice(0, 17);
          shiftA['y'] = this.data.slice(0, 17);
          shiftB['x'] = this.date.slice(16, 32);
          shiftB['y'] = this.data.slice(16, 32);
          shiftC['x'] = this.date.slice(31, this.date.length);
          shiftC['y'] = this.data.slice(31, this.data.length);
        }
        else {
          shiftA['x'] = []
          shiftA['y'] = []
        }
      }

      day_shiftA = {
        ...day_shiftA,
        x: shiftA['x'],
        y: shiftA['y']
      }

      day_shiftB = {
        ...day_shiftB,
        x: shiftB['x'],
        y: shiftB['y']
      }

      day_shiftC = {
        ...day_shiftC,
        x: shiftC['x'],
        y: shiftC['y']
      }
    }
    let day_wise_status = [day_shiftC, day_shiftB, day_shiftA];

    let that = this;
    let modeBarButtonsToAddArray3 = [
      {
        name: 'Bar chart',
        icon: plotlyicons.icons['barchart'],
        direction: 'up',
        click: function (gd: any) {
          gd.data[0]['type'] = 'bar';
          gd.data[1]['type'] = 'bar';
          gd.data[2]['type'] = 'bar';
          gd.layout['height'] = that.heightVal;
          Plotly.newPlot(that.elementId, gd.data, gd.layout, day_wiseconfig);
          if (that.showFullscreen) {
            setTimeout(() => {
              let layout = gd.layout;
              layout['height'] = null;
              Plotly.newPlot('fullscreenGraph', gd.data, layout, day_wiseconfig);
            }, 200);
          }
        }
      },
      {
        name: 'Line Chart',
        icon: plotlyicons.icons['linechart'],
        direction: 'up',
        click: function (gd: any) {

          gd.data[0]['type'] = 'line';
          gd.data[1]['type'] = 'line';
          gd.data[2]['type'] = 'line';
          gd.layout['height'] = that.heightVal;

          Plotly.newPlot(that.elementId, gd.data, gd.layout);

          if (that.showFullscreen) {
            setTimeout(() => {
              let layout = gd.layout;
              layout['height'] = null;
              Plotly.newPlot('fullscreenGraph', gd.data, layout, day_wiseconfig);
            }, 200);
          }
        }
      },
      {
        name: 'Expand Fullscreen',
        icon: plotlyicons.icons['fullscreen'],
        click: function (gd: any) {
          that.showFullscreen = true;
          gd.layout['height'] = null;

          if (that.showFullscreen) {
            setTimeout(() => {
              document.getElementById('title-fullscreen').innerHTML = that.graphTitle;
              Plotly.newPlot('fullscreenGraph', gd.data, gd.layout, day_wiseconfig);
            }, 200);
          }
        }
      },
      {
        name: 'Text Display/Hide',
        icon: plotlyicons.icons['textshowhide'],
        click: function (gd: any) {
          that.service.toggleLoader(true);
          let annotations = [];
          let flag = false;

          if (gd.layout['annotations'] == undefined){
            flag = true;
          } 
          else {
            flag = false;
            delete gd.layout['annotations'];
          }

          if (flag == true) {
            for (let j = 0; j < gd.data.length; j++) {
              let coordinates = [gd.data[j]['x'], gd.data[j]['y']]
              let annodeText = gd.data[j]['y'];
              if (coordinates[1] !== undefined && coordinates[0] !== undefined) {
                for (let i = 0; i < coordinates[0].length; i++) {
                  annotations.push({
                    x: coordinates[0][i],
                    y: coordinates[1][i],
                    text: Math.round(annodeText[i]), //Math.round(annodeText[i]) === 0 ? '' : Math.round(annodeText[i])
                    textangle: -65,
                    textposition: 'top',
                    showarrow: false,
                    yshift: 18,
                    font: {
                      size: 12
                    }
                  })
                }
              }
            }
            gd.layout['annotations'] = annotations;
          }

          // Plotly.newPlot(that.elementId, gd.data, gd.layout, { displaylogo: false, responsive: true, scrollZoom: true });

          if (that.showFullscreen) {
            setTimeout(() => {
              let layout = gd.layout;
              layout['height'] = null;
              Plotly.newPlot('fullscreenGraph', gd.data, layout, day_wiseconfig);
              that.service.toggleLoader(false);
            }, 200);
          } else {
            setTimeout(() => {
              let layout = gd.layout;
              layout['height'] = that.heightVal;
              Plotly.newPlot(that.elementId, gd.data, layout, day_wiseconfig);
              that.service.toggleLoader(false);
            }, 200);
            
          }
          setTimeout(() => {
            that.service.toggleLoader(false);
          }, 1000);
        }
      }
    ];
    let day_wiseconfig: any;
    if (this.showBarGraph === 'false') {
      day_wiseconfig = {
        modeBarButtonsToAdd: [modeBarButtonsToAddArray3[2], modeBarButtonsToAddArray3[3]], //modeBarButtonsToAdd: [modeBarButtonsToAddArray3[2]],
        displaylogo: false, responsive: true, scrollZoom: true
      }
    } else {
      day_wiseconfig = {
        modeBarButtonsToAdd: [...modeBarButtonsToAddArray3],
        displaylogo: false, responsive: true, scrollZoom: true
      }
    }


    if (this.data === undefined) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else if (this.data.constructor === Array && this.data.length === 0) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else if (this.data.constructor === Object && isObject(this.data, true) && Object.keys(this.data).length === 0) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else {
      Plotly.newPlot(this.elementId, day_wise_status, this.graphLayout, day_wiseconfig);
    }
  }
}
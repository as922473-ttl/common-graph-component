import { Component, OnInit, Input } from '@angular/core';
import { isObject } from 'highcharts';
import * as plotlyicons from '../plotlyIcons';
declare let Plotly: any;
declare let document: any;

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
})
export class BarGraphComponent implements OnInit {
  @Input() data!: any[];
  @Input() date!: any[];
  @Input() elementId: string = '';
  @Input() graphTitle: string = '';
  @Input() month: string = '';
  @Input() unit!: string;
  monthInWords!: string;
  width: any = screen.width;
  heightVal: any;
  parameterValues!: any[];
  showFullscreen!: boolean;
  graphData!: any[];
  graphConfig: any;
  traceLayout: any;
  noDataLayout: any;

  constructor() {
    this.width = screen.width;
  }

  ngOnInit(): void {
    this.renderGraph();
  }

  ngOnChanges() {
    this.renderGraph();
  }

  renderGraph() {
    if (this.width <= 380) {
      this.heightVal = 250;
    } else if (this.width >= 381 && this.width <= 800) {
      this.heightVal = 280;
    } else if (this.width >= 1000 && this.width <= 1800) {
      this.heightVal = 250; //this.heightVal = 150;
    } else {
      this.heightVal = 200;
    }

    this.noDataLayout = {
      height: this.heightVal,
      xaxis: {
        visible: false,
      },
      yaxis: {
        visible: false,
      },
      annotations: [
        {
          text: 'No data available for the provided time range',
          xref: 'paper',
          yref: 'paper',
          showarrow: false,
          font: {
            size: 15,
            family: 'sans-serif',
          },
        },
      ],
    };

    let d;
    if (this.data && this.data.length > 0) {
      d = new Date(this.date[0]);
      this.monthInWords = d.toLocaleString('default', { month: 'long' });

      this.traceLayout = {
        showlegend: true,
        legend: {
          x: 0.5,
          xanchor: 'center',
          y: 1.5,
          traceorder: 'normal',
          bgcolor: 'transparent',
          orientation: 'h',
        },
        margin: {
          l: 70,
          r: 30,
          b: 55,
          t: 3,
        },
        height: this.heightVal,
        barmode: 'stack',
        xaxis: {
          showticklabels: true,
          automargin: true,
          constraintoward: 'center',
          title: `Date (${this.monthInWords})`,
          tickformat: '%d',
          tickangle: 5,
          visible: true,
          tickmode: 'linear',
          font: {
            color: '#847fa0',
          },
        },
        yaxis: {
          visible: true,
          title: this.unit,
        },
        hovermode: 'x',
        autosize: true,
      };

      this.graphData = [
        {
          x: this.date,
          y: this.data[0],
          name: 'SHIFT A',
          mode: 'lines+markers',
          textposition: 'top',
          stackgroup: 'one',
          type: 'bar',
          marker: {
            color: '#87bdf1',
          },
        },
        {
          x: this.date,
          y: this.data[1],
          name: 'SHIFT B',
          mode: 'lines+markers',
          textposition: 'top',
          stackgroup: 'one',
          type: 'bar',
          marker: {
            color: '#afd3f5',
          },
        },
        {
          x: this.date,
          y: this.data[2],
          name: 'SHIFT C',
          mode: 'lines+markers',
          textposition: 'top',
          stackgroup: 'one',
          type: 'bar',
          marker: {
            color: '#d7e9fa',
          },
        },
      ];
      let that = this;
      this.graphConfig = {
        modeBarButtonsToAdd: [
          {
            name: 'Bar chart',
            icon: plotlyicons.icons['barchart'],
            direction: 'up',
            click: function (gd:any) {
              gd.data[0]['type'] = 'bar';
              gd.data[1]['type'] = 'bar';
              gd.data[2]['type'] = 'bar';

              gd.data[0]['textposition'] = 'outside';
              gd.data[1]['textposition'] = 'outside';
              gd.data[2]['textposition'] = 'outside';

              gd.layout['barmode'] = 'stack';
              gd.layout['height'] = that.heightVal;

              if (that.showFullscreen) {
                setTimeout(() => {
                  let layout = gd.layout;
                  layout['height'] = null;
                  Plotly.newPlot(
                    'fullscreenGraph',
                    gd.data,
                    layout,
                    that.graphConfig
                  );
                }, 200);
              } 
              else {
                Plotly.newPlot(that.elementId, gd.data, gd.layout, {
                  displaylogo: false,
                  responsive: true,
                  scrollZoom: true,
                });
              }
            },
          },
          {
            name: 'Line Chart',
            icon: plotlyicons.icons['linechart'],
            direction: 'up',
            click: function (gd:any) {
              gd.data[0]['type'] = 'line';
              gd.data[1]['type'] = 'line';
              gd.data[2]['type'] = 'line';

              gd.data[0]['textposition'] = 'top';
              gd.data[1]['textposition'] = 'top';
              gd.data[2]['textposition'] = 'top';

              gd.layout['height'] = that.heightVal;

              if (that.showFullscreen) {
                setTimeout(() => {
                  let layout = gd.layout;
                  layout['height'] = null;
                  Plotly.newPlot(
                    'fullscreenGraph',
                    gd.data,
                    layout,
                    that.graphConfig
                  );
                }, 200);
              } 
              else {
                Plotly.newPlot(
                  that.elementId,
                  gd.data,
                  gd.layout,
                  that.graphConfig
                );
              }
            },
          },

          {
            name: 'Expand Fullscreen',
            icon: plotlyicons.icons['fullscreen'],
            click: function (gd:any) {
              that.showFullscreen = true;
              gd.layout['height'] = null;

              if (that.showFullscreen) {
                setTimeout(() => {
                  document.getElementById('title-fullscreen').innerHTML =
                    that.graphTitle;
                  Plotly.newPlot(
                    'fullscreenGraph',
                    gd.data,
                    gd.layout,
                    that.graphConfig
                  );
                }, 200);
              }
            },
          },

          {
            name: 'Text Display/Hide',
            icon: plotlyicons.icons['textshowhide'],
            click: function (gd:any) {
              let annotations = [];
              let flag = false;

              if (gd.layout['annotations'] == undefined) flag = true;
              else {
                flag = false;
                delete gd.layout['annotations'];
              }

              if (flag == true) {
                let result = [];
                if (gd.data[0]['y']) {
                  for (let i = 0; i < gd.data[0]['y'].length; i++) {
                    let a = 0,
                      b = 0,
                      c = 0;
                    if (gd.data[0]['y'][i]) {
                      a = gd.data[0]['y'][i];
                    } else {
                      a = 0;
                    }

                    if (gd.data[1]['y'][i]) {
                      b = gd.data[1]['y'][i];
                    } else {
                      b = 0;
                    }

                    if (gd.data[2]['y'][i]) {
                      c = gd.data[2]['y'][i];
                    } else {
                      c = 0;
                    }
                    result.push(Math.round(Number(a) + Number(b) + Number(c)));
                  }
                }

                let coordinates = [gd.data[2]['x'], result];
                for (let j = 0; j < gd.data.length; j++) {
                  for (let i = 0; i < coordinates[0].length; i++) {
                    annotations.push({
                      x: coordinates[0][i],
                      y: coordinates[1][i],
                      text: result[i],
                      textangle: -65,
                      textposition: 'top',
                      showarrow: false,
                      yshift: 18,
                      font: {
                        size: 12,
                      },
                    });
                  }
                }
                gd.layout['annotations'] = annotations;
              }

              if (that.showFullscreen) {
                setTimeout(() => {
                  let layout = gd.layout;
                  layout['height'] = null;
                  Plotly.newPlot(
                    'fullscreenGraph',
                    gd.data,
                    layout,
                    that.graphConfig
                  );
                }, 200);
              } 
              else {
                Plotly.newPlot(that.elementId, gd.data, gd.layout, {
                  displaylogo: false,
                  responsive: true,
                  scrollZoom: true,
                });
              }
            },
          },
        ],
        displaylogo: false,
        responsive: true,
        scrollZoom: true,
      };
    }
    if (this.data === undefined) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else if (this.data.constructor === Array && this.data.length === 0) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else if (
      this.data.constructor === Object &&
      isObject(this.data, true) &&
      Object.keys(this.data).length === 0
    ) {
      Plotly.newPlot(this.elementId, [], this.noDataLayout, this.graphConfig);
    } else {
      Plotly.newPlot(
        this.elementId,
        this.graphData,
        this.traceLayout,
        this.graphConfig
      );
    }
  }
}

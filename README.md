# Common Graph Component
This components are build using [Plotly.JS](https://www.npmjs.com/package/plotly.js). The implementation of this components are required for maintaining uniformity across all the projects.

## Dependencies
1. PlotlyJS - [https://www.npmjs.com/package/plotly.js](https://www.npmjs.com/package/plotly.js)


### Step for installation of PlotlyJS and other requirements for the first time

Step 1:
Install Packages
```sh
npm i --save plotly.js-dist-min plotly.js
```
Step 2:
Add to *scripts* in **Angular.json** file

```
"scripts": ["node_modules/plotly.js/dist/plotly.min.js"]
```

Step 3: Declare **Plotly** in the required components at the beginning
```
declare let Plotly: any;
```

Step 4: Make a **plotlyIcon.ts** file for saving and importing icons for additional features

```
export const icons = {
  barchart: {
    name: 'barchartlogo',
    transform: 'rotate(20deg)',
    width: 550,
    path: 'M32 32C49.67 32 64 46.33 64 64V400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32zM160 224C177.7 224 192 238.3 192 256V320C192 337.7 177.7 352 160 352C142.3 352 128 337.7 128 320V256C128 238.3 142.3 224 160 224zM288 320C288 337.7 273.7 352 256 352C238.3 352 224 337.7 224 320V160C224 142.3 238.3 128 256 128C273.7 128 288 142.3 288 160V320zM352 192C369.7 192 384 206.3 384 224V320C384 337.7 369.7 352 352 352C334.3 352 320 337.7 320 320V224C320 206.3 334.3 192 352 192zM480 320C480 337.7 465.7 352 448 352C430.3 352 416 337.7 416 320V96C416 78.33 430.3 64 448 64C465.7 64 480 78.33 480 96V320z',
    ascent: 550,
    descent: 0,
    xmlns: 'http://www.w3.org/2000/svg',
  },
  linechart: {
    name: 'linechartlogo',
    transform: 'rotate(20deg)',
    width: 550,
    path: 'M64 400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32C49.67 32 64 46.33 64 64V400zM342.6 278.6C330.1 291.1 309.9 291.1 297.4 278.6L240 221.3L150.6 310.6C138.1 323.1 117.9 323.1 105.4 310.6C92.88 298.1 92.88 277.9 105.4 265.4L217.4 153.4C229.9 140.9 250.1 140.9 262.6 153.4L320 210.7L425.4 105.4C437.9 92.88 458.1 92.88 470.6 105.4C483.1 117.9 483.1 138.1 470.6 150.6L342.6 278.6z',
    ascent: 550,
    descent: 0,
    xmlns: 'http://www.w3.org/2000/svg',
  },
  fullscreen: {
    name: 'fullscreenlogo',
    transform: 'rotate(20deg)',
    width: 550,
    path: 'M128 32H32C14.31 32 0 46.31 0 64v96c0 17.69 14.31 32 32 32s32-14.31 32-32V96h64c17.69 0 32-14.31 32-32S145.7 32 128 32zM416 32h-96c-17.69 0-32 14.31-32 32s14.31 32 32 32h64v64c0 17.69 14.31 32 32 32s32-14.31 32-32V64C448 46.31 433.7 32 416 32zM128 416H64v-64c0-17.69-14.31-32-32-32s-32 14.31-32 32v96c0 17.69 14.31 32 32 32h96c17.69 0 32-14.31 32-32S145.7 416 128 416zM416 320c-17.69 0-32 14.31-32 32v64h-64c-17.69 0-32 14.31-32 32s14.31 32 32 32h96c17.69 0 32-14.31 32-32v-96C448 334.3 433.7 320 416 320z',
    ascent: 550,
    descent: 0,
    xmlns: 'http://www.w3.org/2000/svg',
  },
  textshowhide: {
    name: 'label',
    transform: 'rotate(20deg)',
    width: 16,
    height: 16,
    path: 'M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z',
    ascent: 550,
    descent: 0,
    xmlns: 'http://www.w3.org/2000/svg',
  },
};

```

Step 5: Import **plotlyIcon.ts** file in the required components
```javascript
import * as plotlyicons from '../plotlyIcons';
```
And use that as follows

```
icon: plotlyicons.icons['barchart'] 
icon: plotlyicons.icons['linechart']
icon: plotlyicons.icons['fullscreen']
icon: plotlyicons.icons['textshowhide']
```

### Implementation Process

As we have two type of graphs to implement, so we have two components here in our project -

``
1.Stacked Bar Graph - For showing of three shift division vertically (monthly representation)
``

``
2.Line Graph - For the representation of daily data with segregated shift portion horizontally
``

Both of these components are required to be implemented inside a parent component from where the relevant datas will be passed to these element as HTML attributes to respective selectors.

#### Bar Graph Component
```html
<div id="bar-graph">
     <app-bar-graph 
           [data]="barGraphData['y']" 
           [date]="barGraphData['x']" 
           elementId="bar-graph" 
           [unit]="graphUnit"
           filterType="monthly" 
           graphTitle="Total Energy Meter Consumption">
     </app-bar-graph>
</div>
```
Details of the attribute are as follows -
* **data [array]** - *For passing the y-axis data.*
* **date [array]** - *For passing date which is required to be plotted on x-axis.*
* **elementId [string]** - *This is the element id of the container element containing this component, where the Plotly will plot the graph.*
* **unit [string]** - *This is the unit of the data plotted on the y-axis of the graph.*

* **filterType [string]** - *This is the type of filter for determining **daily** or **monthly**.*

* **graphTitle [string]** - *This is for adding the graph title required for showing in fullscreen mode.*

#### Line Graph Component
```html
<div id="line-graph">
     <app-line-graph 
           [data]="lineGraphData['y']" 
           [date]="lineGraphData['x']" 
           showBarGraph="false"
           elementId="line-graph" 
           [unit]="graphUnit"
           graphTitle="Total Energy Meter Consumption">
    </app-line-graph>
</div>
```

Details of the attribute are as follows -
* **data [array]** - *For passing the y-axis data.*
* **date [array]** - *For passing date which is required to be plotted on x-axis.*
* **showBarGraph [string]** - *For showing / hiding bar graph. (It will be "false")*
* **elementId [string]** - *This is the element id of the container element containing this component, where the Plotly will plot the graph.*
* **unit [string]** - *This is the unit of the data plotted on the y-axis of the graph.*

* **graphTitle [string]** - *This is for adding the graph title required for showing in fullscreen mode.*


### Setting height of the graph

The height is required to be set at the beginning. This height will be based on the individual project requirements.

```javascript
export class BarGraphComponent implements OnInit {
   width: any = screen.width;
   heightVal: any;
   ...
   ...

   constructor() {
      this.width = screen.width;
   }

   ngOnInit(): void {
      this.renderGraph();
   }

   renderGraph() {
       if (this.width <= 380) {
           this.heightVal = 250;
       } else if (this.width >= 381 && this.width <= 800) {
           this.heightVal = 280;
       } else if (this.width >= 1000 && this.width <= 1800) {
           this.heightVal = 150; 
       } else {
           this.heightVal = 200;
       }
    ...
    ...
```

### Fallback condition

> When there is no data or at the time of loading of next data, we need to pass blank array for rendering the fallback layout on the plot area.

```javascript
/*At the time of loading data*/
     this.service.toggleLoader(true); //turning the loader on
     this.barGraphData = []; //assigning blank array to render fallback layout
     this.service.backendMocker(type, 'dataset2').then(result => {
          if(result['x'].length > 0 && result['y'].length > 0){
               this.barGraphData = result;
               this.service.toggleLoader(false); //turning the loader off
          } else {
               this.barGraphData = []; //assigning blank array to render fallback layout
          }
     })

```

* #### Git Repository - [https://github.com/as922473-ttl/common-graph-component](https://github.com/as922473-ttl/common-graph-component)

* #### Demo Link - [https://common-gc.surge.sh](https://common-gc.surge.sh)




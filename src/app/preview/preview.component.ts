import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import * as data from '../dummyData/dummyData';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  constructor(private service: CommonService) {
    this.barGraphData = data.graphData.dataset1;
    this.lineGraphData = data.graphData.dataset3;
  }
  showLoader: boolean = false;
  loaderSubscription: any;
  barGraphData: any;
  lineGraphData: any
  graphUnit: string = 'kwh';
  currentBarGraphDataset: string = 'dataset1';
  currentLineGraphDataset: string = 'dataset1';


  ngOnInit(): void {
    this.loaderSubscription = this.service.getLoaderStatus.subscribe(
      (status) => {
        this.showLoader = status;
      });

    this.service.toggleLoader(true);
    this.barGraphData = [];
    this.lineGraphData = [];
    this.service.backendMocker('bar', 'dataset2').then(result => {
      this.barGraphData = result;
      this.service.toggleLoader(false);
    })
    this.service.backendMocker('line', 'dataset2').then(result => {
      this.lineGraphData = result;
      this.service.toggleLoader(false);
    })

  }

  ngOnDestroy() {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }

  toggleLoader() {
    if (this.showLoader) {
      this.service.toggleLoader(false);
    } else {
      this.service.toggleLoader(true);
    }
  }

  buttonToggler(type: any) {
    if (type === 'bar') {
      if (this.currentBarGraphDataset === 'dataset1') {
        this.currentBarGraphDataset = 'dataset2';
        this.service.toggleLoader(true);
        this.barGraphData = [];
        this.service.backendMocker(type, 'dataset1').then(result => {
          this.barGraphData = result;
          this.service.toggleLoader(false);
        })
      } else if (this.currentBarGraphDataset === 'dataset2') {
        this.currentBarGraphDataset = 'dataset1';
        this.service.toggleLoader(true);
        this.barGraphData = [];
        this.service.backendMocker(type, 'dataset2').then(result => {
          this.barGraphData = result;
          this.service.toggleLoader(false);
        })
      }
    } else if (type === 'line') {
      if (this.currentLineGraphDataset === 'dataset1') {
        this.currentLineGraphDataset = 'dataset2';
        this.service.toggleLoader(true);
        this.lineGraphData = [];
        this.service.backendMocker(type, 'dataset1').then(result => {
          this.lineGraphData = result;
          this.service.toggleLoader(false);
        })
      } else if (this.currentLineGraphDataset === 'dataset2') {
        this.currentLineGraphDataset = 'dataset1';
        this.service.toggleLoader(true);
        this.lineGraphData = [];
        this.service.backendMocker(type, 'dataset2').then(result => {
          this.lineGraphData = result;
          this.service.toggleLoader(false);
        })
      }
    }
  }
}

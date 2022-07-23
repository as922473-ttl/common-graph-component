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

  ngOnInit(): void {
    this.loaderSubscription = this.service.getLoaderStatus.subscribe(
      (status) => {
        this.showLoader = status;
      }
    );
    
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
}

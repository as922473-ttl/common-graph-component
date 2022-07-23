import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as data from '../dummyData/dummyData';

@Injectable()
export class CommonService {
  showLoader: boolean = false;
  constructor() { }

  private loaderStatus = new BehaviorSubject<any>(this.showLoader);
  public getLoaderStatus = this.loaderStatus.asObservable();
  toggleLoader(value: any) {
    this.loaderStatus.next(value);
  }

  backendMocker(type: any, currentDataset: any) {
    let promise = new Promise((resolve: any, reject: any) => {
      if (type === 'bar') {
        if (currentDataset === 'dataset1') {
          setTimeout(() => {
            resolve(data.graphData.dataset2)
          }, 2000);
        } else if (currentDataset === 'dataset2'){
          setTimeout(() => {
            resolve(data.graphData.dataset1)
          }, 2000);
        }
      } else if (type === 'line') {
        if (currentDataset === 'dataset1') {
          setTimeout(() => {
            resolve(data.graphData.dataset4)
          }, 2000);
        } else if (currentDataset === 'dataset2'){
          setTimeout(() => {
            resolve(data.graphData.dataset3)
          }, 2000);
        }
      }
    })
    return promise;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonService {
  showLoader: boolean = false;
  constructor() {}

  private loaderStatus = new BehaviorSubject<any>(this.showLoader);
  public getLoaderStatus = this.loaderStatus.asObservable();
  toggleLoader(value: any) {
    this.loaderStatus.next(value);
  }
}

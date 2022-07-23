import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PreviewComponent } from './preview/preview.component';
import { BarGraphComponent } from './shared/bar-graph/bar-graph.component';
import { LineGraphComponent } from './shared/line-graph/line-graph.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { CommonService } from './services/common.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    PreviewComponent,
    BarGraphComponent,
    LineGraphComponent,
    LoaderComponent,
  ],
  bootstrap: [AppComponent],
  providers: [CommonService],
})
export class AppModule {}

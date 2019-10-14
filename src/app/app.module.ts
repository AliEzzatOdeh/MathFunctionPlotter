import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxMathFunctionPlotterModule } from 'projects/ngx-math-function-plotter/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMathFunctionPlotterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

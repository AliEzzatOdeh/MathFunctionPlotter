import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxMathFunctionPlotterModule } from 'projects/ngx-math-function-plotter/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMathFunctionPlotterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { NgxSingleVariableFunctionParserService } from 'projects/ngx-math-function-plotter/src/public_api';

@Component({
  selector: 'ali-ezzat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MathFunctionPlotter';
  singleVariableParserService: NgxSingleVariableFunctionParserService;
  mathFunctionToDraw = 'sin(x)';
  maxCoordinateValue = 10;
  constructor(singleVariableParserService: NgxSingleVariableFunctionParserService) {
    this.singleVariableParserService = singleVariableParserService;
  }

  public drawMathFunction(value: string) {
    this.mathFunctionToDraw = value;
  }

  public computeExpression(expressionValue: string) {
    this.singleVariableParserService.setMathFunctionText(expressionValue);
    const result = this.singleVariableParserService.computeFunctionAtValue(0);
    alert(result);
  }
}

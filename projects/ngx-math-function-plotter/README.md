# MathFunctionPlotter [![Build Status](https://travis-ci.com/AliEzzatOdeh/MathFunctionPlotter.svg?branch=master)](https://travis-ci.com/AliEzzatOdeh/MathFunctionPlotter)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

An angular library that has a component for plotting math functions with built in math expressions & single variable computation.

Table of supported math operations:

| Operation      | Syntax        | # of operands   |
| -------------  |:-------------:| ---------------:|
| Addition       |     +         |       2         |
| Subtraction    |     sub       |       2         |
| Multiplication |     *         |       2         |
| Division       |     /         |       2         |
| L.Parantheses  |     (         |       >=1       |
| R.Parantheses  |     )         |       >=1       |
| sin            |     sin       |       1         |
| cos            |     cos       |       1         |
| tan            |     tan       |       1         |
| seq            |     seq       |       1         |
| csc            |     csc       |       1         |
| cot            |     cot       |       1         |
| power          |     ^         |       2         |
| square root    |     sqr       |       1         |
| minus          |     -         |       1         |

## Usage

### Plotter

Inside your module import it as:

```
import {NgxMathFunctionPlotterModule} from 'ngx-math-function-plotter';
```
Then inside your component `.html` add the plotter component tag:

```
<ngx-math-function-plotter [functionInput]="'sin(x)'" [maxDisplayValue]="10" [width]="600" [height]="600">
</ngx-math-function-plotter>
```

Result will be as follow:

![image not found](/projects/ngx-math-function-plotter/plotterSampleResult.PNG)

### Math Expression parser

For parsing mathmatical expressions service `NgxSingleVariableFunctionParserService` can be used inside needed component `.ts`:

First import the service as follows:

```
import { NgxSingleVariableFunctionParserService } from 'ngx-math-function-plotter';
```
Then inside the class will be as:

```
export class AppComponent {
  title = 'PlotterTest';

  mathExpressionParser: NgxSingleVariableFunctionParserService;

  constructor(mathExpressionParser: NgxSingleVariableFunctionParserService) {
    this.mathExpressionParser = mathExpressionParser;
    this.mathExpressionParser.setMathFunctionText('x+1'); // single variable expression
    const number = this.mathExpressionParser.computeFunctionAtValue(1); // 2 is displayed
    alert(number);
    this.mathExpressionParser.setMathFunctionText('sqr(4*4)'); // constant expression
     // input in following statement has no effect since expression is constant
    const constantExpressionResult = this.mathExpressionParser.computeFunctionAtValue(0);
    alert(constantExpressionResult); // 4 is displayed
  }
```


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test --project NgxMathFunctionPlotter` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

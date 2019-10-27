import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Point } from './models/point.model';
import { NgxSingleVariableFunctionParserService } from './services/ngx-single-variable-function-parser.service';

@Component({
  selector: 'ngx-math-function-plotter',
  template: `
    <canvas #mathPlotterCanvas>
    </canvas>
  `,
  styles: []
})
export class NgxMathFunctionPlotterComponent implements AfterViewInit, OnChanges {
  private _mathFunctionAsText: string;
  @ViewChild('mathPlotterCanvas') _canvas: ElementRef;
  private _singleVariableParse: NgxSingleVariableFunctionParserService;
  private _drawingContext: any;
  private _canvasWidth = 300;
  private _canvasHeight = 300;
  private _xScale: number;
  private _yScale: number;
  private _originPointLocation: Point;
  private DRAW_FUNCTION_SCALE = 100;
  private _maxDisplayValue = 10;

  constructor(singleVariableParse: NgxSingleVariableFunctionParserService) {
    this._singleVariableParse = singleVariableParse;
   }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['functionInput'] !== undefined) {
      const functionInputAsText: SimpleChange = changes.functionInput;
      this._mathFunctionAsText = functionInputAsText.currentValue;
    }

    if (changes['maxDisplayValue'] !== undefined) {
      const maxDisplayValue: SimpleChange = changes.maxDisplayValue;
      this._maxDisplayValue = maxDisplayValue.currentValue;
    }
    try {
    this.clearLastFunction();
    this.drawSquares();
    this.drawXYAxis();
    this.drawNumbersOnAxises();
    this.drawFunction();
    } catch {}
  }

  @Input()
  public set functionInput(functionInputAsText: string) {
    this._mathFunctionAsText = functionInputAsText;
  }

  @Input()
  public set width(width: number) {
    this._maxDisplayValue = width;
  }

  @Input()
  public set height(height: number) {
    this._canvasHeight = height;
  }

  @Input()
  public set maxDisplayValue(max: number) {
      this._maxDisplayValue = max;
  }

  ngAfterViewInit(): void {
    this._drawingContext = this._canvas.nativeElement.getContext('2d');
    this._canvas.nativeElement.width = this._canvasWidth;
    this._canvas.nativeElement.height = this._canvasHeight;
    const xHalf = this._canvasWidth / 2;
    const yHallf = this._canvasHeight / 2;
    this._originPointLocation = new Point(xHalf, yHallf);
    this._xScale = this._canvasWidth / (this._maxDisplayValue * 2); // actual width of 1unit in x axis of canvas
    this._yScale = this._canvasHeight / (this._maxDisplayValue * 2); // actual height of 1unit in y axis of canvas

    this.drawSquares();
    this.drawXYAxis();
    this.drawNumbersOnAxises();
    this.drawFunction();
  }

  private drawSquares() {
    for (let i = 0; i <= this._maxDisplayValue * 2; ++i) {
      const xStepValue = i * this._xScale;
      const yStepValue = i * this._yScale;
      this.drawLine(new Point(xStepValue, 0), new Point(xStepValue, this._canvasHeight), '#C4BEBD'); // Draw vertical line
      this.drawLine(new Point(0, yStepValue), new Point(this._canvasWidth, yStepValue), '#C4BEBD'); // Draw horizantal line
    }
  }

  private drawXYAxis() {
    const xAxisPoint1 = new Point(this._originPointLocation.X, 0);
    const xAxisPoint2 = new Point(this._originPointLocation.X, this._canvasHeight);
    const yAxisPoint1 = new Point(0, this._originPointLocation.Y);
    const yAxisPoint2 = new Point(this._canvasWidth, this._originPointLocation.Y);

    this.drawLine(xAxisPoint1, xAxisPoint2, '#000000'); // draw X axis
    this.drawLine(yAxisPoint1, yAxisPoint2, '#000000'); // draw Y axis
  }

  private drawNumbersOnAxises() {
    const maxMinusXValue = this._maxDisplayValue * -1;
    const numberXDashHeight = this._yScale / 10;
    const numberYDashHeight = this._xScale / 10;
    let numberToDraw = maxMinusXValue;
    for (let i = 0; i < this._maxDisplayValue * 2; ++i) {
      const xInitPoint = new Point(i * this._xScale, this._originPointLocation.Y);
      const xDestPoint = new Point(xInitPoint.X, this._originPointLocation.Y + numberXDashHeight);

      const yInitPoint = new Point(this._originPointLocation.X, i * this._yScale);
      const yDestPoint = new Point(this._originPointLocation.X + numberYDashHeight, yInitPoint.Y);

      this.drawLine(xInitPoint, xDestPoint, '#000000'); // Draw X axis number dashes
      if (numberToDraw !== 0) {
        this.drawText(numberToDraw, new Point(xDestPoint.X, xDestPoint.Y + 2 * numberXDashHeight), '#000000', '12px Arial');
      }
      this.drawLine(yInitPoint, yDestPoint, '#000000'); // Draw Y axis number dashes
      if (numberToDraw !== 0) {
        const font = '12px Arial';
        this.drawText(numberToDraw * -1, new Point(yDestPoint.X + 2 * numberYDashHeight, yDestPoint.Y), '#000000', font);
      }
      numberToDraw++;
    }
  }

  private drawLine(startPoint, endPoint, color) {
    this._drawingContext.strokeStyle = color;
    this._drawingContext.beginPath();
    this._drawingContext.moveTo(startPoint.X, startPoint.Y);
    this._drawingContext.lineTo(endPoint.X, endPoint.Y);
    this._drawingContext.stroke();
  }

  private drawText(text, pointLocation, font, color) {
    this._drawingContext.font = font;
    this._drawingContext.strokeStyle = color;
    this._drawingContext.fillText(text, pointLocation.X, pointLocation.Y)
  }

  private drawFunction() {
    this.clearLastFunction();
    this._singleVariableParse.setMathFunctionText(this._mathFunctionAsText);
    const maxMinusXValue = this._maxDisplayValue * -1;
    const yValueAtMaxMinusX = this._singleVariableParse.computeFunctionAtValue(maxMinusXValue);
    let previousPoint = new Point(maxMinusXValue, yValueAtMaxMinusX);
     // Make DRAW_FUNCTION_SCALE smaller to make plotting more accurate
    const drawFunctionScale = this._maxDisplayValue / (this.DRAW_FUNCTION_SCALE * this._maxDisplayValue);
    for (let x = maxMinusXValue; x < this._maxDisplayValue; x += drawFunctionScale) {
      const currentFunctionValue = this._singleVariableParse.computeFunctionAtValue(x);
      const xStep = x * this._xScale;
      const yStep = currentFunctionValue * this._yScale;
      const nextPoint = new Point(this._originPointLocation.X + xStep, this._originPointLocation.Y - yStep);
      this.drawLine(previousPoint, nextPoint, '#008000');
      previousPoint = nextPoint;
    }
  }

  private clearLastFunction() {
    this.clearCanvas(this._canvasWidth, this._canvasHeight);
    this.drawSquares();
    this.drawXYAxis();
    this.drawNumbersOnAxises();
  }

  private clearCanvas(canvasWidth, canvsHeight) {
    this._drawingContext.clearRect(0, 0, canvasWidth, canvsHeight);
  }
}

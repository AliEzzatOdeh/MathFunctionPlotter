import { Injectable } from '@angular/core';
import { NgxReversePolishNotationService } from './ngx-reverse-polish-notation.service';
import { NgxOperationsService } from './ngx-operations.service';

@Injectable({
  providedIn: 'root'
})
export class NgxSingleVariableFunctionParserService {
  private _operationsService: NgxOperationsService;
  private _reversePolishService: NgxReversePolishNotationService;
  private _variableName = 'x';
  private _functionAsText: string;

  constructor(opertaionsService: NgxOperationsService, reversePolishService: NgxReversePolishNotationService) {
    this._operationsService = opertaionsService;
    this._reversePolishService = reversePolishService;
  }

  public setVariableName(_variableName: string): void {
    this._variableName = _variableName;
    this._reversePolishService.setVariableName(_variableName);
  }
  public setMathFunctionText(mathFunctionText: string): void {
    if (mathFunctionText === undefined) {
      return;
    }
    this._functionAsText = mathFunctionText.replace(/\s/g, '');
    this.convertToRevesePolishFormat();
  }

  public computeFunctionAtValue(x): number {
    if (this._functionAsText === undefined) {
      return;
    }
    return this._reversePolishService.computeAtValue(x);
  }

  private convertToRevesePolishFormat() {
    const outputQueue = [];
    let outputQueueTracker = 0;
    const operatorsStack = [];
    let operandValue = '';
    for (let i = 0; i < this._functionAsText.length; i++) {
      let nextTokenToParse = this._functionAsText[i];
      if (['c', 'p', 's', 't'].includes(nextTokenToParse) && i + 2 < this._functionAsText.length &&
        this._operationsService.isOperationModelExist(this._functionAsText.substring(i, i + 3))) {
        nextTokenToParse = this._functionAsText.substring(i, i + 3);
        i = i + 2;
      }
      // only permit for one dot in number
      if (!isNaN(Number(nextTokenToParse)) || (nextTokenToParse === '.' && operandValue.indexOf('.') === -1)) {
        if (operandValue === '') {
          operandValue = nextTokenToParse;
          if (i === this._functionAsText.length - 1) {
            outputQueue[outputQueueTracker] = operandValue;
            outputQueueTracker++;
            operandValue = '';
          }
        } else {
          operandValue += nextTokenToParse;
        }
      } else if (nextTokenToParse === this._variableName) {
        if (operandValue !== '') {
          outputQueue[outputQueueTracker] = operandValue;
          outputQueueTracker++;
          operandValue = '';
        }
        outputQueue[outputQueueTracker] = this._variableName;
        outputQueueTracker++;
      } else {
        if (operandValue !== '') {
          outputQueue[outputQueueTracker] = operandValue;
          outputQueueTracker++;
          operandValue = '';
        }
        const operatorToBeProcessed = nextTokenToParse;
        if (operatorToBeProcessed === '(') {
          operatorsStack.push(operatorToBeProcessed);
        } else if (this._operationsService.isOperationModelExist(operatorToBeProcessed)) {
          if (operatorsStack.length > 0) {
            while (operatorsStack.length > 0) {
              const lastOperator = operatorsStack.pop();
              const lastOperatorModel = this._operationsService.getOperationByKey(lastOperator);
              const operationToBeProcessedModel = this._operationsService.getOperationByKey(operatorToBeProcessed);
              if (lastOperatorModel.priority >= operationToBeProcessedModel.priority) {
                outputQueue[outputQueueTracker] = lastOperator;
                outputQueueTracker++;
              } else {
                operatorsStack.push(lastOperator);
                break;
              }
            }
            operatorsStack.push(operatorToBeProcessed);
          } else {
            operatorsStack.push(operatorToBeProcessed);
          }
        } else if (operatorToBeProcessed === ')') {
          let lastOperator = operatorsStack.pop();
          while (lastOperator !== '(') {
            outputQueue[outputQueueTracker] = lastOperator;
            outputQueueTracker++;
            lastOperator = operatorsStack.pop();
            if (lastOperator === undefined) {
              throw new Error('Found open right parentheses without left one');
            }
          }
        } else {
          throw new Error('Invalid symbol fouund');
        }
      }
    }
    while (operatorsStack.length > 0) {
      const lastOperator = operatorsStack.pop();
      outputQueue[outputQueueTracker] = lastOperator;
      outputQueueTracker++;
    }

    this._reversePolishService.setOutputTokensQueue(outputQueue);
  }


}

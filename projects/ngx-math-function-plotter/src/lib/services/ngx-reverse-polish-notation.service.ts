import { Injectable } from '@angular/core';
import { NgxOperationsService } from './ngx-operations.service';

@Injectable({
  providedIn: 'root'
})
export class NgxReversePolishNotationService {
  private _outputTokensQueue: string[];
  private _variableName = 'x';
  private _operationsService: NgxOperationsService;

  constructor(operationService: NgxOperationsService) {
    this._operationsService = operationService;
  }

  public setOutputTokensQueue(outputTokensQueue: string[]): void {
    this._outputTokensQueue = outputTokensQueue;
  }

  public setVariableName(variableName: string): void {
    this._variableName = variableName;
  }

  public computeAtValue(x: number): number {
    let result = null;
    let operation = '';
    let outputQueueCopy = [...this._outputTokensQueue];
    let i = 0;

    if (outputQueueCopy.length === 1 && !this._operationsService.isOperationModelExist(outputQueueCopy[0])) {
      const operand = outputQueueCopy[0];
      if (operand === this._variableName) {
        result = x;
      } else if (!isNaN(Number(operand))) {
        result = operand;
      } else {
        throw new Error('Invalid symbol found');
      }
    } else {
      while (i < outputQueueCopy.length) {
        operation = outputQueueCopy[i];
        if (this._operationsService.isOperationModelExist(operation)) {
          let operand1 = null;
          let operand2 = null;
          let startIndex = -1;
          let endIndex = -1;

          if (operation === '(') {
            throw new Error('Found open rounded bracket without closing one');
          }

          const operationModel = this._operationsService.getOperationByKey(operation);
          const operandsCount = operationModel.operandsCount;
          const operationHandler = operationModel.handler;

          if (operandsCount === 1) {
            startIndex = i - 1;
            endIndex = i;
            operand1 = outputQueueCopy[i - 1];
            if (operand1 === this._variableName) {
              operand1 = x;
            }
            result = operationHandler(operand1);
            outputQueueCopy = this.updateOutputQueueForOperation(outputQueueCopy, startIndex, endIndex, result);
          } else if (operandsCount === 2) {
            if (i - 2 < 0) {
              startIndex = i - 1;
              endIndex = i + 1;
              operand1 = outputQueueCopy[i - 1];
              operand2 = outputQueueCopy[i + 1];
            } else {
              startIndex = i - 2;
              endIndex = i;
              operand1 = outputQueueCopy[i - 2];
              if (operand1 === this._variableName) {
                operand1 = x;
              }
              operand2 = outputQueueCopy[i - 1];
              if (operand2 === this._variableName) {
                operand2 = x;
              }
            }
            result = operationHandler(operand1, operand2);
            outputQueueCopy = this.updateOutputQueueForOperation(outputQueueCopy, startIndex, endIndex, result);
          }
          i = 0;
        } else {
          i++;
        }
      }
    }

    return result;
  }

  private updateOutputQueueForOperation(outputQueue: string[], startIndex: number, endIndex: number, result: number) {
    const outputQueueCopy = [];
    let outputQueueCopyTracker = 0;
    for (let i = 0; i < outputQueue.length; i++) {
      if (i === startIndex) {
        outputQueueCopy[outputQueueCopyTracker] = result;
        outputQueueCopyTracker++;
      } else if (i < startIndex || i > endIndex) {
        outputQueueCopy[outputQueueCopyTracker] = outputQueue[i];
        outputQueueCopyTracker++;
      }
    }
    return outputQueueCopy;
  }
}

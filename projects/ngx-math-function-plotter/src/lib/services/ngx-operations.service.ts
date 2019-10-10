import { Injectable } from '@angular/core';
import { NgxOperationKeyConstant } from '../constants/ngx-operation-key.constant';
import { NgxOperationModel } from '../models/ngx-operation.model';

@Injectable({
  providedIn: 'root'
})
export class NgxOperationsService {
  private _operationsMap: [string, NgxOperationModel][] = [];

  constructor() {
    this._operationsMap[NgxOperationKeyConstant.ADD] = {
      priority: 1, operandsCount: 2, handler: (op1, op2) => parseFloat(op1) + parseFloat(op2),
    };
    this._operationsMap[NgxOperationKeyConstant.SUBTRACT] = {
      priority: 1, operandsCount: 2, handler: (op1, op2) => parseFloat(op1) - parseFloat(op2),
    };
    this._operationsMap[NgxOperationKeyConstant.MULTIPLY] = {
      priority: 2, operandsCount: 2, handler: (op1, op2) => parseFloat(op1) * parseFloat(op2),
    };
    this._operationsMap[NgxOperationKeyConstant.DIVIDE] = {
      priority: 2, operandsCount: 2, handler: (op1, op2) => parseFloat(op1) / parseFloat(op2),
    };
    this._operationsMap[NgxOperationKeyConstant.PARANTHESIS_LEFT] = {
      priority: 0, operandsCount: 0, handler: null,
    };
    this._operationsMap[NgxOperationKeyConstant.POWER] = {
      priority: 7, operandsCount: 2, handler: (op1, op2) => Math.pow(parseFloat(op1), parseFloat(op2))
    };
    this._operationsMap[NgxOperationKeyConstant.SQUARE_ROOT] = {
      priority: 7, operandsCount: 1, handler: (op1) => Math.sqrt(parseFloat(op1)),
    };
    this._operationsMap[NgxOperationKeyConstant.SIN] = {
      priority: 7, operandsCount: 1, handler: (op1) => Math.sin(parseFloat(op1)),
    };
    this._operationsMap[NgxOperationKeyConstant.COS] = {
      priority: 7, operandsCount: 1, handler: (op1) => Math.cos(parseFloat(op1)),
    };
    this._operationsMap[NgxOperationKeyConstant.TAN] = {
      priority: 7, operandsCount: 1, handler: (op1) => Math.tan(parseFloat(op1)),
    };
    this._operationsMap[NgxOperationKeyConstant.SEQ] = {
      priority: 7, operandsCount: 1, handler: (op1) => 1 / Math.sin(parseFloat(op1)),
    };
    this._operationsMap[NgxOperationKeyConstant.CSC] = {
      priority: 7, operandsCount: 1, handler: (op1) => 1 / Math.cos(parseFloat(op1)),
    };
    this._operationsMap[NgxOperationKeyConstant.COT] = {
      priority: 7, operandsCount: 1, handler: (op1) => 1 / Math.tan(parseFloat(op1)),
    };
    this._operationsMap[NgxOperationKeyConstant.MINUS] = {
      priority: 6, operandsCount: 1, handler: (op1) => op1 * -1,
    };
  }

  public getOperationByKey(key: string): NgxOperationModel {
    return this._operationsMap[key];
  }

  public isOperationModelExist(key: string): boolean {
    return key in this._operationsMap;
  }
}

import { TestBed } from '@angular/core/testing';

import { NgxOperationKeyConstant } from '../constants/ngx-operation-key.constant';
import { NgxOperationsService } from './ngx-operations.service';

describe('NgxOperationsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    expect(service).toBeTruthy();
  });

  it('should addition operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let twoOperandsHandler: (op1: number, op2: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.ADD);
    expect(operationModel.priority).toEqual(1);
    expect(operationModel.operandsCount).toEqual(2);
    twoOperandsHandler = operationModel.handler;
    expect(twoOperandsHandler(1, 2)).toEqual(3);
  });

  it('should subtraction operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let twoOperandsHandler: (op1: number, op2: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.SUBTRACT);
    expect(operationModel.priority).toEqual(1);
    expect(operationModel.operandsCount).toEqual(2);
    twoOperandsHandler = operationModel.handler;
    expect(twoOperandsHandler(1, 2)).toEqual(-1);
  });

  it('should multiplication operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let twoOperandsHandler: (op1: number, op2: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.MULTIPLY);
    expect(operationModel.priority).toEqual(2);
    expect(operationModel.operandsCount).toEqual(2);
    twoOperandsHandler = operationModel.handler;
    expect(twoOperandsHandler(8, 2)).toEqual(16);
  });

  it('should division operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let twoOperandsHandler: (op1: number, op2: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.DIVIDE);
    expect(operationModel.priority).toEqual(2);
    expect(operationModel.operandsCount).toEqual(2);
    twoOperandsHandler = operationModel.handler;
    expect(twoOperandsHandler(8, 2)).toEqual(4);
  });

  it('should paranthesis left operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.PARANTHESIS_LEFT);
    expect(operationModel.priority).toEqual(0);
    expect(operationModel.operandsCount).toEqual(0);
    expect(operationModel.handler).toEqual(null);
  });

  it('should power operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let twoOperandsHandler: (op1: number, op2: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.POWER);
    expect(operationModel.priority).toEqual(7);
    expect(operationModel.operandsCount).toEqual(2);
    twoOperandsHandler = operationModel.handler;
    expect(twoOperandsHandler(2, 8)).toEqual(256);
  });

  it('should power operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let twoOperandsHandler: (op1: number, op2: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.POWER);
    expect(operationModel.priority).toEqual(7);
    expect(operationModel.operandsCount).toEqual(2);
    twoOperandsHandler = operationModel.handler;
    expect(twoOperandsHandler(2, 8)).toEqual(256);
  });

  it('should square root operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let oneOperandsHandler: (op1: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.SQUARE_ROOT);
    expect(operationModel.priority).toEqual(7);
    expect(operationModel.operandsCount).toEqual(1);
    oneOperandsHandler = operationModel.handler;
    expect(oneOperandsHandler(16)).toEqual(4);
  });

  it('should square root operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let oneOperandsHandler: (op1: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.SQUARE_ROOT);
    expect(operationModel.priority).toEqual(7);
    expect(operationModel.operandsCount).toEqual(1);
    oneOperandsHandler = operationModel.handler;
    expect(oneOperandsHandler(16)).toEqual(4);
  });

  it('should sin operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let oneOperandsHandler: (op1: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.SIN);
    expect(operationModel.priority).toEqual(7);
    expect(operationModel.operandsCount).toEqual(1);
    oneOperandsHandler = operationModel.handler;
    expect(oneOperandsHandler(0)).toEqual(0);
  });

  it('should cos operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let oneOperandsHandler: (op1: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.COS);
    expect(operationModel.priority).toEqual(7);
    expect(operationModel.operandsCount).toEqual(1);
    oneOperandsHandler = operationModel.handler;
    expect(oneOperandsHandler(0)).toEqual(1);
  });

  it('should tan operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let oneOperandsHandler: (op1: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.TAN);
    expect(operationModel.priority).toEqual(7);
    expect(operationModel.operandsCount).toEqual(1);
    oneOperandsHandler = operationModel.handler;
    expect(oneOperandsHandler(0)).toEqual(0);
  });

  it('should seq operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let oneOperandsHandler: (op1: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.SEQ);
    expect(operationModel.priority).toEqual(7);
    expect(operationModel.operandsCount).toEqual(1);
    oneOperandsHandler = operationModel.handler;
    expect(oneOperandsHandler(0)).toEqual(Infinity);
  });

  it('should csc operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let oneOperandsHandler: (op1: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.CSC);
    expect(operationModel.priority).toEqual(7);
    expect(operationModel.operandsCount).toEqual(1);
    oneOperandsHandler = operationModel.handler;
    expect(oneOperandsHandler(0)).toEqual(1);
  });

  it('should csc operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let oneOperandsHandler: (op1: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.COT);
    expect(operationModel.priority).toEqual(7);
    expect(operationModel.operandsCount).toEqual(1);
    oneOperandsHandler = operationModel.handler;
    expect(oneOperandsHandler(0)).toEqual(Infinity);
  });

  it('should minus operation model work as expected', () => {
    const service: NgxOperationsService = TestBed.get(NgxOperationsService);
    let oneOperandsHandler: (op1: number) => number;
    const operationModel = service.getOperationByKey(NgxOperationKeyConstant.MINUS);
    expect(operationModel.priority).toEqual(6);
    expect(operationModel.operandsCount).toEqual(1);
    oneOperandsHandler = operationModel.handler;
    expect(oneOperandsHandler(5)).toEqual(-5);
  });
});

import {Action} from "@ngrx/store";
import {Product} from "../product";

export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Toggle Product Code',
  InitializeCurrentProduct = '[Product] Toggle Product Code',

  // Actions for complexed operations
  LoadCompletion = '[Product] LoadCompletion',
  LoadSuccess = '[Product] LoadSuccess',
  LoadFailed = '[Product] LoadFailed'
}

export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {
  }
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) {
  }
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export class LoadCompletion implements Action {
  readonly type = ProductActionTypes.LoadCompletion;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: Product[]) {
  }
}

export class LoadFailed implements Action {
  readonly type = ProductActionTypes.LoadFailed;

  constructor(public payload: String) {
  }
}

export type ProductActions =
  ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | LoadCompletion
  | LoadSuccess
  | LoadFailed;

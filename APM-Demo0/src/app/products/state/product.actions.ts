import {Action} from "@ngrx/store";
import {Product} from "../product";

export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product',

  // Actions for complexed operations
  LoadCompletion = '[Product] LoadCompletion',
  LoadSuccess = '[Product] LoadSuccess',
  LoadFailed = '[Product] LoadFailed',

  // Actions for complexed update operation
  UpdateProduct = '[Product] Update Product',
  UpdateProductSuccess = '[Product] Update Product Success',
  UpdateProductFailed = '[Product] Update Product Failed'
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

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UpdateProduct;

  constructor(public payload: Product) {
  }
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductActionTypes.UpdateProductSuccess;

  constructor(public payload: Product) {
  }
}

export class UpdateProductFailed implements Action {
  readonly type = ProductActionTypes.UpdateProductFailed;

  constructor(public payload: string) {
  }
}

export type ProductActions =
  ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | LoadCompletion
  | LoadSuccess
  | LoadFailed
  | UpdateProduct
  | UpdateProductSuccess
  | UpdateProductFailed;

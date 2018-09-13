import {Product} from "../product";
import * as fromRoot from '../../state/app.state';
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ProductActionTypes} from "./product.actions";

/***************************** FEATURE STATES *****************************/
export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
}

/***************************** SELECTORS *****************************/
// create Feature Selector of Product State
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// create selectors
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products);

/***************************** REDUCER *****************************/
export function reducer(state = initialState, action): ProductState {

  console.log('existing state: ' + JSON.stringify(state));
  console.log('payload: ' + JSON.stringify(action.payload));

  switch (action.type) {

    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload.id
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload
      };
    case ProductActionTypes.UpdateProductSuccess:
      const updateProducts = state.products.map(
        item => action.payload.id === item.id? action.payload: item
      );
      return {
        ...state,
        products: updateProducts,
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.UpdateProductFailed:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

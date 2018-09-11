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
  currentProduct: Product;
  currentProductId: number;
  products: Product[]
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  currentProductId: 0,
  products: []
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
  state => state.currentProduct);

export const getCurrentProductWithProductId = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => state.products.find(p => p.id === currentProductId)
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
        currentProduct: {...action.payload}
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload
      };

    default:
      return state;
  }
}

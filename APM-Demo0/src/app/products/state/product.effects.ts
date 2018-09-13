import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {ProductService} from "../product.service";
import {catchError, map, mergeMap} from "rxjs/internal/operators";
import {of} from "rxjs/index";

import {LoadSuccess, ProductActionTypes} from "./product.actions";
import * as productActions from '../state/product.actions';
import {Product} from "../product";


@Injectable()
export class ProductEffects {

  @Effect()
  loadProduct$ = this.actions$
  // using pipe is the preferred choice of ngrx 6+
    .pipe(
      // 1- Select the action
      ofType(ProductActionTypes.LoadCompletion),

      // 2- do some work
      // merge every other emitted action calling Angular services (who return observables) then merges these
      // observables into a single stream
      mergeMap(action =>
        this.productService.getProducts().pipe(
          // 3- return a new action
          map(products => (new LoadSuccess(products))),
          catchError(err => of(new productActions.LoadFailed(err)))
        ))
    )

  @Effect()
  updateProduct = this.actions$
    .pipe(
      ofType(ProductActionTypes.UpdateProduct),
      map((action: productActions.UpdateProduct) => action.payload),
      mergeMap((product: Product) =>
        this.productService.updateProduct(product).pipe(
          map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
          catchError(err => of(new productActions.UpdateProductFailed(err)))
        )
      )
    );

  constructor(private actions$: Actions, private productService: ProductService) {
  }
}

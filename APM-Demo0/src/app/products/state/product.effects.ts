import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {LoadSuccess, ProductActionTypes} from "./product.actions";
import {ProductService} from "../product.service";
import {map, mergeMap} from "rxjs/internal/operators";

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
          map(products => (new LoadSuccess(products)))
        ))
    )

  constructor(private actions$: Actions, private productService: ProductService) {
  }
}

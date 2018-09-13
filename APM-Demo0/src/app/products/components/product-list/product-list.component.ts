import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {Product} from '../../product';
import {ProductService} from '../../product.service';
import {select, Store} from "@ngrx/store";

import * as fromProduct from '../../state/product.reducer';
import * as productActions from '../../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private store: Store<fromProduct.State>, private productService: ProductService) {
  }

  ngOnInit(): void {

    // Select Product
    // TODO: Unsubscribe
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );

    // Get Products
    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );
    // this.store.pipe(select(fromProduct.getProducts)).subscribe(products => {
    //   this.products = products;
    // })

    // [Effects] call dispatch method
    this.store.dispatch(new productActions.LoadCompletion());

    // [Effects] call dispatch method
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(currentProduct => {
      this.selectedProduct = currentProduct;
    })

    // [Effects] select state with selector
    this.store.pipe(select(fromProduct.getProducts))
      .subscribe((products: Product[]) => {
        this.products = products;
      })

    // Get flag ShowProductCode
    // TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(showProductCode => {
      this.displayCode = showProductCode;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /*checkChanged(value: boolean): void {
    this.displayCode = value;
  }*/
  // React Style inspired to handle the checkbox control, that way in the template there
  // is no need to pass the specific parameter '$event.target.checked'
  checkChanged(value: boolean): void {
    //this.displayCode = this.displayCode? false: true;
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
    // this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
    // this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}

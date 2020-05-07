import { Component, Input } from '@angular/core';
// import { IProduct, ICartProduct } from 'src/app/store/reducers/cart.reducer';
// import { Store } from '@ngrx/store';
// import { IStore } from 'src/app/store/reducers';
// import {
//   decrementProductInCart,
//   removeProductFromCart,
//   incrementProductInCart,
//   setCountProductInCart,
// } from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'ngx-shop-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.sass'],
})
export class OrderFormComponent {
  // @Input() public product!: ICartProduct;

  // constructor(private readonly _store: Store<IStore>) {}

  // public decrementProductInCart(product: ICartProduct) {
  //   if (product.count > 1) {
  //     this._store.dispatch(decrementProductInCart({ product }));
  //     return;
  //   }
  //   this._store.dispatch(removeProductFromCart({ product }));
  // }
  // public removeProductFromCart(product: ICartProduct) {
  //   this._store.dispatch(removeProductFromCart({ product }));
  // }
  // public incrementProductInCart(product: ICartProduct) {
  //   this._store.dispatch(incrementProductInCart({ product }));
  // }
  // public quantity({ target }: Event, product: ICartProduct) {
  //   const value = (target as HTMLInputElement).value;
  //   this._store.dispatch(
  //     setCountProductInCart({ product: { ...product, count: Number(value) } })
  //   );
  // }
}

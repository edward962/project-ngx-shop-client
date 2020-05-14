import { CartComponent } from './cart.component';
import { NgModule } from '@angular/core';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartProductComponent } from './cart-product/cart-product.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { CardConfirmModalComponent } from './card-confirm-modal/card-confirm-modal.component';

@NgModule({
  declarations: [
    CartComponent,
    CartProductComponent,
    OrderFormComponent,
    CardConfirmModalComponent,
  ],
  imports: [SharedModule, CartRoutingModule],
})
export class CartModule {}

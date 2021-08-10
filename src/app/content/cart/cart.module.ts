import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartProductComponent } from './cart-product/cart-product.component';
import { OrderFormComponent } from './order-form/order-form.component';

@NgModule({
	declarations: [CartComponent, CartProductComponent, OrderFormComponent],
	imports: [SharedModule, CartRoutingModule],
})
export class CartModule {}

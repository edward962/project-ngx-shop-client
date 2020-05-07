import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';


@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule
  ],
})
export class ProductModule {}

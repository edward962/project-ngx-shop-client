import { ProductsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}

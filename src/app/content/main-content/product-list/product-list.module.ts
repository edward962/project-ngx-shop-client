import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { PriceSliderComponent } from './price-slider/price-slider.component';
import { BrandsComponent } from './brands/brands.component';

@NgModule({
  declarations: [ProductListComponent,
    PriceSliderComponent,
    BrandsComponent
  ],
  imports: [SharedModule, ProductListRoutingModule],

})
export class ProductListModule {}

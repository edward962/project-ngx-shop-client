import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { PriceSliderComponent } from './price-slider/price-slider.component';
import { BrandsComponent } from './brands/brands.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ProductListService } from './product-list.service';


@NgModule({
  declarations: [ProductListComponent,
    PriceSliderComponent,
    BrandsComponent
  ],
  imports: [SharedModule, ProductListRoutingModule,  Ng5SliderModule],
  providers: [ProductListService],
})
export class ProductListModule {}

import { BrandsService } from '../../shared/services/brands.service';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PriceSliderComponent } from './price-slider/price-slider.component';
import { BrandsComponent } from './brands/brands.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryProductComponent } from './category-product/category-product.component';
import { CategoryItemComponent } from './category-item/category-item.component';



@NgModule({
  declarations: [
    CategoryComponent,
    PriceSliderComponent,
    BrandsComponent,
    CategoryProductComponent,
    CategoryItemComponent,
  ],
  imports: [SharedModule, CategoryRoutingModule, Ng5SliderModule],
  providers: [ BrandsService],
})
export class CategoryModule {}

import { BrandsService } from '../../shared/services/brands.service';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PriceSliderComponent } from './price-slider/price-slider.component';
import { BrandsComponent } from './brands/brands.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryDropdownComponent } from './category-dropdown/category-dropdown.component';
import { ProductModule } from './content/product/product.module';
import { CategoryProductComponent } from './product-card/product-card.component';



@NgModule({
  declarations: [
    CategoryComponent,
    PriceSliderComponent,
    BrandsComponent,
    CategoryProductComponent,
    CategoryDropdownComponent,

  ],
  imports: [SharedModule, CategoryRoutingModule, Ng5SliderModule, ProductModule],
  providers: [ BrandsService ],
})
export class CategoryModule {}

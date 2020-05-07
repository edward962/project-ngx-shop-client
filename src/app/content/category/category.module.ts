import { BrandsService } from '../../shared/services/brands.service';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PriceSliderComponent } from './price-slider/price-slider.component';
import { BrandsComponent } from './brands/brands.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';



@NgModule({
  declarations: [
    CategoryComponent,
    PriceSliderComponent,
    BrandsComponent,
  ],
  imports: [SharedModule, CategoryRoutingModule, Ng5SliderModule],
  providers: [ BrandsService],
})
export class CategoryModule {}

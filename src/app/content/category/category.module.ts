import { PriceInputsComponent } from './price-slider/price-inputs/price-inputs.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PriceSliderComponent } from './price-slider/price-slider.component';
import { BrandsComponent } from './brands/brands.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryDropdownComponent } from './category-dropdown/category-dropdown.component';
import { CategoryProductComponent } from './product-card/product-card.component';
import { EffectsModule } from '@ngrx/effects';
import { reducerProducts } from './store/reducers/products.reducer';
import { StoreModule } from '@ngrx/store';
import { ProductsEffects } from './store/effects/products.effect';
import { reducerBrands } from './store/reducers/brands.reducer';
import { BrandsEffects } from './store/effects/brands.effect';

@NgModule({
  declarations: [
    CategoryComponent,
    PriceSliderComponent,
    PriceInputsComponent,
    BrandsComponent,
    CategoryProductComponent,
    CategoryDropdownComponent,
  ],
  imports: [
    SharedModule,
    CategoryRoutingModule,
    Ng5SliderModule,
    StoreModule.forFeature('products', reducerProducts),
    StoreModule.forFeature('brands', reducerBrands),
    EffectsModule.forFeature([ProductsEffects, BrandsEffects]),
  ],
  providers: [],
})
export class CategoryModule {}

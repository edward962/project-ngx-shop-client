import { BannerSliderComponent } from './banner/banner.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducerSuggestedProducts } from './store/reducers/suggested-products.reducer';
import { SuggestedProductsEffects } from './store/effects/suggested-products.effect';

@NgModule({
  declarations: [
    HomeComponent,
    ProductCardComponent,
    SideMenuComponent,
    BannerSliderComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    StoreModule.forFeature('suggestedProducts', reducerSuggestedProducts),
    EffectsModule.forFeature([SuggestedProductsEffects]),
  ],
})
export class HomeModule {}

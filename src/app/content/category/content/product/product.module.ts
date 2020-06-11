import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { FeedbacksComponent } from './description/feedbacks/feedbacks.component';
import { PhotoSliderComponent } from './photo-slider/photo-slider.component';
import { DescriptionComponent } from './description/description.component';
import { InformationComponent } from './information/information.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducerProduct } from './store/reducers/product.reducer';
import { ProductEffects } from './store/effects/product.effect';

console.log(';dkfjvbnkjse rv;aud;fhbnae/lrkfna;eoviun')

@NgModule({
  declarations: [
    ProductComponent,
    DescriptionComponent,
    InformationComponent,
    PhotoSliderComponent,
    FeedbacksComponent,
  ],
  imports: [SharedModule, ProductRoutingModule,
    StoreModule.forFeature('product', reducerProduct),
    EffectsModule.forFeature([ProductEffects]),
  ],

})
export class ProductModule {
}

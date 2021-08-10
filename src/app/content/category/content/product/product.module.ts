import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { FeedbacksComponent } from './description/feedbacks/feedbacks.component';
import { DescriptionComponent } from './description/description.component';
import { InformationComponent } from './information/information.component';
import { reducerProduct } from './store/reducers/product.reducer';
import { ProductEffects } from './store/effects/product.effect';

@NgModule({
	declarations: [
		ProductComponent,
		DescriptionComponent,
		InformationComponent,
		FeedbacksComponent,
		ProductSliderComponent,
	],
	imports: [
		SharedModule,
		ProductRoutingModule,
		StoreModule.forFeature('product', reducerProduct),
		EffectsModule.forFeature([ProductEffects]),
	],
})
export class ProductModule {}

import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductInformationComponent } from './product-information/product-information.component';
import { ProductPhotoSliderComponent } from './product-photo-slider/product-photo-slider.component';
import { ProductComponent } from './product.component';
import { FeedbacksComponent } from './product-description/feedbacks/feedbacks.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDescriptionComponent,
    ProductInformationComponent,
    ProductPhotoSliderComponent,
    FeedbacksComponent,
  ],
  imports: [SharedModule, ProductRoutingModule],

})
export class ProductModule {}

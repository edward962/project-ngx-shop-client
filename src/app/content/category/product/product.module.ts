import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductInformationComponent } from './product-information/product-information.component';
import { ProductPhotoComponent } from './product-photo-slider/product-photo.component';
import { ProductComponent } from './product.component';
import { CardConfirmModalComponent } from '../../cart/card-confirm-modal/card-confirm-modal.component';
import { ModalService } from 'src/app/modal/modal.service';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDescriptionComponent,
    ProductInformationComponent,
    ProductPhotoComponent,
  ],
  imports: [SharedModule, ProductRoutingModule],
  entryComponents: [CardConfirmModalComponent],
  providers: [ ModalService ],
})
export class ProductModule {}

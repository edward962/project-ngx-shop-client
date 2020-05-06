import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { CardComponent } from 'src/app/content/products/card/card.component';
import { SideMenuComponent } from 'src/app/content/products/side-menu/side-menu.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    ProductsComponent,
    CardComponent,
    SideMenuComponent,
    CarouselComponent,
  ],
  imports: [SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}

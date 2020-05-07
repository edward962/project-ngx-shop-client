import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SideMenuComponent } from 'src/app/content/products/side-menu/side-menu.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent,
    SideMenuComponent,
    CarouselComponent,
  ],
  imports: [SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}

import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    ProductCardComponent,
    SideMenuComponent,
    CarouselComponent,
  ],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}

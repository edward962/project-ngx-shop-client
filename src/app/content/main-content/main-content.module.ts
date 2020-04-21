import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainContentComponent } from './main-content.component';
import { MainContentRoutingModule } from './main-content-routing.module';
import { CardComponent } from 'src/app/content/card/card.component';
import { SideMenuComponent } from 'src/app/content/main-content/side-menu/side-menu.component';
import { CarouselComponent } from 'src/app/content/main-content/carousel/carousel.component';

@NgModule({
  declarations: [
    MainContentComponent,
    CardComponent,
    SideMenuComponent,
    CarouselComponent,
  ],
  imports: [SharedModule, MainContentRoutingModule],
})
export class MainContentModule {}

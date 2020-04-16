import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { StarRatingComponent } from './card/star-rating/star-rating.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselDirective } from './carousel/carousel.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    StarRatingComponent,
    SideMenuComponent,
    CarouselComponent,
    CarouselDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

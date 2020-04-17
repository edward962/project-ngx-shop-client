import { ProductsService } from './shared/services/products.service';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { StarRatingComponent } from './card/star-rating/star-rating.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { CategoriesService } from './shared/services/category.service';
import { BASE_URL_TOKEN } from './config';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './shared/services/interceptor.service';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    CardComponent,
    StarRatingComponent,
    CarouselComponent,
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, MatIconModule],
  providers: [
    CategoriesService,
    ProductsService,
    {
      provide: BASE_URL_TOKEN,
      useValue: environment.baseUrl,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

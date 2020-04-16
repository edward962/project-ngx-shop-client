import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { PricePipe } from './pipes/price.pipe';
import { StarRatingComponent } from './card/star-rating/star-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    PricePipe,
    StarRatingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { ProductListModule } from './content/main-content/product-list/product-list.module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { OneProductComponent } from './content/main-content/product-list/one-product/one-product.component';
import { OneProductDescriptionComponent } from './content/main-content/product-list/one-product/one-product-description/one-product-description.component';
import { OneProductReviewsComponent } from './content/main-content/product-list/one-product/one-product-reviews/one-product-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OneProductComponent,
    OneProductDescriptionComponent,
    OneProductReviewsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    SharedModule,
    ProductListModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

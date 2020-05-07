import { ModuleWithProviders, NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { BASE_URL_TOKEN } from '../config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { RouterModule } from '@angular/router';
import { CategoriesService } from './services/category.service';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ProductsService } from './services/products.service';
import { RatePipe } from './pipes/rate.pipe';
import { ImgUrlPipe } from './pipes/img-url.pipe';
import { RatingComponent } from '../content/category/product/rating/rating.component';
import { Store } from '@ngrx/store';
import { LocalStorageService } from './services/localStorage.service';
import { addAllProductsToCart } from '../store/actions/cart.actions';
import { CartGuard } from './services/cart.guard';

@NgModule({
  declarations: [StarRatingComponent, RatePipe, RatingComponent, ImgUrlPipe],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    MatIconModule,
    HttpClientModule,
    CommonModule,
    StarRatingComponent,
    RatePipe,
    ImgUrlPipe,
  ],
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
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        CategoriesService,
        CartGuard,
        LocalStorageService,
        {
          provide: APP_INITIALIZER,
          useFactory: (
            // tslint:disable-next-line: no-any
            store: Store<any>,
            localStorageService: LocalStorageService,
          ) => () => {
            const products = localStorageService.getFromLocalStorage('cart');
            store.dispatch(addAllProductsToCart({ products }));
          },
          multi: true,
          deps: [Store, LocalStorageService],
        },
        {
          provide: BASE_URL_TOKEN,
          useValue: environment.baseUrl,
        },
      ],
    };
  }
}

import { ModuleWithProviders, NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Store } from '@ngrx/store';
import { LocalStorageService } from './services/local-storage.service';
import { addAllProductsToCart } from '../store/actions/cart.actions';
import { CartGuard } from './services/cart.guard';
import { TooltipDirective } from './directives/tooltip.derective';
import { IStore } from '../store/reducers';
import { BrandsService } from './services/brands.service';
import { IProduct } from './interfaces/product.inteface';
import { PhotoSliderComponent } from './components/photo-slider/photo-slider.component';


@NgModule({
  declarations: [
    StarRatingComponent,
    RatePipe,
    ImgUrlPipe,
    TooltipDirective,
    PhotoSliderComponent,

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    PhotoSliderComponent,
    StarRatingComponent,
    RatePipe,
    ImgUrlPipe,
    TooltipDirective,
    ],
  providers: [
    CategoriesService,
    ProductsService,
    BrandsService,
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
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        CategoriesService,
        CartGuard,
        LocalStorageService,
        {
          provide: APP_INITIALIZER,
          // tslint:disable-next-line:typedef
          useFactory: (
            store: Store<IStore>,
            localStorageService: LocalStorageService
          // tslint:disable-next-line:typedef
          ) => () => {
            const products: IProduct[] = localStorageService.getFromLocalStorage<
              IProduct
            >('cart');
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

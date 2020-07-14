import { TooltipDirective } from './directives/directive';
import { ReviewPipe } from './pipes/ review.pipe';
import { LoaderComponent } from './components/loader/loader.component';
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
import { IStore } from '../store/reducers';
import { BrandsService } from './services/brands.service';
import { IProduct } from './interfaces/product.interface';
import { Meta } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    StarRatingComponent,
    RatePipe,
    ImgUrlPipe,
    ReviewPipe,
    TooltipDirective,
    LoaderComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
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
    StarRatingComponent,
    RatePipe,
    ImgUrlPipe,
    TooltipDirective,
    LoaderComponent,
    ReviewPipe,
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
            localStorageService: LocalStorageService,
            meta: Meta
            // tslint:disable-next-line:typedef
          ) => () => {
            const products: IProduct[] = localStorageService.getFromLocalStorage<
              IProduct
            >('cart');
            meta.addTag({
              name: 'description',
              content: 'Ngx-shop',
            });
            meta.addTag({ name: 'author', content: 'JsDaddy' });
            meta.addTag({
              name: 'keywords',
              content:
                'Angular, TypeScript, Course, JavaScript, Redux, NgRx, RxJs, Pipes, Directives',
            });
            if (products.length > 0) {
              store.dispatch(addAllProductsToCart({ products }));
            }
          },
          multi: true,
          deps: [Store, LocalStorageService, Meta],
        },
        {
          provide: BASE_URL_TOKEN,
          useValue: environment.baseUrl,
        },
      ],
    };
  }
}

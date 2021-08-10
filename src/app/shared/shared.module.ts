import { ModuleWithProviders, NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { addAllProductsToCart } from '@root-store/actions/cart.actions';
import { IStore } from '@root-store/reducers';
import { Meta } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '@env/environment';
import { IProduct } from '@product-store/reducers/product.reducer';
import { TooltipDirective } from './directives/directive';
import { ReviewPipe } from './pipes/ review.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { InterceptorService } from './services/interceptor.service';
import { BASE_URL_TOKEN } from '../config';
import { CategoriesService } from './services/category.service';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ProductsService } from './services/products.service';
import { RatePipe } from './pipes/rate.pipe';
import { ImgUrlPipe } from './pipes/img-url.pipe';
import { LocalStorageService } from './services/local-storage.service';
import { CartGuard } from './services/cart.guard';
import { BrandsService } from './services/brands.service';
import { SwClassPipe } from './pipes/swclass.pipe';

@NgModule({
	declarations: [
		StarRatingComponent,
		RatePipe,
		ImgUrlPipe,
		ReviewPipe,
		TooltipDirective,
		LoaderComponent,
		SwClassPipe,
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
		SwClassPipe,
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
					// eslint-disable-next-line
          useFactory: (
							store: Store<IStore>,
							localStorageService: LocalStorageService,
							meta: Meta,
							// eslint-disable-next-line
          ) => () => {
							const products: IProduct[] =
								localStorageService.getFromLocalStorage<IProduct>('cart');
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

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { BASE_URL_TOKEN } from '../config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { RouterModule } from '@angular/router';
import { CategoriesService } from './services/category.service';
import { StarRatingComponent } from '../content/card/star-rating/star-rating.component';
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [StarRatingComponent],
  imports: [ReactiveFormsModule, FormsModule, MatIconModule, HttpClientModule, CommonModule, RouterModule],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    HttpClientModule,
    CommonModule,
    StarRatingComponent,
  ],
  providers: [CategoriesService,
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
    };
  }
}

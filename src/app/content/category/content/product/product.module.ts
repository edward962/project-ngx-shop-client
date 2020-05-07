import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductComponent } from './product.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductComponent,
        data: {
          state: 'product',
        },
      },
    ]),
  ],
})
export class ProductModule {}

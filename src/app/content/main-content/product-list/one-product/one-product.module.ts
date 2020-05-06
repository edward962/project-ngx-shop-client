import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneProductComponent } from './one-product.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '',
        component: OneProductComponent,
      },
    ]),
  ],
})
export class OneProductModule {}

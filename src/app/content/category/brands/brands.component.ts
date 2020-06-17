import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IStore } from 'src/app/store/reducers';
import { UnSubscriber } from 'src/app/shared/utils/unsubscriber';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'ngx-shop-brands',
  templateUrl: './brands.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BrandsComponent,
      multi: true,
    },
  ],
  styleUrls: ['./brands.component.sass'],
})
export class BrandsComponent extends UnSubscriber
  implements ControlValueAccessor {
  constructor(private readonly _store: Store<IStore>) {
    super();
  }
  @Input()
  public selectedBrands: string[] = [];
  public isShow = false;
  public onChange!: Function;
  public brandsToShow: string[] = [];
  public brands$: Observable<string[]> = this._store
    .select('brands', 'items')
    .pipe(takeUntil(this.unsubscribe$$));

  public writeValue(brands: string[]): void {
    this.brandsToShow = brands;
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {}

  public check(brandName: string) {
    this.onChange(brandName);
  }

  public show() {
    this.isShow = !this.isShow;
  }

  public showBrand(index: number): boolean {
    if (this.isShow) {
      return true;
    }

    if (index <= 5) {
      return true;
    }

    return false;
  }
}

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IStore } from 'src/app/store/reducers';

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
export class BrandsComponent implements ControlValueAccessor {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IStore>
  ) {}
  @Input()
  public selectedBrands: string[] = [];
  public isShow = false;
  public onChange!: Function;
  public brandsToShow: string[] = [];
  public brands$: Observable<any> = this.store.select('brands', 'items');

  writeValue(brands: string[]): void {
    this.brandsToShow = brands;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

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

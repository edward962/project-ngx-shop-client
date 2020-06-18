import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ICategory } from 'src/app/store/reducers/categories.reducer';

@Component({
  selector: 'ngx-shop-category-dropdown',
  templateUrl: './category-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CategoryDropdownComponent,
      multi: true,
    },
  ],
})
export class CategoryDropdownComponent implements ControlValueAccessor {
  @Input()
  public categories!: ICategory[];
  public currentIndex: number | null = null;
  public isShow = false;
  public onChange!: Function;
  public currentCategory?: string;

  public writeValue(): void {}
  public registerOnChange(fn: Function) {
    this.onChange = fn;
  }
  public registerOnTouched(): void {}
  public hover(index: number) {
    this.isShow = !this.isShow;
    this.currentIndex = index;
  }
  public categorySelect(subCategoryId: string) {
    this.isShow = !this.isShow;
    this.currentCategory = subCategoryId;
    this.onChange(this.currentCategory);
  }
}

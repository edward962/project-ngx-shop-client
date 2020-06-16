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
  @Input() public category!: ICategory;
  @Input() public index!: number;
  public currentIndex: number | null = null;
  public isShow = false;
  public onChange!: Function;
  public currentCategory?: any;

  public writeValue(): void {}
  public registerOnChange(fn: Function) {
    this.onChange = fn;
  }
  public registerOnTouched(): void {}
  public hover(index: number) {
    this.currentIndex = index;
    this.isShow = !this.isShow;
  }
  public categorySelect(subCategoryId: string) {
    this.currentCategory = subCategoryId;
    this.onChange(this.currentCategory);
  }
}

import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ICategory, ISubCategory } from 'src/app/store/reducers/categories.reducer';

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
  public set categories(cats: ICategory[]) {
    if (!cats) {
      return;
    }
    this.categoriesArr = cats;
    this.currentIndex = cats.findIndex(
      (category: ICategory): ISubCategory | undefined => {
        return category.subCategories?.find((subCat: ISubCategory): boolean => {
          return subCat._id === this.currentCategory;
        });
      }
    );
  };
  public categoriesArr: ICategory[] = [];

  public currentIndex: number | null = null;

  public onChange!: Function;
  public currentCategory?: string;

  public writeValue(current: string): void {
    this.currentCategory = current;
  }
  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }
  public registerOnTouched(): void { }
  public hover(index: number): void {
    this.currentIndex = index;
  }
  public categorySelect(subCategoryId: string): void {
    this.currentCategory = subCategoryId;
    this.onChange(this.currentCategory);
  }
  public current(subCategoryId: string): boolean {
    return this.currentCategory === subCategoryId;
  }
}

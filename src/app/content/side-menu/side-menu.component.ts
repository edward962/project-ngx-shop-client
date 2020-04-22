import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SideMenuComponent,
      multi: true,
    },
  ],
})
export class SideMenuComponent {
  @Input()
  public categories!: ICategory[];
  public show: string;
  public currentIndex: number | null = null;
  public currentSubCategory: any;
  public defaultValue: any;
  public onChange!: any;

constructor(
  public router: Router
){}


  hover(index: number) {
    this.currentIndex = index;
  }
  writeValue(_id: string): void {
    let currentCategory;
    for (const category of this.categories) {
      for (const subCategory of category.subCategories) {
        if (subCategory._id === _id) {
          currentCategory = subCategory;
          break;
        }
      }
      if (currentCategory) {
        break;
      }
    }
    this.currentSubCategory = currentCategory || this.defaultValue;
  }

   registerOnChange(fn: any) {
      this.onChange = fn;
   }
   registerOnTouched() {}
   public subCategoryToggle(subCategory: any) {
    this.currentSubCategory = subCategory;
    this.router.navigate(['/products', {id : subCategory._id}]);
  }
 }

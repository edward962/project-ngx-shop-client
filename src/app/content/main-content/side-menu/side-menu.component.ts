import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category.interface';

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
  public categories: ICategory[] = [];
  public show: string | undefined;
  public currentIndex: number | null = null;
  public defaultValue?: number;
  public onChange!: void;

constructor(
  public router: Router
){}

  public hover(index: number) {
    this.currentIndex = index;
  }
  // tslint:disable-next-line: variable-name
  public writeValue(_id: string): void {
    let currentCategory;
    for (const category of this.categories) {
      if (category && category.subCategories){
        for (const subCategory of category.subCategories) {
          if (subCategory._id === _id) {
            currentCategory = subCategory;
            break;
          }
        }
      }
      if (currentCategory) {
        break;
      }
    }
  }

  public registerOnChange(fn: any) {
      this.onChange = fn;
   }
  public registerOnTouched() {}
 }

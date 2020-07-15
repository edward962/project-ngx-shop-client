import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ICategory,
  ISubCategory,
} from 'src/app/store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { go } from 'src/app/store/actions/router.actions';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDropdownComponent implements OnInit {
  @Input()
  public categories!: ICategory[];
  @Input()
  public selectedSubCatId!: string;

  public currentIndex: number | null = null;
  public onChange!: Function;
  public currentCategory?: string;

  constructor(private readonly _store: Store<IStore>) {}
  public ngOnInit(): void {
    this.currentIndex = this.categories.findIndex((category: ICategory):
      | ISubCategory
      | undefined => {
      return category.subCategories?.find((subCat: ISubCategory): boolean => {
        return subCat._id === this.selectedSubCatId;
      });
    });
    this.currentCategory = this.selectedSubCatId;
  }
  public hover(index: number): void {
    this.currentIndex = index;
  }
  public categorySelect(subCategoryId: string): void {
    this.currentCategory = subCategoryId;
    this._store.dispatch(
      go({
        path: ['/category', subCategoryId],
      })
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/content/side-menu/interfaces/category.interface';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.sass']
})
export class MainContentComponent implements OnInit {
  public  categories: ICategory[] = [];
  public  categories$!: Observable<ICategory[]>;
  constructor(private  categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.getCategories();
  }
}

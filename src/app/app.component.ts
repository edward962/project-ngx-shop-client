import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from './shared/services/category.service';
import { ICategory } from './side-menu/interfaces/category.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'ngx-shop-client';
  public  categories: ICategory[] = [];
  public  categories$!: Observable<ICategory[]>;
  constructor(private  categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.getCategories();
  }
}

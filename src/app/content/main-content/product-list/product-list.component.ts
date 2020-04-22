import { Component, Input, OnInit} from '@angular/core';
import { ICategory } from 'src/app/interfaces/category.interface';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit{
  public product: IProduct[] = [];
  public categories$: Observable<ICategory[]>;
  inputForm = new FormControl('');
  id: any;
  public show: string;
  public currentIndex: number | null = null;
  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,

  ){}
  hover(index: number) {
    this.currentIndex = index;
  }
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.categories$ = this.categoriesService.getCategories();
  }
}

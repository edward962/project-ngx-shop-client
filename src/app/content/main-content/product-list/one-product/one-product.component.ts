import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/interfaces/product.interface';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.sass'],
})
export class OneProductComponent implements OnInit {
  public query: any;
  public product: any;
  public currentIndex = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    private store: Store<IStore>
  ) {}
  public isShow = false;
  public isShowDesc = true;
  public isShowFeedback = false;
  public next() {
    if (this.currentIndex === this.product.images.length - 1){
      this.currentIndex = this.currentIndex;
    } else {
      this.currentIndex += 1;
    }  }
  public prev() {
    if (this.currentIndex === 0){
      this.currentIndex = this.currentIndex;
    } else {
      this.currentIndex -= 1;
    }
  }
  public show(){
    this.isShow = !this.isShow;
  }
  public showDesc(){
    this.isShowFeedback = false;
    this.isShowDesc = true;
  }
  public showFeedback() {
    this.isShowDesc = false;
    this.isShowFeedback = true;
  }

  public async addToBusket(product: IProduct): Promise<void> {
    this.store.dispatch(addProductToCart({ product }));
  }

  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.queryParams;
    this.productsService
      .getProductById(this.query.id)
      .subscribe((product) => (this.product = product));
  }

}

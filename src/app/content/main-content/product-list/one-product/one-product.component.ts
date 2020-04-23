import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.sass']
})
export class OneProductComponent implements OnInit {
  public query: any;
  public product: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.queryParams;
    console.log(this.query)
    this.productsService.getProductById(this.query.id).subscribe( (product) => this.product = product);
    
  }
  ngDoCheck(){
    console.log( this.product);
  }

}

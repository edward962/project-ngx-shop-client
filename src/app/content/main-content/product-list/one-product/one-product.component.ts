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
  
  public isShow = false;
  public isShowDesc = true;
  public isShowFeedback = false;
  public chars = [
  '1Beginner\'s DSLR to tell the story as you see it',
  '24.2 MP, APS-C sensor, 5 fps, Dual Pixel CMOS AF',
  '3Wi-Fi, NFC, Bluetooth, vari-angle touch screen LCD',
  '4Beginner\'s DSLR to tell the story as you see it',
  '524.2 MP, APS-C sensor, 5 fps, Dual Pixel CMOS AF',
  '6Wi-Fi, NFC, Bluetooth, vari-angle touch screen LCD',
  '7Beginner\'s DSLR to tell the story as you see it',
  '824.2 MP, APS-C sensor, 5 fps, Dual Pixel CMOS AF',
  '9Wi-Fi, NFC, Bluetooth, vari-angle touch screen LCD'
  ];
  show(){
    this.isShow = !this.isShow;
  }
  showDesc(){
    this.isShowFeedback = false;
    this.isShowDesc = true;
  }
  showFeedback(){
    this.isShowDesc = false;
    this.isShowFeedback = true;
  }
  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.queryParams;
    this.productsService.getProductById(this.query.id).subscribe( (product) => this.product = product);
  }
  ngDoCheck(){
    console.log( this.product);
  }
}

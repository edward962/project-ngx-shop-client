import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent implements OnInit{

  @Output() queryBrands = new EventEmitter();
  @Input() brands: string[] | undefined;
  public isShow = false;
  public brandsToShow: string[] = [];
  public checkedBrands = ['Gorenje', 'LIEBHERR', 'Nordfrost'];
  public checked(brandName: string){
    const index = this.brandsToShow.indexOf(brandName);
    if (index === -1){
      return false;
    } else {
      return true;
    }
  }
  public check(brandName: string){
    const index = this.brandsToShow.indexOf(brandName);
    if (index === -1){
      this.brandsToShow.push(brandName);
    } else {
      this.brandsToShow.splice(index, 1);
    }
    return this.queryBrands.emit(this.brandsToShow);
  }
  public show(){
    this.isShow = !this.isShow;
  }
  ngOnInit(){
    if (this.checkedBrands){
      this.brandsToShow = this.checkedBrands;
    }
  }
}

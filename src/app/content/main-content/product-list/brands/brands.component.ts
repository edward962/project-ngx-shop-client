import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent{
  @Input() brands: string[];
  public isShow = false;
  public brandsToShow = [];
  public check(brandName: string){
    const index = this.brandsToShow.indexOf(brandName);
    if (index === -1){
      this.brandsToShow.push(brandName);
    } else {
      this.brandsToShow.splice(index, 1);
    }
  }
  public show(){
    this.isShow = !this.isShow;
  }
 }

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-shop-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass'],
})
export class BrandsComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  // tslint:disable-next-line: no-any
  public query: any;
  @Output() public queryBrands = new EventEmitter();
  @Input() public brands: string[] | undefined;
  public isShow = false;
  public brandsToShow: string[] = [];
  // tslint:disable-next-line: no-any
  public getBrands(brands: any) {
    this.activatedRoute.queryParams.subscribe(
      query => this.query = query);
    const brandsForQuery = brands.join(',');
    const { id, name, value, highValue, productName } = this.query;
    if (brandsForQuery) {
      this.router.navigate(['.'], {
        relativeTo: this.activatedRoute,
        queryParams: { id, name, value, highValue, productName, brandsForQuery },
      });
    }
  }

  public checked(brandName: string) {
    const index = this.brandsToShow.indexOf(brandName);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }

  public check(brandName: string) {
    const index = this.brandsToShow.indexOf(brandName);
    if (index === -1) {
      this.brandsToShow.push(brandName);

    } else {
      this.brandsToShow.splice(index, 1);

    }
    this.getBrands(this.brandsToShow);
    return this.queryBrands.emit(this.brandsToShow);
  }

  public show() {
    this.isShow = !this.isShow;
  }

  public showBrand(index: number): boolean {
    if (this.isShow) {
      return true;
    }

    if (index <= 5) {
      return true;
    }

    return false;
  }
}


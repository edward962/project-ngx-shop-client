import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngx-shop-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}

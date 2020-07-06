import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterOutlet, Data } from '@angular/router';
import { fadeAnimation } from './router.animation';

@Component({
  selector: 'ngx-shop-root',
  templateUrl: './app.component.html',
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public getRouterState(outlet: RouterOutlet): Data {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.state
    );
  }
  public animationStart(): void {}

  public animationEnd(): void {}
}

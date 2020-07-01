import { Component } from '@angular/core';
import { RouterOutlet, Data } from '@angular/router';
import { fadeAnimation } from './router.animation';
import { trigger, transition } from '@angular/animations';

@Component({
  selector: 'ngx-shop-root',
  templateUrl: './app.component.html',
  animations: [	trigger(
    'blockInitialRenderAnimation',
    [
      transition( ':enter', [] ),
    ]
  ), fadeAnimation],
})
export class AppComponent {
  public hideFooter = true;
  public getRouterState(outlet: RouterOutlet): Data {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.state
    );
  }
  public animationStart(): void {
    this.hideFooter = true;
  }

  public animationEnd(): void {
    this.hideFooter = false;
  }
}

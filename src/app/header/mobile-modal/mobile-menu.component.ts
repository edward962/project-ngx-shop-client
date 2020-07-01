import { Component } from '@angular/core';


@Component({
  selector: 'ngx-mobile-menu',
  templateUrl: './mobile-menu.component.html',
})
export class MobileMenuComponent {
    public close!: () => void;
    public save!: () => void;
}

import { Component, NgModule } from '@angular/core';


@Component({
  selector: 'ngx-shop-card-confirm-modal',
  templateUrl: './card-confirm-modal.component.html',
  styleUrls: ['./card-confirm-modal.component.sass'],
})
export class CardConfirmModalComponent {
  public close!: () => void;
  public save!: () => void;
}

@NgModule({
  declarations: [
    CardConfirmModalComponent],
})
export class CardConfirmModalModule { }

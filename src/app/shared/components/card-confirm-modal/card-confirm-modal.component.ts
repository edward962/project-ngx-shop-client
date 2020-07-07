import { Component, NgModule, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngx-shop-card-confirm-modal',
  templateUrl: './card-confirm-modal.component.html',
  styleUrls: ['./card-confirm-modal.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// @ts-ignore
export class CardConfirmModalComponent {
  public close!: () => void;
  public save!: () => void;
}

@NgModule({
  declarations: [CardConfirmModalComponent],
})
// @ts-ignore
export class CardConfirmModalModule {}

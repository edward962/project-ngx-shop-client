import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { createFeedbackPending } from '@product-store/actions/product.actions';
import { IFeedback } from '@product-store/reducers/product.reducer';
import { IStore } from '@root-store/reducers';
import { ModalService } from 'src/app/modal/modal.service';

@Component({
  selector: 'ngx-shop-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.sass'],
})
export class FeedbacksComponent {
  @Input()
  public feedbacks!: IFeedback[];

  constructor(
    private readonly _store: Store<IStore>,
    private readonly _modalService: ModalService
  ) {}
  public async addFeedback(): Promise<void> {
    const component = await import('./addFeedback/add-feedback.component');
    this._modalService.open({
      component: component.AddFeedbackComponent,
      context: {
        save: (value: IFeedback): void => {
          this._store.dispatch(
            createFeedbackPending({
              feedback: { ...value },
            })
          );
          this._modalService.close();
        },
        close: (): void => {
          this._modalService.close();
        },
      },
    });
  }
}

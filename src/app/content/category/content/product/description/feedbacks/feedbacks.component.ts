import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '../../../../../../store/reducers';
import { ModalService } from 'src/app/modal/modal.service';
import { createFeedbackPending } from '../../store/actions/product.actions';
import { IFeedback } from 'src/app/shared/interfaces/product.interface';

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

import { animate, style, transition, trigger } from '@angular/animations';

export const caruselSlideAnimation = [
  trigger('slideAnimation', [
    transition(':enter', [
      style({ transform: '{{translateEnter}}' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
    ], { params: { translateEnter: 'translateX(100%)' } }),
    transition(':leave', [
      style({ transform: 'translateX(0%)' }),
      animate('0.5s ease-in-out', style({ transform: '{{translateLeave}}' })),
    ], { params: { translateLeave: 'translateX(-100%)' } }),
  ]),
];

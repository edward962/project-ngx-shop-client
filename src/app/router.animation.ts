import {
  animate,
  AnimationMetadata,
  AnimationTriggerMetadata,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const rightAnimation: AnimationMetadata[] = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' })),
      ],
      { optional: true }
    ),
  ]),
];

export const leftAnimation: AnimationMetadata[] = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' })),
      ],
      { optional: true }
    ),
  ]),
];
export const customTransition: AnimationTriggerMetadata = trigger(
  'routeTransition',
  [
    transition('products => category', rightAnimation),
    transition('category => products', leftAnimation),
    transition('product => category', leftAnimation),
    transition('category => product', rightAnimation),
    transition('cart => products', leftAnimation),
    transition('products => cart', rightAnimation),
    transition('cart => category', leftAnimation),
    transition('category => cart', rightAnimation),
    transition('product => products', leftAnimation),
    transition('products => product', rightAnimation),
    transition('product => cart', rightAnimation),
    transition('cart => product', leftAnimation),
  ]
);

export const fadeAnimation = trigger('routeTransition', [
  transition('* => *', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', height: '100vh' }),
      {
        optional: true,
      }
    ),
    group([
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('1.5s ease-in-out', style({ opacity: 1 })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ opacity: 1 }),
          animate('1.5s ease-in-out', style({ opacity: 0 })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

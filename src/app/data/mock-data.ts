import { ICategory } from '../side-menu/interfaces/category.interface';

export const categories: ICategory[] = [

      {
        _id: '5e86f6611d19100f1c371702',
        name: 'Автотовары',
        subCategories: [
          {
            _id: '5e86f6611d19100f1c371703',
            name: 'Автоэлектроника и противоугонные системы',
            category: '5e86f6611d19100f1c371702'
          },
          {
            _id: '5e86f6611d19100f1c3717b3',
            name: 'Автозвук',
            category: '5e86f6611d19100f1c371702'
          }
        ]
      },
      {
        _id: '5e86f6611d19100f1c3716fe',
        name: 'Аксессуары',
        subCategories: [
          {
            _id: '5e86f6611d19100f1c3716ff',
            name: 'Для мобильных устройств',
            category: '5e86f6611d19100f1c3716fe'
          },
          {
            _id: '5e86f6611d19100f1c371700',
            name: 'Для компьютеров и ноутбуков',
            category: '5e86f6611d19100f1c3716fe'
          },
          {
            _id: '5e86f6611d19100f1c371701',
            name: 'Для бытовой техники',
            category: '5e86f6611d19100f1c3716fe'
          }
        ]
      },
      {
        _id: '5e86f6611d19100f1c36fde2',
        name: 'Офис и сеть',
        subCategories: [
          {
            _id: '5e8db88bf70475043c8d8ed3',
            name: 'Оргтехника и офисное оборудование',
            category: '5e86f6611d19100f1c36fde2'
          },
          {
            _id: '5e8db88bf70475043c8d8ed4',
            name: 'Маршрутизаторы и прочее беспроводное оборудование',
            category: '5e86f6611d19100f1c36fde2'
          },
          {
            _id: '5e86f6611d19100f1c371384',
            name: 'Профессиональное сетевое оборудование',
            category: '5e86f6611d19100f1c36fde2'
          }
        ]
      },
      {
        _id: '5e86f6611d19100f1c3719ed',
        name: 'Инструменты',
        subCategories: []
      },
      {
        _id: '5e86f6611d19100f1c369ab0',
        name: 'Бытовая техника',
        subCategories: []
      },
      {
        _id: '5e86f6611d19100f1c36cc30',
        name: 'Смартфоны',
        subCategories: []
      },
      {
        _id: '5e86f6611d19100f1c36db44',
        name: 'ТВ и Развлечения',
        subCategories: [
          {
            _id: '5e86f6611d19100f1c36ddb7',
            name: 'Игры и хобби',
            category: '5e86f6611d19100f1c36db44'
          },
          {
            _id: '5e86f6611d19100f1c36e04f',
            name: 'Аудиотехника',
            category: '5e86f6611d19100f1c36db44'
          }
        ]
      },
      {
        _id: '5e86f6611d19100f1c36e65c',
        name: 'Компьютеры',
        subCategories: [
          {
            _id: '5e86f6611d19100f1c36e65d',
            name: 'Компьютеры, ноутбуки и ПО',
            category: '5e86f6611d19100f1c36e65c'
          },
          {
            _id: '5e86f6611d19100f1c36ec5f',
            name: 'Комплектующие для ПК',
            category: '5e86f6611d19100f1c36e65c'
          },
          {
            _id: '5e86f6611d19100f1c36f7ab',
            name: 'Периферия и аксессуары',
            category: '5e86f6611d19100f1c36e65c'
          }
        ]
      }
];

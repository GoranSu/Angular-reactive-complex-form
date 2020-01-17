import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, _MatInkBarPositioner } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export class Contact {
  guid?: string;
  isActive?: boolean;
  balance?: string;
  picture?: string;
  age?: string;
  eyeColor?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: Address[] = [];
  about?: string;
}

export class Address {
  id?: string;
  streetNumber?: string;
  street?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  telephone?: Telephone[] = [];
}

export class Telephone {
  id?: string;
  number?: string;
}

const Contact_data: Contact[] = [
  {
    guid: '5ed1fd69-2d46-4834-b964-7f449a1f53f7',
    isActive: true,
    balance: '$2,582.35',
    picture: 'https://ui-avatars.com/api/?name=Nikola+Ernst',
    age: '34',
    eyeColor: 'blue',
    firstName: 'Nikola',
    lastName: 'Ernst',
    company: 'EXOSIS',
    email: 'nikola.ernst@exosis.biz',
    phone: '+1 (849) 454-2928',
    address: [
      {
        id: '1',
        streetNumber: '528',
        street: 'Campus Place',
        zipCode: '206',
        city: 'Allensworth',
        state: 'Minnesota',
        telephone: [
          {
            id: '1',
            number: '123456789'
          },
          {
            id: '2',
            number: '987654321'
          }
        ]
      },
      {
        id: '2',
        streetNumber: '527',
        street: 'Campus Place',
        zipCode: '206',
        city: 'Allensworth',
        state: 'Minnesota',
        telephone: [
          {
            id: '11',
            number: '123456789'
          },
          {
            id: '22',
            number: '987654321'
          }
        ]
      }
  ],
    about: 'Lorem incididunt sint Lorem do ut nostrud ea anim id qui.'
  },
  {
    guid: '772067bc-a61f-492e-8a80-fe0cd1e95cd7',
    isActive: false,
    balance: '$2,553.62',
    picture: 'https://ui-avatars.com/api/?name=Gustav+Helmfried',
    age: '27',
    eyeColor: 'blue',
    firstName: 'Gustav',
    lastName: 'Helmfried',
    company: 'VENOFLEX',
    email: 'gustav.helmfried@venoflex.net',
    phone: '+1 (855) 509-2581',
    address: [{
      streetNumber: '699',
      street: 'Caton Avenue',
      zipCode: '7476',
      city: 'Wescosville',
      state: 'Puerto Rico',
      telephone: [
        {
          id: '111',
          number: '123456789'
        },
        {
          id: '223',
          number: '987654321'
        }
      ]
    }],
    about: 'Do id laboris ut anim nostrud amet aute aliqua pariatur'
  },
  {
    guid: 'a36a66bd-7665-4f0d-8bd0-bddf1e0b089e',
    isActive: false,
    balance: '$1,607.16',
    picture: 'https://ui-avatars.com/api/?name=Meta+Uwe',
    age: '32',
    eyeColor: 'brown',
    firstName: 'Meta',
    lastName: 'Uwe',
    company: 'AQUOAVO',
    email: 'meta.uwe@aquoavo.info',
    phone: '+1 (995) 419-2299',
    address: [{
      id: '4',
      streetNumber: '668',
      street: 'Brightwater Court',
      zipCode: '5449',
      city: 'Brule',
      state: 'Louisiana',
      telephone: [
        {
          id: '114',
          number: '123456789'
        },
        {
          id: '210',
          number: '987654321'
        }
      ]
    }],
    about: 'Enim veniam est consequat laborum id laborum quis deserunt aliqua occaecat esse.'
  },
  {
    guid: '4b1bfdc5-81aa-4c4a-8271-7229ed932c5d',
    isActive: false,
    balance: '$2,663.07',
    picture: 'https://ui-avatars.com/api/?name=Valeria+Ingvar',
    age: '35',
    eyeColor: 'blue',
    firstName: 'Valeria',
    lastName: 'Ingvar',
    company: 'MACRONAUT',
    email: 'valeria.ingvar@macronaut.io',
    phone: '+1 (864) 520-2032',
    address: [{
      id: '7',
      streetNumber: '725',
      street: 'Tapscott Avenue',
      zipCode: '8179',
      city: 'Morriston',
      state: 'Montana',
      telephone: [
        {
          id: '01',
          number: '123456789'
        },
        {
          id: '172',
          number: '987654321'
        }
      ]
    }],
    about: 'Ut exercitation et ipsum minim cillum veniam nostrud voluptate id exercitation cillum laborum ex anim.'
  },
  {
    guid: 'b767af26-ea19-4650-bb5e-4810760b559f',
    isActive: true,
    balance: '$1,188.84',
    picture: 'https://ui-avatars.com/api/?name=Helena+Adalbert',
    age: '37',
    eyeColor: 'brown',
    firstName: 'Helena',
    lastName: 'Adalbert',
    company: 'EARBANG',
    email: 'helena.adalbert@earbang.co.uk',
    phone: '+1 (808) 554-3681',
    address: [{
      id: '3',
      streetNumber: '286',
      street: 'Pineapple Street',
      zipCode: '1908',
      city: 'Keyport',
      state: 'Vermont',
      telephone: [
        {
          id: '444',
          number: '123456789'
        },
        {
          id: '3376',
          number: '987654321'
        }
      ]
    }],
    about: 'Esse id id culpa aliqua elit quis quis minim aute.'
  },
  {
    guid: '387e8a02-1e9f-4cc6-a4ee-9c7007777d90',
    isActive: true,
    balance: '$1,174.50',
    picture: 'https://ui-avatars.com/api/?name=Bettina+Augustine',
    age: '28',
    eyeColor: 'brown',
    firstName: 'Bettina',
    lastName: 'Augustine',
    company: 'DIGIRANG',
    email: 'bettina.augustine@digirang.tv',
    phone: '+1 (912) 414-2356',
    address: [{
      id: '9',
      streetNumber: '634',
      street: 'National Drive',
      zipCode: '4544',
      city: 'Kipp',
      state: 'Oklahoma',
      telephone: [
        {
          id: '101',
          number: '123456789'
        },
        {
          id: '2298',
          number: '987654321'
        }
      ]
    }],
    about: 'Fugiat proident officia sunt in laboris.'
  },
  {
    guid: '81b8b79a-a7db-407f-a2cd-8c4e44fca37e',
    isActive: true,
    balance: '$3,052.98',
    picture: 'https://ui-avatars.com/api/?name=Olga+Barbara',
    age: '33',
    eyeColor: 'green',
    firstName: 'Olga',
    lastName: 'Barbara',
    company: 'UNEEQ',
    email: 'olga.barbara@uneeq.biz',
    phone: '+1 (936) 433-3602',
    address: [{
      id: '22',
      streetNumber: '333',
      street: 'Stockton Street',
      zipCode: '5541',
      city: 'Camino',
      state: 'North Carolina',
      telephone: [
        {
          id: '987',
          number: '123456789'
        },
        {
          id: '2201',
          number: '987654321'
        }
      ]
    }],
    about: 'Cupidatat eu eu consectetur eu consequat ea aliquip veniam fugiat deserunt pariatur et cupidatat.'
  },
  {
    guid: '19526136-2554-4e3d-8f2b-fddd71cc729f',
    isActive: true,
    balance: '$1,791.12',
    picture: 'https://ui-avatars.com/api/?name=Emil+Janine',
    age: '37',
    eyeColor: 'green',
    firstName: 'Emil',
    lastName: 'Janine',
    company: 'KENEGY',
    email: 'emil.janine@kenegy.me',
    phone: '+1 (912) 498-3942',
    address: [{
      id: '33',
      streetNumber: '476',
      street: 'Sumner Place',
      zipCode: '7158',
      city: 'Knowlton',
      state: 'Colorado',
      telephone: [
        {
          id: '118',
          number: '123456789'
        },
        {
          id: '221',
          number: '987654321'
        }
      ]
    }],
    about: 'Non magna nostrud sunt dolor laborum enim aliquip qui ea tempor.'
  },
  {
    guid: 'ce9c2351-c0ae-4325-9b4a-9e4eca241f62',
    isActive: true,
    balance: '$3,996.77',
    picture: 'https://ui-avatars.com/api/?name=Wenzeslaus+Mathias',
    age: '21',
    eyeColor: 'green',
    firstName: 'Wenzeslaus',
    lastName: 'Mathias',
    company: 'KROG',
    email: 'wenzeslaus.mathias@krog.us',
    phone: '+1 (853) 470-2303',
    address: [{
      id: '47',
      streetNumber: '346',
      street: 'Kenmore Terrace',
      zipCode: '7897',
      city: 'Martinsville',
      state: 'Hawaii',
      telephone: [
        {
          id: '115',
          number: '123456789'
        },
        {
          id: '525',
          number: '987654321'
        }
      ]
    }],
    about: 'Dolor consectetur cupidatat officia enim consequat sit ad nisi mollit laborum proident adipisicing.'
  },
  {
    guid: '795a6611-9940-412c-8f2d-0b758cfb7613',
    isActive: true,
    balance: '$1,327.39',
    picture: 'https://ui-avatars.com/api/?name=Erna+Kristina',
    age: '29',
    eyeColor: 'brown',
    firstName: 'Erna',
    lastName: 'Kristina',
    company: 'GEEKY',
    email: 'erna.kristina@geeky.com',
    phone: '+1 (906) 579-3413',
    address: [{
      id: '490',
      streetNumber: '647',
      street: 'Thornton Street',
      zipCode: '7651',
      city: 'Dyckesville',
      state: 'Oregon',
      telephone: [
        {
          id: '752',
          number: '123456789'
        },
        {
          id: '695',
          number: '987654321'
        }
      ]
    }],
    about: 'Veniam aute incididunt fugiat enim fugiat.'
  }
];

/**
 * Data source for the MyTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MyTableDataSource extends DataSource<Contact> {
  data: Contact[] = Contact_data;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Contact[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Contact[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Contact[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'firstname': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(+a.lastName, +b.lastName, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

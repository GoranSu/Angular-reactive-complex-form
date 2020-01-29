import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MyTableDialogComponent } from '../my-table-dialog/my-table-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MyTableDialogStepperComponent } from '../my-table-dialog-stepper/my-table-dialog-stepper.component';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  materialTableData:any;
  dataSource: MatTableDataSource<Contact> = new MatTableDataSource<Contact>(this.materialTableData);
  selection = new SelectionModel<Contact>(true, []);
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'picture', 'firstName', 'lastName', 'age', 'company', 'balance', 'buttons'];
  dialogRef: any;
  filterValue: string = '';
  innerWidth: any;

  constructor(private dialog: MatDialog) { }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.innerWidth = window.innerWidth;
      if(this.innerWidth < 700){
        this.displayedColumns = ['select', 'firstName', 'lastName'];
      } else {
        this.displayedColumns = ['select', 'picture', 'firstName', 'lastName', 'age', 'company', 'balance', 'buttons'];
      }
  }

  ngOnInit() {
     this.materialTableData = Object.assign(Contact_data);
     this.dataSource = new MatTableDataSource(this.materialTableData);
     this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilter() {
    this.filterValue = '';
    this.dataSource.filter = '';
  }

  // toggle select all
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    // Opens the dialog component, and disables escape button
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    // Send a custom message to component
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete the selected contacts?';

    // On dialog closing, get result and do some logic
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If there is a result, call the delete method with params
        this.selection.selected.forEach(item => {
          const index: number = this.dataSource.data.findIndex(d => d === item );
          this.dataSource.data.splice(index, 1);

          this.dataSource = new MatTableDataSource<Contact>(this.dataSource.data);
          this.dataSource.paginator = this.paginator;
        });
        this.selection = new SelectionModel<Contact>(true, []);
      }
      this.confirmDialogRef = null;
    });
  }

  deletePrompt(row) {
    // Opens the dialog component, and disables escape button
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    // Send a custom message to component
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this contact?';

    // On dialog closing, get result and do some logic
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If there is a result, call the delete method with params
        const indexOf = this.dataSource.data.findIndex(i => i.guid === row.guid);
        if (indexOf !== -1) {
          this.dataSource.data.splice(indexOf, 1);
          this.dataSource = new MatTableDataSource<Contact>(this.dataSource.data);
          this.dataSource.paginator = this.paginator;
        }  
      }
      this.confirmDialogRef = null;
    });
  }

  openDialog(action, row) {
    console.log(action, row)
    this.dialogRef = this.dialog.open(MyTableDialogComponent, {
      width: '1100px',
      data: {
        action: action,
        row: row !== null ? row : new Contact
      }
    });

    var formValue: Contact;
    this.dialogRef.componentInstance.formContent.subscribe((emittedValue: Contact) => {
      formValue = emittedValue;
    });

    this.dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) {
          return;
        } else if (result === 'edit') {
          this.openDialog('edit', row);
        } else if (result === 'delete') {
          this.deletePrompt(formValue);
        } else if (result === 'save') {
          this.createContact(formValue);
        }
      });
  }

// For new contacts
openStepperDialog() {
    this.dialogRef = this.dialog.open(MyTableDialogStepperComponent, {
      width: '600px'
    });

    var formValue: Contact;
    this.dialogRef.componentInstance.formContent.subscribe((emittedValue: Contact) => {
      formValue = emittedValue;
    });

    this.dialogRef.afterClosed()
      .subscribe(result => {
        if (!result) {
          return;
        }
        else if (result === 'save') {
          this.createContact(formValue);
        }
      });
  }

createGuid() {  
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
      return v.toString(16);  
   });
} 

  createContact(contact: Contact) {
    if(contact.guid){
      // update
      console.log('update')
    } else {
      contact.guid = this.createGuid();
      this.materialTableData.push(contact);
      this.dataSource = new MatTableDataSource(this.materialTableData);
      this.dataSource.paginator = this.paginator;
    }
  }
}

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
            number: '123412341234'
          },
          {
            id: '2',
            number: '123412341234'
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
            number: '123412341234'
          },
          {
            id: '22',
            number: '123412341234'
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
    address: [{
      streetNumber: '699',
      street: 'Caton Avenue',
      zipCode: '7476',
      city: 'Wescosville',
      state: 'Puerto Rico',
      telephone: [
        {
          id: '111',
          number: '123412341234'
        },
        {
          id: '223',
          number: '123412341234'
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
          number: '123412341234'
        },
        {
          id: '210',
          number: '123412341234'
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
          number: '123412341234'
        },
        {
          id: '172',
          number: '123412341234'
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
          number: '123412341234'
        },
        {
          id: '3376',
          number: '123412341234'
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
          number: '123412341234'
        },
        {
          id: '2298',
          number: '123412341234'
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
          number: '123412341234'
        },
        {
          id: '2201',
          number: '123412341234'
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
          number: '123412341234'
        },
        {
          id: '221',
          number: '123412341234'
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
          number: '123412341234'
        },
        {
          id: '525',
          number: '123412341234'
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
          number: '123412341234'
        },
        {
          id: '695',
          number: '123412341234'
        }
      ]
    }],
    about: 'Veniam aute incididunt fugiat enim fugiat.'
  }
];
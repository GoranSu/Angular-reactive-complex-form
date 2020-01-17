import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTableDataSource, Contact } from './my-table-datasource';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MyTableDialogComponent } from '../my-table-dialog/my-table-dialog.component';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  dataSource: MyTableDataSource;
  selection = new SelectionModel<Contact>(true, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'picture', 'firstName', 'lastName', 'age', 'company', 'balance', 'buttons'];
  dialogRef: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new MyTableDataSource(this.paginator, this.sort);
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
    console.log('briši sve');
    this.selection.selected.forEach(item => {
      console.log(item);
      const index: number = this.dataSource.data.findIndex(d => d === item);
      this.dataSource.data.slice(index);
    });
    this.selection = new SelectionModel<Contact>(true, []);
  }

// When a user clicks on a row in a list, he calls this method, with the entire row information
  openDialog(row) {
    // Opens the desired dialog component
    this.dialogRef = this.dialog.open(MyTableDialogComponent, {
      width: '1100px',
      data: {
        row: row,
        action: 'view'
      }
      });

      this.dialogRef.afterClosed()
            .subscribe(result => {
              if (!result) {
                return;
              } else if (result === 'ok') {
                // Do something
              } else if (result === 'delete') {
                console.log(row.guid);
              } else if (result === 'edit') {
                this.editDialog(row);
              }
            }
          );
  }

  editDialog(row) {
    // Opens the desired dialog component
    this.dialogRef = this.dialog.open(MyTableDialogComponent, {
      width: '1100px',
      data: {
        row: row,
        action: 'edit'
      }
      });

      this.dialogRef.afterClosed()
            .subscribe(result => {
              if (!result) {
                return;
              } else if (result === 'ok') {
                // Do something
              } else if (result === 'delete') {
                console.log(row.guid);
                this.dataSource.data.splice(row, 1);
              }
            }
          );
  }

  createContact() {
    this.dialogRef = this.dialog.open(MyTableDialogComponent, {
      width: '1100px',
      data: {
        row: new Contact,
        action: 'create'
      }
      });
  }
}
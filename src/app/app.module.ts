import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule,
MatSortModule,
MatDialogModule,
MatButtonModule, 
MatToolbarModule, 
MatExpansionModule, 
MatIconModule, 
MatTooltipModule, 
MatFormFieldModule, 
MatInputModule, 
MatTabsModule, 
MatListModule,
MatMenuModule,
MatSidenavModule,
MatCheckboxModule,
MatPaginatorModule,
MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MyTableComponent } from './my-table/my-table.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MyTableDialogComponent } from './my-table-dialog/my-table-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PhoneReactiveFormComponent } from './phone-reactive-form/phone-reactive-form.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule, 
    FormsModule,
    ReactiveFormsModule,
    MatIconModule, 
    MatToolbarModule, 
    MatListModule, 
    MatSidenavModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    NgbModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LandingPageComponent
      },
      {
        path: 'home',
        component: MyTableComponent
      }
    ])
  ],
  declarations: [ 
      AppComponent, 
      SidenavComponent, 
      MyTableComponent, 
      LandingPageComponent,
      MyTableDialogComponent,
      ConfirmDialogComponent,
      PhoneReactiveFormComponent
     ],
  bootstrap:    [ AppComponent ],
  entryComponents: [MyTableDialogComponent, ConfirmDialogComponent]
})
export class AppModule { }

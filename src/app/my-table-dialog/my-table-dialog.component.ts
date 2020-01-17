import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Contact, Address, Telephone } from '../my-table/my-table-datasource';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-my-table-dialog',
  templateUrl: './my-table-dialog.component.html',
  styleUrls: ['./my-table-dialog.component.css']
})
export class MyTableDialogComponent {
  // Define the formgroup
  contactForm: FormGroup;
  // Define the object
  contact: Contact;
  action: string;
  hide = false;

  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MyTableDialogComponent>,
    private formBuilder: FormBuilder,
    // get data from parent component
    @Inject(MAT_DIALOG_DATA) private data
  ) {

    // Fill your object with data
    this.contact = data.row;
    this.action = data.action;

    // Initialize the first level of the form
    this.contactForm = this.formBuilder.group({
      picture: [this.contact.picture ? this.contact.picture : ''],
      name: [this.contact.firstName ? this.contact.firstName : '', Validators.required],
      lname: [this.contact.lastName ? this.contact.lastName : '', Validators.required],
      age: [this.contact.age ? this.contact.age : ''],
      email: [this.contact.email ? this.contact.email : '', [Validators.required, Validators.email]],
      company: [this.contact.company ? this.contact.company : ''],

      // 1st nested array
      address: this.formBuilder.array([]),
    });

    // Method that handles populating the nested array
    this.setAddress();

    if (this.action === 'view') {
      this.contactForm.disable();
      this.hide = true;
    }
  }

  setAddress() {
    const control = <FormArray>this.contactForm.get('address');
    this.contact.address.forEach(x => {
      control.push(
        this.formBuilder.group({
          streetNumber: [x.streetNumber ? x.streetNumber : '', Validators.required],
          street: [x.street ? x.street : ''],
          zipCode: [x.zipCode ? x.zipCode : ''],
          city: [x.city ? x.city : ''],
          state: [x.state ? x.state : ''],
          // 2nd level of array
          telephone: this.setPhones(x)
        })
      );
    });
  }

  setPhones(x) {
    const arr = new FormArray([]);
    x.telephone.forEach(y => {
      arr.push(
        this.formBuilder.group({
          phones: this.formBuilder.group({
            id: [y.id ? y.id : '', Validators.required],
            number: [y.number ? y.number : '', [Validators.required, Validators.minLength(4)]]
          })
        })
      );
    });
    return arr;

  }

  saveForm() {
    console.log(this.contactForm.value);
    this.dialogRef.close('ok');
  }

  deleteAddress(index) {
    const addressFormArray = <FormArray>this.contactForm.controls.address;
    addressFormArray.removeAt(index);
  }

  // Warns the user before deletion and requires action to continue
  deleteAddressPrompt(index) {
    // Opens the dialog component, and disables escape button
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    // Send a custom message to component
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this address?';

    // On dialog closing, get result and do some logic
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If there is a result, call the delete method with params
        this.deleteAddress(index);
      }
      this.confirmDialogRef = null;
    });
  }

  addNewAddress() {
    const addressFormArray = <FormArray>this.contactForm.controls.address;
    addressFormArray.push(
      this.formBuilder.group({
          streetNumber: ['', Validators.required],
          street: ['', Validators.required],
          zipCode: ['', Validators.maxLength(5)],
          city: [''],
          state: [''],
          telephone: this.formBuilder.array([])
      }),

    );
  }

  addNewPhone(telephoneFormArray) {
    telephoneFormArray.push(
      this.formBuilder.group({
        phones: this.formBuilder.group({
          id: ['', Validators.required],
          number: ['', [Validators.required, Validators.minLength(4)]],
        })
      }));
  }

  deletePhone(telephoneFormArray, index) {
    telephoneFormArray.removeAt(index);
  }

  // Warns the user before deletion and requires action to continue
  deletePhonePrompt(control, index) {
    // Opens the dialog component, and disables escape button
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    // Send a custom message to component
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this phone?';

    // On dialog closing, get result and do some logic
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If there is a result, call the delete method with params
        this.deletePhone(control, index);
      }
      this.confirmDialogRef = null;
    });
  }

  // send contactForm
  getAddress(contactForm) {
    return contactForm['controls'].address['controls'];
  }

  // send address
  getPhones(addForm) {
    return addForm ['controls'].telephone['controls'];
  }

  // Custom error messages
  getEmailErrorMessage() {
    return this.contactForm.get('email').hasError('required') ? 'You must enter a value' :
    this.contactForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  // Custom error messages
  getZipCodeErrorMessage(addressIndex) {
    const addressA = this.contactForm.get(['address', addressIndex]);
    const zipCode = addressA.get('zipCode');
    if (zipCode.hasError('maxlength')) {
      return 'Maximum is 5 numbers.';
    }

    return null;
  }

  // Send delete command from dialog to parent (list)
  delete() {
    this.dialogRef.close('delete');
  }

  // Dont want to see the ugly html file upload?
  openFileInput() {
    document.getElementById('fileInput').click();
  }

  // Handle file
  onFileChange(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {

      // Bind to html
      this.contact.picture = event.currentTarget.result;

      // Bind to form
      this.contactForm.patchValue({
        picture: event.target.result
      });
    };
  }
}

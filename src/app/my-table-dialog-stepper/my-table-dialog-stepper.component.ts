import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Contact, Address, Telephone } from '../my-table/my-table-component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-my-table-dialog-stepper',
  templateUrl: './my-table-dialog-stepper.component.html',
  styleUrls: ['./my-table-dialog-stepper.component.css']
})
export class MyTableDialogStepperComponent {
  @Output() formContent: EventEmitter<Contact> = new EventEmitter<Contact>();

  contactForm: FormGroup;
  contact: Contact;

  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
    public dialogRef: MatDialogRef<MyTableDialogStepperComponent>,
    // get data from parent component
    @Inject(MAT_DIALOG_DATA) private data) {
      this.contactForm = this.formBuilder.group({
      picture: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [''],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      
      // Not showed in form, but used to send complete 
      // information back to list-component for delete and update
      about: [''],
      balance: [''],
      eyeColor: [''],
      guid: [''],
      isActive: [''],
      // 1st nested array
      address: this.formBuilder.array([]),
    });

    //  this.setAddress();
    // }

    // setAddress() {
    // const control = <FormArray>this.contactForm.get('address');
    // this.contact.address.forEach(x => {
    //   control.push(
    //     this.formBuilder.group({
    //       streetNumber: [x.streetNumber ? x.streetNumber : '', Validators.required],
    //       street: [x.street ? x.street : ''],
    //       zipCode: [x.zipCode ? x.zipCode : ''],
    //       city: [x.city ? x.city : ''],
    //       state: [x.state ? x.state : ''],
    //       // 2nd level of array
    //       telephone: this.setPhones(x)
    //     })
    //   );
    // });
  }

  // setPhones(x) {
  //   const arr = new FormArray([]);
  //   x.telephone.forEach(y => {
  //     arr.push(
  //       this.formBuilder.group({
  //         phones: this.formBuilder.group({
  //           id: [y.id ? y.id : '', Validators.required],
  //           number: [y.number ? y.number : '', [Validators.required, Validators.minLength(4)]]
  //         })
  //       })
  //     );
  //   });
  //   return arr;

  // }

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
    return addForm['controls'].telephone['controls'];
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

  save() {
    if (this.contactForm.valid && this.contactForm.dirty) {
      this.formContent.emit(this.contactForm.value);
      this.dialogRef.close('save');
    } else {
      console.log('no changes sent to server')
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ControlContainer, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-reactive-form',
  templateUrl: './phone-reactive-form.component.html',
  styleUrls: ['./phone-reactive-form.component.css']
})
export class PhoneReactiveFormComponent implements OnInit {
  public phoneFormGroup: FormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private formBuilder: FormBuilder) {

    this.phoneFormGroup = this.formBuilder.group({
      id: [''],
      number: ['', [Validators.required, Validators.minLength(12)]]
    });
  }
  ngOnInit() {
    this.phoneFormGroup = <FormGroup>this.controlContainer.control;
  }

  getErrorMessage() {
    const numberFC = this.phoneFormGroup.get('number');

    if (numberFC.hasError('required')) {
      return 'Number is required.';
    }

    if (numberFC.value.toString().length !== 12) {
        numberFC.setErrors({
            'errorLength': true
        });
    } else if (numberFC.value.toString().length === 12) {
      numberFC.setErrors(null);
    }
    if (numberFC.hasError('errorLength')) {
        return 'Value can be 4 characters long.';
    }
  }
}

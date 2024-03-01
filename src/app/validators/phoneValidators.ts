import { AbstractControl, ValidatorFn } from '@angular/forms';

export function russianPhoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.value == "") {
      return null;
    }
    const valid = /^((\+7|7|8)+([0-9]){10})$/.test(control.value);
    return valid ? null : { 'invalidPhone': { value: control.value } };
  };
}
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const noWhitespaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}

export const validationOfEmailsFormControl: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newEmail = control.get('newEmail');
  const confirmEmail = control.get('confirmEmail');
  return newEmail && confirmEmail && newEmail.value !== confirmEmail.value ? { 'confirmTwoEmail': true } : null;
}
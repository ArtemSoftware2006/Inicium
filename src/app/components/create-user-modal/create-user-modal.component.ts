import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../entities/user';
import { russianPhoneNumberValidator } from '../../validators/phoneValidators';
import { AppButtonComponent } from '../UI/app-button/app-button.component';
import { AppInputComponent } from '../UI/app-input/app-input.component';
import { ModalComponent } from '../UI/modal/modal.component';

@Component({
  selector: 'app-create-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule, AppButtonComponent, AppInputComponent, ModalComponent, NgIf],
  templateUrl: './create-user-modal.component.html',
  styleUrl: './create-user-modal.component.scss'
})
export class CreateUserModalComponent {

  @Input() display = true;
  @Output() close = new EventEmitter();
  @Output() createUser : EventEmitter<User> = new EventEmitter();

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    surname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, russianPhoneNumberValidator()]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.userForm.valid) {
      const user = {
        name: this.userForm.value.name!,
        surname: this.userForm.value.surname!,
        email: this.userForm.value.email!,
        phone: this.userForm.value.phone!,
        selected: false
      };
      this.createUser.emit(user);
    }
  }

  onCancel() {
    this.close.emit();
  }
}

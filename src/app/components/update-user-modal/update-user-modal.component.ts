import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../UI/modal/modal.component';
import { User } from '../../entities/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { russianPhoneNumberValidator } from '../../validators/phoneValidators';
import { AppInputComponent } from '../UI/app-input/app-input.component';

@Component({
  selector: 'app-update-user-modal',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule, AppInputComponent],
  templateUrl: './update-user-modal.component.html',
  styleUrl: './update-user-modal.component.scss'
})
export class UpdateUserModalComponent implements OnChanges {

  @Input() display: boolean = false;
  @Input() user? : User;
  @Output() close = new EventEmitter();
  @Output() updateUser : EventEmitter<User> = new EventEmitter();
  userUpdateForm : FormGroup = new FormGroup({});

  constructor (private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.userUpdateForm = this.fb.group({
      name: [this.user?.name, [Validators.required, Validators.minLength(2)]],
      surname: [this.user?.surname, [Validators.required, Validators.minLength(2)]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [this.user?.phone, [Validators.required, russianPhoneNumberValidator()]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user && this.user) {
      setTimeout(() => {
        this.userUpdateForm.setValue({
          name: this.user?.name || '',
          surname: this.user?.surname || '',
          email: this.user?.email || '',
          phone: this.user?.phone || '',
        });
      });
    }
  }

  onSubmit() {
    if (this.userUpdateForm?.valid) {
      const user = {
        name: this.userUpdateForm.value.name!,
        surname: this.userUpdateForm.value.surname!,
        email: this.userUpdateForm.value.email!,
        phone: this.userUpdateForm.value.phone!,
        selected: false
      };
      this.user = user;
      this.updateUser.emit(user);
    }
  }
  onCancel() {
    this.close.emit();
  }

}

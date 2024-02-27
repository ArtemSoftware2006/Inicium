import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from '../app-button/app-button.component';

@Component({
  selector: 'app-create-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule, AppButtonComponent, NgIf],
  templateUrl: './create-user-modal.component.html',
  styleUrl: './create-user-modal.component.scss'
})
export class CreateUserModalComponent {

  @Input() display = true;
  @Output() close = new EventEmitter();

  userForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }

  onCancel() {
    this.close.emit();
  }
  onBackgroundClick() {
    this.close.emit();
  }
}

import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppButtonComponent } from '../UI/app-button/app-button.component';
import { ModalComponent } from '../UI/modal/modal.component';

@Component({
  selector: 'app-delete-user-modal',
  standalone: true,
  imports: [AppButtonComponent, ModalComponent, NgIf],
  templateUrl: './delete-user-modal.component.html',
  styleUrl: './delete-user-modal.component.scss'
})
export class DeleteUserModalComponent {
  @Input() display = false;
  @Input() countRows = 0;
  @Output() close : EventEmitter<boolean> = new EventEmitter<boolean>();

  onSubmit() {
    this.close.emit(true);
  }

  onCancel() {
    this.close.emit(false);
  }
  onBackgroundClick() {
    this.close.emit(false);
  }
}

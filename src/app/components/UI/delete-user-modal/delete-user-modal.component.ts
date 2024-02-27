import { AppButtonComponent } from './../app-button/app-button.component';
import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-user-modal',
  standalone: true,
  imports: [AppButtonComponent, NgIf],
  templateUrl: './delete-user-modal.component.html',
  styleUrl: './delete-user-modal.component.scss'
})
export class DeleteUserModalComponent {
  @Input() display = false;
  @Input() rowsCount = 0;
  @Output() close = new EventEmitter();

  onSubmit() {
    
  }

  onCancel() {
    this.close.emit();
  }
  onBackgroundClick() {
    this.close.emit();
  }
}

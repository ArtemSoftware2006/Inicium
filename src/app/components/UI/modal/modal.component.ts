import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppButtonComponent } from '../app-button/app-button.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [AppButtonComponent, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() display = true;
  @Input() disableSubmit = false;
  @Input() textButton = "";
  @Input() title = "";
  @Output() submit = new EventEmitter()
  @Output() close : EventEmitter<boolean> = new EventEmitter<boolean>();

  onCancel() {
    this.close.emit(false);
  }
  onBackgroundClick() {
    this.close.emit(false);
  }

  onSubmit() {
    this.submit.emit();
  }
}


import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
    @Output() click = new EventEmitter();

    onClick() {
      this.click.emit();
    }
}

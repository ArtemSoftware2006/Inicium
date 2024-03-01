import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../entities/user';

@Component({
  selector: 'app-table-row',
  standalone: true,
  imports: [],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss'
})
export class TableRowComponent {
  @Input() user : User = {
    name : '',
    surname : '',
    phone : '',
    email : '',
    selected : false
  }
  @Output() updateUser = new EventEmitter<User>();
  @Output() selectChange = new EventEmitter();

  onSelectChange(event: EventTarget|null) {
    if (event) {
      const target = event as HTMLInputElement;
      this.user.selected = target.checked;
      this.selectChange.emit();
    }
  }
  onRowClick() {
    this.updateUser.emit(this.user);
  }
}
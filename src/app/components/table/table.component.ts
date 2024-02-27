import { Component } from '@angular/core';
import { IconButtonComponent } from '../UI/icon-button/icon-button.component';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user';
import { TableRowComponent } from '../table-row/table-row.component';
import { CreateUserModalComponent } from '../UI/create-user-modal/create-user-modal.component';
import { DeleteUserModalComponent } from '../UI/delete-user-modal/delete-user-modal.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [IconButtonComponent, TableRowComponent, DeleteUserModalComponent, CreateUserModalComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  users : User[] = [];
  isDisplayCreateUserModal = false; 
  isDisplayDeleteUsersModal = false;
  countDeleteRows = 0;

  constructor(public userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  addUserClick() {
    this.isDisplayCreateUserModal = true;
  } 

  onCreateUserModalClose() {
    this.isDisplayCreateUserModal = false;
  }
  onDeleteUsersModalClose() {
    this.isDisplayDeleteUsersModal = false;
  }

  onSelectChange() {
    console.log(this.users);
  }

  isIndeterminate() {
    const selectedUsers = this.users.filter(user => user.selected);
    return selectedUsers.length > 0 && selectedUsers.length < this.users.length;
  }

  deleteUsersClick() {
    this.isDisplayDeleteUsersModal = true;
    this.countDeleteRows = this.users.filter(user => user.selected).length;
    this.users = this.users.filter(user => user.selected === false);
  }
}

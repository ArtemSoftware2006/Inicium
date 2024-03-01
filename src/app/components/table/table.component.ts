import { User } from '../../models/user';
import { Component } from '@angular/core';
import { IconButtonComponent } from '../UI/icon-button/icon-button.component';
import { UserService } from '../../services/user/user.service';
import { TableRowComponent } from '../table-row/table-row.component';
import { ModalComponent } from '../UI/modal/modal.component';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';
import { UpdateUserModalComponent } from '../update-user-modal/update-user-modal.component';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [IconButtonComponent, TableRowComponent, DeleteUserModalComponent, UpdateUserModalComponent, CreateUserModalComponent, ModalComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  selectedUser: User = {} as User;
  users : User[] = [];
  isDisplayCreateUserModal = false; 
  isDisplayDeleteUsersModal = false;
  isDisplayUpdateUsersModal = false;
  countDeleteRows = 0;

  constructor(public userService : UserService) { }

  ngOnInit(): void {
    const storedUsersString = localStorage.getItem('users');
    if (storedUsersString) {
        const storedUsers = JSON.parse(storedUsersString);
        if (storedUsers) {
          this.users = storedUsers;
        }
    }
    else {
      this.userService.getUsers().subscribe((users) => {
        this.users = users;
      })
    }
  }

  sortTable(key: keyof User) {
    this.users.sort((a, b) => {
      if (a[key] && b[key]) {
        if (a[key]! < b[key]!) {
          return -1;
        }
        if (a[key]! > b[key]!) {
          return 1;
        } 
      }  
      return 0;
    });
  }

  addUserClick() {
    this.isDisplayCreateUserModal = true;
  } 

  onCreateUserModalClose() {
    this.isDisplayCreateUserModal = false;
  }

  onCreateUserModalSubmit(user : User) {
    this.users = [...this.users, user];
    this.isDisplayCreateUserModal = false;
  }

  onDeleteUsersModalClose(result : boolean) {
    if (result) {
      this.users = this.users.filter(user => user.selected === false);
    }
    this.isDisplayDeleteUsersModal = false;
  }

  onSelectChange() { }

  isIndeterminate() {
    const selectedUsers = this.users.filter(user => user.selected);
    return selectedUsers.length > 0 && selectedUsers.length < this.users.length;
  }

  checkAllRows(value : boolean) {
    this.users = this.users.slice().map(user => {
      return {...user, selected: value};
    });
  }


  deleteUsersClick() {
    this.countDeleteRows = this.users.filter(user => user.selected).length;
    this.isDisplayDeleteUsersModal = true;
  }

  onUpdateUserModalClose() {
    this.isDisplayUpdateUsersModal = false;
  }
  onUpdateUserModalSubmit(user: User) {
    const changedUserIndex = this.users.findIndex(usr => usr == this.selectedUser);
    if (changedUserIndex !== -1) {
      this.users[changedUserIndex] = user;
      this.isDisplayUpdateUsersModal = false;
    }
  }
  onRowClick(user: User) {
    this.selectedUser = user;
    this.isDisplayUpdateUsersModal = true;
  }
  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
  deleteStoredUsers() {
    localStorage.removeItem('users');
    this.users = [];
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }
}

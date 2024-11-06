import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersListResponse } from '../../types/users-list-response.type';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  userSelectedIndex: number | undefined;

  @Input({ required: true }) usersList!: UsersListResponse;

  @Output('onUserSelected') onUserSelectedEmit = new EventEmitter<number>();

  onUserSelected(index: number) {
    this.userSelectedIndex = index;
    this.onUserSelectedEmit.emit(index);
  }
}

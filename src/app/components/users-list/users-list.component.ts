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
  @Input({ required: true }) isInEditMode: boolean = false;

  @Output('onUserSelected') onUserSelectedEmit = new EventEmitter<number>();

  onUserSelected(index: number) {
    // ser estiver em mode de edição ira retorna nada imediatamente, com isso, não irá prosseguir/ignorar com o código abaixo.
    // em resumo, quando um usuário estiver selecionado e estiver em nodo de edição, não será possível selecionar outro usuário.
    if (this.isInEditMode) return;

    this.userSelectedIndex = index;
    this.onUserSelectedEmit.emit(index);
  }
}

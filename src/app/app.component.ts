import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response.type';
import { take } from 'rxjs';
import { IUser } from './interfaces/user/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isInEditMode: boolean = false;
  enableSaveButton: boolean = false;
  userFormUpdated: boolean = false;

  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;

  usersList: UsersListResponse = [];

  constructor(
    private readonly _usersService: UsersService,
    private readonly _matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._usersService
      .getUsers()
      .pipe(take(1))
      .subscribe((usersResponse) => (this.usersList = usersResponse));
  }

  onUserSelected(userIndex: number) {
    const userFound = this.usersList[userIndex];

    if (userFound) {
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(userFound);
    }
  }

  onCancelButton() {
    if (this.userFormUpdated) {
      const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'O Formulário for alterado',
          message: 'Deseja realmente cancelar as alterações feitas no formulário?'
        }
      })

      dialogRef.afterClosed().subscribe((value: boolean) => {
        // quando for false vai voltar, ou seja sair do dialog e continuar a tela de edição.
        if (!value) return;

        // se for true, irá cancelar a operação, voltado para o modo de consulta e definir que o formulário não foi mas atualizado (ou seja voltar no zero).
        this.isInEditMode = false;
        this.userFormUpdated = false;
      })

    } else {
      this.isInEditMode = false;
    }
  }

  onEditButton() {
    this.isInEditMode = true;
  }

  onFormStatusChange(formStatus: boolean) {
    setTimeout(() => {
      this.enableSaveButton = formStatus;
    }, 0);
  }

  onUserFormFirstChange() {
    this.userFormUpdated = true;
  };
}

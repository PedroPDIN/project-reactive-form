import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response.type';
import { take } from 'rxjs';
import { IUser } from './interfaces/user/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { IDialogConfirmationData } from './interfaces/dialog-confirmation-data.interface';
import { UpdateUserService } from './services/update-user.service';
import { UserFormRawValueService } from './services/user-form-raw-value.service';
import { convertUserFormToUser } from './utils/convert-user-form-to-user';

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
    private readonly _updateUserService: UpdateUserService,
    private readonly _userFormRawValueService: UserFormRawValueService,
    private readonly _matDialog: MatDialog
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
      // const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      //   data: {
      //     title: 'O Formulário for alterado',
      //     message:
      //       'Deseja realmente cancelar as alterações feitas no formulário?',
      //   },
      // });

      // dialogRef.afterClosed().subscribe((value: boolean) => {
      //   // quando for false vai voltar, ou seja sair do dialog e continuar a tela de edição.
      //   if (!value) return;

      //   // se for true, irá cancelar a operação, voltado para o modo de consulta e definir que o formulário não foi mas atualizado (ou seja voltar no zero).
      //   this.isInEditMode = false;
      //   this.userFormUpdated = false;
      // });

      const dataCancel: IDialogConfirmationData = {
        title: 'O Formulário for alterado',
        message:
          'Deseja realmente cancelar as alterações feitas no formulário?',
      };

      this.openConfirmationDialog(dataCancel, (value: boolean) => {
        // quando for false vai voltar, ou seja sair do dialog e continuar a tela de edição.
        if (!value) return;

        // se for true, irá cancelar a operação, voltado para o modo de consulta e definir que o formulário não foi mas atualizado (ou seja voltar no zero).
        this.isInEditMode = false;
        this.userFormUpdated = false;
      });
    } else {
      this.isInEditMode = false;
    }
  }

  onSaveButton() {
    const dataSave: IDialogConfirmationData = {
      title: 'Confirmar alteração de dados',
      message: 'Deseja realmente salvar os valores alterados',
    };

    this.openConfirmationDialog(dataSave, (value: boolean) => {
      // condição de quando o usuário clicou em salvar ele interagiu com botão de não, o dialog/modal fecha e o usuário continuar em modo de edição.
      if (!value) return;

      this.saveUserInfos();

      this.isInEditMode = false;
      this.userFormUpdated = false;
    });
  }

  onEditButton() {
    this.userSelected = structuredClone(this.userSelected);
    this.isInEditMode = true;
  }

  onFormStatusChange(formStatus: boolean) {
    setTimeout(() => {
      this.enableSaveButton = formStatus;
    }, 0);
  }

  onUserFormFirstChange() {
    this.userFormUpdated = true;
  }

  private openConfirmationDialog(
    data: IDialogConfirmationData,
    callback: (value: boolean) => void
  ) {
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      data,
    });

    // capturamos o boolean do subscribe e atribuirmos ao callbak.
    dialogRef.afterClosed().subscribe(callback);
  }

  private saveUserInfos() {
    const newUser: IUser = convertUserFormToUser(this._userFormRawValueService.userFormRawValue);

    this._updateUserService
      .updateUser(newUser)
      .subscribe((newUserResponse: IUser) => {
        if (this.userSelectedIndex === undefined) return;

        this.usersList[this.userSelectedIndex] = newUserResponse;
        this.userSelected = structuredClone(newUserResponse);
      });
  }
}

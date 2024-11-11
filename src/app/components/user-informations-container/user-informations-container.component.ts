import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss',
})
export class UserInformationsContainerComponent extends UserFormController implements OnChanges {
  currentTabIndex: number = 0;

  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) userSelected: IUser = {} as IUser;

  ngOnChanges(changes: SimpleChanges): void {
    this.currentTabIndex = 0; // Quando houver mudanças no Input, o index do Tab, volta para o inicio (no caso volta para tab "Geral").

    // Verificando se os dados do usuário selecionada esteja preenchido ou seja não esteja vazio.
    const HAS_USER_SELECTED = changes['userSelected'] && Object.keys(changes['userSelected'].currentValue).length > 0;

    if (HAS_USER_SELECTED) {
      // Também a possibilidade de passar para o parâmetro do método 'fulFillUserForm' o valor 'changes['userSelected'].currentValue', daria o mesmo resultado final.
      // Pois, o currentValue também é o valor do usuário selecionado.
      this.fulFillUserForm(this.userSelected);
    }
  }
}

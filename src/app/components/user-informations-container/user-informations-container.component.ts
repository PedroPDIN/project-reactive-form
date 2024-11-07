import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss',
})
export class UserInformationsContainerComponent implements OnChanges {
  currentTabIndex: number = 0;

  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) userSelected: IUser = {} as IUser;

  ngOnChanges(_: SimpleChanges): void {
    this.currentTabIndex = 0; // Quando houver mudanças no Input, o index do Tab, volta para o inicio (no caso volta para tab "Geral").
  }
}

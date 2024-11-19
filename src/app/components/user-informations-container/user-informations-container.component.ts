import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesList } from '../../types/countries-list.type';
import { CountriesService } from '../../services/countries.service';
import { distinctUntilChanged, take } from 'rxjs';
import { StatesList } from '../../types/states-list.type';
import { StatesService } from '../../services/states.service';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss',
})
export class UserInformationsContainerComponent
  extends UserFormController
  implements OnInit, OnChanges
{
  currentTabIndex: number = 0;

  countriesList: CountriesList = [];
  statesList: StatesList = [];

  private readonly _countriesService = inject(CountriesService);
  private readonly _statesService = inject(StatesService);

  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) userSelected: IUser = {} as IUser;

  @Output('onFormStatusChange') onFormStatusChangeEmit = new EventEmitter<boolean>();

  ngOnInit() {
    this.onUserFormStatusChange();
    this.getCountriesList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentTabIndex = 0; // Quando houver mudanças no Input, o index do Tab, volta para o inicio (no caso volta para tab "Geral").

    // Verificando se os dados do usuário selecionada esteja preenchido ou seja não esteja vazio.
    const HAS_USER_SELECTED =
      changes['userSelected'] &&
      Object.keys(changes['userSelected'].currentValue).length > 0;

    if (HAS_USER_SELECTED) {
      // Também a possibilidade de passar para o parâmetro do método 'fulFillUserForm' o valor 'changes['userSelected'].currentValue', daria o mesmo resultado final.
      // Pois, o currentValue também é o valor do usuário selecionado.
      this.fulFillUserForm(this.userSelected);

      this.getStatesList(this.userSelected.country);
    }
  }

  countrySelectedEmit(countryName: string) {
    this.getStatesList(countryName);
  }

  private onUserFormStatusChange() {
    this.userForm.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.onFormStatusChangeEmit.emit(this.userForm.valid));
  }

  private getStatesList(country: string) {
    this._statesService
      .getStates(country)
      .pipe(take(1))
      .subscribe((statesList: StatesList) => {
        this.statesList = statesList;
      });
  }

  private getCountriesList() {
    this._countriesService
      .getCountries()
      .pipe(take(1))
      .subscribe((countriesList: CountriesList) => {
        this.countriesList = countriesList;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response.type';
import { take } from 'rxjs';
import { IUser } from './interfaces/user/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isInEditMode: boolean = false;

  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;

  usersList: UsersListResponse = [];

  constructor(
    private readonly _countriesService: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UsersService
  ) {}

  ngOnInit(): void {
    // this._countriesService.getCountries().subscribe((countriesResponse) => {
    //   console.log(countriesResponse);
    // })

    // this._statesService.getStates('Brazil').subscribe((stateResponse) => {
    //   console.log(stateResponse);
    // })

    // this._citiesService.getCities('Brazil', 'Pará').subscribe((citiesResponse) => {
    //   console.log(citiesResponse);
    // });

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
    this.isInEditMode = false;
  }

  onEditButton() {
    this.isInEditMode = true;
  }
}

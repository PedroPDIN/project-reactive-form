import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _countriesService: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this._countriesService.getCountries().subscribe((countriesResponse) => {
      console.log(countriesResponse);
    })

    this._statesService.getStates('Brazil').subscribe((stateResponse) => {
      console.log(stateResponse);
    })

    this._citiesService.getCities('Brazil', 'Pará').subscribe((citiesResponse) => {
      console.log(citiesResponse);
    });

    this._usersService.getUsers().subscribe((usersResponse) => {
      console.log(usersResponse);
    })
  }

}

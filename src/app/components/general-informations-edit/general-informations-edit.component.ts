import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list.type';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { StatesList } from '../../types/states-list.type';
import { maritalStatusArray } from '../../utils/marital-status-description-map';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss',
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges {
  countriesListFiltered: CountriesList = [];
  stateListFiltered: StatesList = [];

  @Input({ required: true }) userForm!: FormGroup;
  @Input({ required: true }) countriesList: CountriesList = [];
  @Input({ required: true }) statesList: StatesList = [];

  @Output('countrySelectedEmit') onCountrySelectedEmit = new EventEmitter<string>();

  ngOnInit() {
    this.watchCountryFormChangesAndFilter();
    this.watchStateFormChangesAndFilter();
  }

  ngOnChanges(_: SimpleChanges) {
    // quando a requisição for feita e logo após passar os valores para este componente, o próprio será altera alterado (countriesList). Conseguimos "capturar" essa mudança através do ngOnChanges.
    // Com isso, os valores é passado para a propriedade "countriesListFiltered" como sendo o valor inicial
    this.countriesListFiltered = this.countriesList;
    this.stateListFiltered = this.statesList;
  }

  get emailControl(): FormControl {
    return this.userForm.get('generalInformations.email') as FormControl;
  }

  get countryControl(): FormControl {
    return this.userForm.get('generalInformations.country') as FormControl;
  }

  get stateControl(): FormControl {
    return this.userForm.get('generalInformations.state') as FormControl;
  }

  get maritalStatusArray() {
    return maritalStatusArray;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    this.onCountrySelectedEmit.emit(event.option.value);
  }

  private watchCountryFormChangesAndFilter() {
    // acessando o "countryControl", para ter certeza de que a requisição passado para o valor foi preenchido no control ou seja no formulário.
    // Ou seja, depois de selecionar o usuário. Garantindo fazer o filtro com o control preenchido.

    // também funcionaria da mesma forma
    this.countryControl.valueChanges.subscribe(
      this.filterCountriesList.bind(this)
    ); // utilizando o bind para corrigir o erro de contexto da classe.
    // this.countryControl.valueChanges.subscribe((value: string) => this.filterCountriesList(value));
  }

  private filterCountriesList(searchTerm: string): void {
    if (!searchTerm) return;

    this.countriesListFiltered = this.countriesList.filter((country) => {
      return country.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
    });
  }

  private watchStateFormChangesAndFilter() {
    this.stateControl.valueChanges.subscribe(this.filterStateList.bind(this));
  }

  private filterStateList(searchTerm: string) {
    if (!searchTerm) return;

    this.stateListFiltered = this.statesList.filter((state) => {
      return state.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
    });
  }
}

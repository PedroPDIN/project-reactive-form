import { CountriesList } from "../../types/countries-list.type";
import { IBaseCountriesResponse } from "../base-countries-response.interface";

export interface ICountriesResponse extends IBaseCountriesResponse {
  data: CountriesList;
}

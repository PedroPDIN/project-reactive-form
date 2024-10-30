import { StatesList } from "../../types/states-list.type";

export interface IStatesResponseData {
  name: string;
  iso3: string;
  states: StatesList;
}

import { UserFormDependentList } from "../../types/user-form-dependent-list.type";
import { IUserFormContactInformations } from "./user-form-contact-informations.interface";
import { IUserFormGeneralInformations } from "./user-form-general-informations.interface";

export interface IUserForm {
  generalInformations: IUserFormGeneralInformations;
  contactInformations: IUserFormContactInformations;
  dependentsList: UserFormDependentList;
}

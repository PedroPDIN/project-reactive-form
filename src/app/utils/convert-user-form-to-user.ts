import { IUserFormGeneralInformations } from "../interfaces/user-form/user-form-general-informations.interface";
import { IUserForm } from "../interfaces/user-form/user-form.interface";
import { IUser } from "../interfaces/user/user.interface";
import { AddressList } from "../types/address.list.type";
import { DependentsList } from "../types/dependents-list.type";
import { PhoneList } from "../types/phone-list.types";
import { UserFormAddressList } from "../types/user-form-address-list.type";
import { UserFormDependentList } from "../types/user-form-dependent-list.type";
import { UserFormPhoneList } from "../types/user-form-phone-list.type";
import { convertDateObjToPtBrDate } from "./convert-date-obj-to-pt-br-date";
import { formatNumber } from "./format-number";

export const convertUserFormToUser = (userForm: IUserForm): IUser => {
  let newUser: Partial<IUser> = {} as IUser;

  newUser = { ...convertGeneralInformations(userForm.generalInformations) };
  newUser.phoneList = [...convertPhoneList(userForm.contactInformations.phoneList)];
  newUser.addressList = [...convertAddressList(userForm.contactInformations.addressList)];
  newUser.dependentsList = [...convertDependentsList(userForm.dependentsList)];

  return newUser as IUser;
}

const convertGeneralInformations = (generalInformations: IUserFormGeneralInformations): Partial<IUser> => {
  return {
    name: generalInformations.name,
    email: generalInformations.email,
    country: generalInformations.country,
    state: generalInformations.state,
    maritalStatus: generalInformations.maritalStatus,
    monthlyIncome: generalInformations.monthlyIncome,
    birthDate: convertDateObjToPtBrDate(generalInformations.birthDate),
  };
}

const convertPhoneList = (phoneList: UserFormPhoneList): PhoneList => {
  const newUserPhoneList = phoneList
    .map((phone) => ({
      type: phone.type,
      internationalCode: '+' + phone.number.substring(0, 2),
      areaCode: phone.number.substring(2, 4),
      number: formatNumber(phone.number.substring(4)),
    }))
    // após a edição de contato, e não valores no campo "emergencial", iria criar preencher com valores não esperados.
    // Essa logica(no caso o filter) corrige este problema(praticamento removendo o campo emergencial caso esteja vazio, com isso, a aplicação ira tratar a ausência desse valor retornando o valor esperado).
    .filter((phone) => phone.areaCode !== '');

  return newUserPhoneList;
}

const convertAddressList = (addressList: UserFormAddressList): AddressList => {
  const newUserAddressList = addressList.map((address) => ({
    type: address.type,
    street: address.street,
    complement: address.complement,
    country: address.country,
    state: address.state,
    city: address.city,
  })).filter((address) => address.street !== '');

  return newUserAddressList;
}

const convertDependentsList = (dependentsList: UserFormDependentList): DependentsList => {
  const newUserDependentsList: DependentsList = dependentsList.map((dependents) => ({
    name: dependents.name,
    age: Number(dependents.age),
    document: Number(dependents.document),
  }))

  return newUserDependentsList;
};

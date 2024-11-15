import { PhoneTypeEnum } from "../enums/phone-type.enum";
import { IPhoneToDisplay } from "../interfaces/phone-to-display.interface";
import { IPhone } from "../interfaces/user/phone.interface";
import { PhoneList } from "../types/phone-list.types";
import { phoneTypeDescriptionMap } from "./phone-type-description-map";

export const preparePhoneList = (
  originalUserPhoneList: PhoneList,
  isDisplayPhone: boolean, // se for "true" para o display ou seja para consulta e se for "false" é para o formulário ou seja para edição.
  callback: (phone: IPhoneToDisplay) => void) => {

  Object.keys(phoneTypeDescriptionMap).map(Number).forEach((phoneType: number) => {
    const phoneFound = originalUserPhoneList.find((userPhone: IPhone) => userPhone.type === phoneType);

    let phoneNumber = '';

    if (isDisplayPhone) {
      phoneNumber = phoneFound ? formatPhoneNumberToDisplay(phoneFound) : '-'
    } else {
      phoneNumber = phoneFound ? formatPhoneNumberToEdit(phoneFound) : '';
    }

    callback({
      type: phoneType,
      typeDescription: phoneTypeDescriptionMap[phoneType as PhoneTypeEnum],
      phoneNumber,
    });
  });
}

const formatPhoneNumberToEdit = (phone: IPhone): string => {
  return (phone.internationalCode + phone.areaCode + phone.number).replace(/[+\-]/g, ''); // irá substituir o "-" e o "+" por uma string vazia.
}

const formatPhoneNumberToDisplay = (phone: IPhone): string => {
  return phone.internationalCode + " " + phone.areaCode + " " + phone.number;
}

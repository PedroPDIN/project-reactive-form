import { UserFormAddressList } from "../../types/user-form-address-list.type";
import { UserFormPhoneList } from "../../types/user-form-phone-list.type";

export interface IUserFormContactInformations {
  phoneList: UserFormPhoneList;
  addressList: UserFormAddressList;
}

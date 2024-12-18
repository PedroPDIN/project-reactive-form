import { inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { IUser } from "../../interfaces/user/user.interface";
import { PhoneList } from "../../types/phone-list.types";
import { AddressList } from "../../types/address.list.type";
import { DependentsList } from "../../types/dependents-list.type";
import { convertPtBrDateToDateObj } from "../../utils/convert-pt-br-date-to-date-obj";
import { preparePhoneList } from "../../utils/prepare-phone-list";
import { PhoneTypeEnum } from "../../enums/phone-type.enum";
import { prepareAddressList } from "../../utils/prepare-address-list";
import { requiredAddressValidator } from "../../utils/user-form-validators/required-address-validator";
import { IDependent } from "../../interfaces/user/dependent.interface";
import { UserFormRawValueService } from "../../services/user-form-raw-value.service";

export class UserFormController {
  userForm!: FormGroup;

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private readonly _fb = inject(FormBuilder);
  private readonly _userFormRamValueService = inject(UserFormRawValueService);

  constructor() {
    this.createUserForm();

    this.watchUserFormValueChangesAndUpdateService();
  }

  get generalInformations(): FormGroup {
    return this.userForm.get('generalInformations') as FormGroup;
  }

  get contactInformations(): FormGroup {
    return this.userForm.get('contactInformations') as FormGroup;
  }

  get phoneList(): FormArray {
    return this.userForm.get('contactInformations.phoneList') as FormArray;
  }

  get addressList(): FormArray {
    return this.userForm.get('contactInformations.addressList') as FormArray;
  }

  get dependentsList(): FormArray {
    return this.userForm.get('dependentsList') as FormArray;
  }

  get generalInformationValid(): boolean {
    return this.generalInformations.valid;
  }

  get contactInformationsValid(): boolean {
    return this.contactInformations.valid as boolean;
  }

  get dependentsListValid(): boolean {
    return this.dependentsList.valid;
  }

  fulFillUserForm(user: IUser) {
    this.resetUserForm();

    this.fulFillGeneralInformations(user);
    this.fulFillPhoneList(user.phoneList);
    this.fulFillAddressList(user.addressList);
    this.fulFillDependentsList(user.dependentsList);

    // quando redenrizar as informações de edição, já definir ou elementos como tocados (markAllAsTouched()) e rodar todos os validadores (updateValueAndValidity()), devido a isso, forçando o erro.
    // basta ver esse exemplo na tab 'contatos' do usuário 'Laura'.
    this.userForm.markAllAsTouched();
    this.userForm.updateValueAndValidity();
  }

  addDependent() {
    // invocando o método createDependentGroup() sem passar o parâmetro ira criar um novo dependente com seus valores vazios.
    this.dependentsList.push(this.createDependentGroup());
    this.dependentsList.markAsDirty();
  }

  removeDependent(dependentIndex: number) {
    this.dependentsList.removeAt(dependentIndex);
    this.dependentsList.markAsDirty();
  }

  private resetUserForm() {
    this.userForm.reset();

    this.generalInformations.reset();

    this.phoneList.reset();
    this.phoneList.clear();

    this.addressList.reset();
    this.addressList.clear();

    this.dependentsList.reset();
    this.dependentsList.clear();
  }

  private fulFillGeneralInformations(user: IUser) {
    const newUser = {
      ...user,
      birthDate: convertPtBrDateToDateObj(user.birthDate),
    };

    this.generalInformations.patchValue(newUser);
  }

  private fulFillPhoneList(userPhoneList: PhoneList) {
    preparePhoneList(userPhoneList, false, (phone) => {
      const phoneValidators =
        phone.type === PhoneTypeEnum.EMERGENCY ? [] : [Validators.required];

      this.phoneList.push(
        this._fb.group({
          type: [phone.type],
          typeDescription: [phone.typeDescription],
          number: [phone.phoneNumber, phoneValidators],
        })
      );
    });
  }

  private fulFillAddressList(userAddressList: AddressList) {
    prepareAddressList(userAddressList, false, (address) => {
      this.addressList.push(
        this._fb.group(
          {
            type: [address.type], // não será utilizado no front/interface
            typeDescription: [
              { value: address.typeDescription, disabled: true },
            ],
            street: [address.street],
            complement: [address.complement],
            country: [address.country],
            state: [address.state],
            city: [address.city],
          },
          {
            validators: requiredAddressValidator,
          }
        )
      );
    });
  }

  // esse método terá duas responsabilidades de criar os dependentes com os seus valores vazios (no caso chamando esse método passando nada no parâmetro, com isso será null).
  // ou criando um dependente com os devidos dados, passando os mesmos dados por parâmetro.
  private createDependentGroup(dependent: IDependent | null = null) {
    // se for null (o método passará a ser null inicialmente quando for chamado sem passar nenhum valor)
    if (!dependent) {
      return this._fb.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        document: ['', Validators.required],
      });
    }

    return this._fb.group({
      name: [dependent.name, Validators.required],
      age: [dependent.age.toString(), Validators.required],
      document: [dependent.document.toString(), Validators.required],
    });
  }

  private fulFillDependentsList(userDependentsList: DependentsList) {
    userDependentsList.forEach((dependent) => {
      this.dependentsList.push(this.createDependentGroup(dependent));
    });
  }

  private createUserForm() {
    this.userForm = this._fb.group({
      generalInformations: this._fb.group({
        name: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        country: ['', Validators.required],
        state: ['', Validators.required],
        maritalStatus: [null, Validators.required],
        monthlyIncome: [null, Validators.required],
        birthDate: [null, Validators.required],
      }),
      contactInformations: this._fb.group({
        phoneList: this._fb.array([]),
        addressList: this._fb.array([]),
      }),
      dependentsList: this._fb.array([]),
    });
  }

  private watchUserFormValueChangesAndUpdateService() {
    this.userForm.valueChanges.subscribe(() => {
      this._userFormRamValueService.userFormRawValue = this.userForm.getRawValue();
    })
  }
};

import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PhoneTypeEnum } from '../../../../enums/phone-type.enum';

@Component({
  selector: 'app-phone-list-edit',
  templateUrl: './phone-list-edit.component.html',
  styleUrl: './phone-list-edit.component.scss',
})
export class PhoneListEditComponent {
  @Input({ required: true }) userForm!: FormGroup;

  get phoneList(): FormArray {
    return this.userForm.get('contactInformations.phoneList') as FormArray;
  }

  getPhoneMark(phoneType: number) {

    const phoneMarkMap: {[key in PhoneTypeEnum]: string} = {
      [PhoneTypeEnum.RESIDENTIAL]: '+00 00 0000-0000',
      [PhoneTypeEnum.MOBILE]: '+00 00 00000-0000',
      [PhoneTypeEnum.EMERGENCY]: '+00 00 0000-0000||+00 00 00000-0000',
    };

    return phoneMarkMap[phoneType as PhoneTypeEnum];
  }
}

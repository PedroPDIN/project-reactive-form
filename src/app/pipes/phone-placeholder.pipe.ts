import { Pipe, PipeTransform } from '@angular/core';
import { PhoneTypeEnum } from '../enums/phone-type.enum';

@Pipe({
  name: 'phonePlaceholder'
})
export class PhonePlaceholderPipe implements PipeTransform {
  transform(phoneType: number): string {
    const phoneMarkMap: { [key in PhoneTypeEnum]: string } = {
      [PhoneTypeEnum.RESIDENTIAL]: '+55 11 1234-1234',
      [PhoneTypeEnum.MOBILE]: '+55 11 91234-1234',
      [PhoneTypeEnum.EMERGENCY]: '+55 11 1234-1234 ou +55 11 91234-1234',
    };

    return phoneMarkMap[phoneType as PhoneTypeEnum];
  }
}

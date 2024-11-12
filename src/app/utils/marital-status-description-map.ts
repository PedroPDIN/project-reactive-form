import { MaritalStatusEnum } from "../enums/marital-status.enum";

export const maritalStatusDescriptionMap: { [key in MaritalStatusEnum]: string } = {
  [MaritalStatusEnum.SINGLE]: 'Solteiro',
  [MaritalStatusEnum.MARRIED]: 'Casado',
  [MaritalStatusEnum.DIVORCED]: 'Divorciado',
};

export const maritalStatusArray: { code: number; description: string }[] = Object
  .keys(maritalStatusDescriptionMap)
  .map(Number)
  .map((key) => {
    return {
      code: key,
      description: maritalStatusDescriptionMap[key as MaritalStatusEnum],
    };
  });

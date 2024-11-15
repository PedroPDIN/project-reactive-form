import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const requiredAddressValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const addressGroup = control as FormGroup;

  const controlsToCheck = Object.keys(addressGroup.controls).filter((controlKey) => {
    return controlKey !== 'type' && controlKey !== 'typeDescription';
  })

  const hasAnyText = controlsToCheck.some((controlKey) =>
    hasText(addressGroup.get(controlKey))
  );

  for (const controlName of controlsToCheck) {
    const control = addressGroup.get(controlName);

    // Se os outros controls estiver preenchido.
    if (hasAnyText) {
      // Mas o control especifico não estiver preenchido.
      if (!control?.value) {
        // irá portando alocar/adiciona um erro.
        control?.setErrors({ requiredAddressControl: true });
        // irá ter o comportamento de "forçar a interação" quando houver um interação no control atual, os outros controls (campos),
        // serão interagidos, com isso, resultando já mostrando o erro diretamente. Pois por padrão no Angular Material, o erro só irá
        // aparecer quando for clicando fora do campo.
        control?.markAsTouched()
      } else {
        // Agora se o control especifico estive preenchido, irá remover o erro.
        // passando o "null", irá remover o erro.
        control?.setErrors(null);
      }
    } else {
      // Caso nenhum campo esteja preenchido ou seja se nenhum deles possui um valor, serão removido os erros.
      // em resuma se nenhum campo estiver com texto, será por tanto válido.
      control?.setErrors(null);
    }
  }

  return null
}

const hasText = (control: AbstractControl | null): boolean => {
  return !!control && control.value && control.value.toString().trim().length > 0;
}

import { Injectable } from "@angular/core";
import { IUserForm } from "../interfaces/user-form/user-form.interface";

@Injectable({
  providedIn: 'root',
})
export class UserFormRawValueService {
  // será responsável por armazenar todo todo o valor do usuário alterado, incluindo as valores ocultos/desabilitados. Pois o motivo da criação dessa service.
  // é ser injetada e utilizado e qualquer classes para para atribuída e utilizada (tipo um Redux ou Context Api no React).
  userFormRawValue: IUserForm = {} as IUserForm;
}

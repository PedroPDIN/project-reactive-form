import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { PipesModule } from "../pipes/pipes.module";
import { UsersListComponent } from './users-list/users-list.component';
import { CommonModule } from "@angular/common";
import { GeneralInformationsComponent } from './general-informations/general-informations.component';

@NgModule({
  declarations: [UsersListComponent, GeneralInformationsComponent],
  imports: [AngularMaterialModule, PipesModule, CommonModule],
  exports: [UsersListComponent, GeneralInformationsComponent],
})
export class ComponentsModule {}

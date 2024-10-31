import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { PipesModule } from "../pipes/pipes.module";
import { UsersListComponent } from './users-list/users-list.component';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [UsersListComponent],
  imports: [AngularMaterialModule, PipesModule, CommonModule],
  exports: [UsersListComponent],
})
export class ComponentsModule {}

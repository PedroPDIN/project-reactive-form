import { NgModule } from "@angular/core";
import { MaritalStatusPipe } from './marital-status.pipe';

@NgModule({
  declarations: [MaritalStatusPipe],
  exports: [MaritalStatusPipe],
})
export class PipesModule {}

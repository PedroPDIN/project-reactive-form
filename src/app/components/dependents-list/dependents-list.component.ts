import { Component, Input } from '@angular/core';
import { DependentsList } from '../../types/dependents-list.type';

@Component({
  selector: 'app-dependents-list',
  templateUrl: './dependents-list.component.html',
  styleUrl: './dependents-list.component.scss'
})
export class DependentsListComponent {
  @Input({ required: true }) dependentList: DependentsList | undefined = [];
}

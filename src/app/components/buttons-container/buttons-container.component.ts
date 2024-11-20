import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-container',
  templateUrl: './buttons-container.component.html',
  styleUrl: './buttons-container.component.scss',
})
export class ButtonsContainerComponent {
  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) enableSaveButton: boolean = false;

  @Output('onSaveButton') onSaveButtonEmit = new EventEmitter<void>();
  @Output('onEditButton') onEditButtonEmit = new EventEmitter<void>();
  @Output('onCancelButton') onCancelButtonEmit = new EventEmitter<void>();

  onSaveButton() {
    this.onSaveButtonEmit.emit();
  }

  onCancelButton() {
    this.onCancelButtonEmit.emit();
  }

  onEditButton() {
    this.onEditButtonEmit.emit();
  }
}

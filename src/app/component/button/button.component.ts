import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() color: string = "primary";
  @Input() label: string = "button";
  @Output() onClick = new EventEmitter<any>();
  @Input() disabled?: boolean = false;
  @Input() type: string = "button";
  @Input() class: string = "btn btn-primary";

  onClickButton(event: any) {
    this.onClick.emit(event);
  }
}
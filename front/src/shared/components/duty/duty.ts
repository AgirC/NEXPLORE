import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'duty',
  templateUrl: './duty.html',
  styleUrls: ['./duty.less']
})
export class Duty {

  @Input() id: string;
  @Input() name: string;

  @Input() selected!: string;
  @Output() deleteDuty: EventEmitter<string> = new EventEmitter();
  @Output() editDuty: EventEmitter<string> = new EventEmitter();

  delete(): void {
    this.deleteDuty.emit(this.id);
  }

  edit(): void {
    this.editDuty.emit(this.id);
  }
}

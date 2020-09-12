import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseClass } from 'src/app/utilities/base';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.css']
})
export class ModalHeaderComponent  implements OnInit {
  @Input() title;
  @Output() closed = new EventEmitter();
  constructor() {}

  ngOnInit() {
  }

  close() {
    this.closed.emit();

  }
}

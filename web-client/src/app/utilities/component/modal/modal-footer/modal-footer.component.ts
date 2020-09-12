import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.css']
})
export class ModalFooterComponent implements OnInit {
  @Output() saved = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  save() {
    this.saved.emit();
  }
}

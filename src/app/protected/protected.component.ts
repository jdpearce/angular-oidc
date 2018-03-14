import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { PopupComponent } from './popup.component';

@Component({
    selector: 'app-protected',
    templateUrl: './protected.component.html',
    styleUrls: ['./protected.component.css']
})
export class ProtectedComponent {
    constructor(private modalService: NgbModal) {}

    openPopup() {
      const modalRef = this.modalService.open(PopupComponent);
      modalRef.componentInstance.name = 'World';
    }
}

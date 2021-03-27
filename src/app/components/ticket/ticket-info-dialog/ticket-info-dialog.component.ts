import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

export interface TicketInfo {
  description: string;
  type: string;
  status?: string;
}

@Component({
  selector: 'app-ticket-info-dialog',
  templateUrl: './ticket-info-dialog.component.html',
  styles: [],
})
export class TicketInfoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TicketInfo
  ) {}
}

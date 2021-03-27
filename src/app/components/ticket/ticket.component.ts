import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { TicketService } from 'src/app/services/ticket.service';
import { TicketInfoDialogComponent } from './ticket-info-dialog/ticket-info-dialog.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Input()
  public ticket: any;
  private timerLongTouch: any;
  private isLongTouch = false;
  constructor(
    private app: AppComponent,
    private ticketSvc: TicketService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
  }

  public contextMenuHandler(event: any): void {
    this.app.contextMenu.openContextMenu(event);
    // (this.ticket.status && this.ticket.status !== '') &&
    this.app.contextMenu.markTodo.setFn(this.updateTicket.bind(this, ''));
    // this.ticket.status !== 'info' &&
    this.app.contextMenu.markInProgress.setFn(this.updateTicket.bind(this, 'info'));
    // this.ticket.status !== 'warning' &&
    this.app.contextMenu.markAsPending.setFn(this.updateTicket.bind(this, 'warning'));
    // this.ticket.status !== 'success' &&
    this.app.contextMenu.markDone.setFn(this.updateTicket.bind(this, 'success'));
    // this.ticket.status !== 'danger' &&
    this.app.contextMenu.highlight.setFn(this.updateTicket.bind(this, 'danger'));
  }

  public addThisTicket(): void {
    const dialogRef = this.dialog.open(TicketInfoDialogComponent, {
      width: '350px',
      data: { description: '', type: 'story', status: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ticket = {
          ...this.ticket,
          ...result,
        }
        this.ticketSvc.addTicket(this.ticket).subscribe(resp => {
          this.ticket = resp.ticket;
        });
      }
    });
  }

  public touchStart(e: TouchEvent) {
    e.preventDefault();
    this.isLongTouch = false;
    this.timerLongTouch = setTimeout(() => {
      this.isLongTouch = true;
      this.contextMenuHandler(e);
  }, 500);
  }
  public touchMove() {
    clearTimeout(this.timerLongTouch);
  }
  public touchEnd() {
    clearTimeout(this.timerLongTouch);
    if (!this.isLongTouch) {
      window.location.href = `https://smartsave.atlassian.net/browse/${this.ticket.ticket}`;
    }
  }

  private updateTicket(status: string) {
    const { description, type } = this.ticket;
    const dialogRef = this.dialog.open(TicketInfoDialogComponent, {
      width: '350px',
      data: { description, type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ticket = {
          ...this.ticket,
          ...result,
          status
        }
        this.ticketSvc.updateTicket(this.ticket).subscribe();
      }
    });
  }
}

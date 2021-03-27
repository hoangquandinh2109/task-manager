import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Input()
  public ticket: any;
  constructor(private app: AppComponent) {}

  public ngOnInit(): void {
  }

  public contextMenuHandler(event: any): void {
    this.app.contextMenu.openContextMenu(event);
    this.app.contextMenu.markTodo = this.markTodo.bind(this);
    this.app.contextMenu.markInProgress = this.markInProgress.bind(this);
    this.app.contextMenu.markAsPending = this.markAsPending.bind(this);
    this.app.contextMenu.markDone = this.markDone.bind(this);
    this.app.contextMenu.highlight = this.highlight.bind(this);
  }

  private markTodo() {
    console.log('markTodo', this.ticket);
  }
  private markInProgress() {
    console.log('markInProgress', this.ticket);
  }
  private markAsPending() {
    console.log('markAsPending', this.ticket);
  }
  private markDone() {
    console.log('markDone', this.ticket);
  }
  private highlight() {
    console.log('highlight', this.ticket);
  }
}

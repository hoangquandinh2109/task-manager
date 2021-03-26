import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public ticketsList: any[] = [];
  public terminalClose = true;

  private destroy$: Subject<any> = new Subject();
  constructor(
    private ticketSvc: TicketService
  ) {}

  public ngOnInit(): void {
    this.getTicket();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTicket(): void {
    this.ticketSvc.getTickets()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        resp => {
          this.ticketsList = resp;
        }
      );
  }
}

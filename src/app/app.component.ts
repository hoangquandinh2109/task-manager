import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public ticketsList: any[] = [];
  public terminalClose = true;
  public openContextMenu = false;
  public contextMenuPosition = {x: 0, y: 0};
  @ViewChild('inputContentRef') inputContentRef: ElementRef<HTMLPreElement>;

  private ticketsList$: any[] = [];
  private destroy$: Subject<any> = new Subject();
  constructor(private ticketSvc: TicketService, elementRef: ElementRef) {
    this.inputContentRef = elementRef;
  }

  public ngOnInit(): void {
    this.getTicket();
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    document.addEventListener('click', (e: any) => {
      if (!e.path.filter((x: any) => x.className?.includes('context-menu')).length) {
        this.openContextMenu = false;
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public pasteHandler(e: any): void {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand('insertHTML', true, text);
  }

  public applyContent(): void {
    const text: any = this.inputContentRef.nativeElement.innerText;
    const regex = /SSWA-\d{1,}/g;
    const todoList = [...text.matchAll(regex)].map((m) => m[0]);
    this.filtTicket(todoList);
    this.inputContentRef.nativeElement.innerText = '';
    this.toggleTerminal(true);
  }

  public contextMenu(e: any): void{
    e.preventDefault();
    const isTooLow = innerHeight - e.clientY < 346;
    const isTooOnTheRight = innerWidth - e.clientX < 200;
    this.contextMenuPosition.x = isTooOnTheRight ? innerWidth - 220 : e.clientX;
    this.contextMenuPosition.y = isTooLow ? e.clientY - 346 > 0 ? e.clientY - 346 : 0 : e.clientY;
    this.openContextMenu = true;
  }

  public toggleTerminal(value?: boolean): void{
    this.terminalClose = value !== undefined ? value : !this.terminalClose;
    if (this.terminalClose) {
      this.inputContentRef.nativeElement.blur();
    } else {
      this.inputContentRef.nativeElement.focus();
    }
  }

  private getTicket(): void {
    this.ticketSvc
      .getTickets()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.ticketsList$ = resp;
        this.filtTicket();
      });
  }

  private filtTicket(list?: string[]): void {
    if (list && list.length) {
      this.ticketsList = list.map((m) => {
        const ticket = this.ticketsList$.find((x) => x.ticket === m);
        return ticket ? ticket : { ticket: m };
      });
    } else {
      this.ticketsList = this.ticketsList$;
    }
  }

  private keyDownHandler(e: KeyboardEvent): void {
    switch (e.key) {
      case 'Escape':
        this.openContextMenu = false;
        break;
      case 't':
        if (document.activeElement !== this.inputContentRef.nativeElement) {
          e.preventDefault();
          this.toggleTerminal();
        }
        break;
      case 'Enter':
        if (document.activeElement === this.inputContentRef.nativeElement && e.ctrlKey) {
          this.applyContent();
        }
        break;
    }
  }
}

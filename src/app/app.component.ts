import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ContextMenuComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  public ticketsList: any[] = [];
  public terminalClose = true;
  @ViewChild('inputContentRef')
  public inputContentRef: ElementRef<HTMLPreElement>;
  @ViewChild(ContextMenuComponent)
  public contextMenu: ContextMenuComponent;

  private ticketsList$: any[] = [];
  private destroy$: Subject<any> = new Subject();
  constructor(
    private ticketSvc: TicketService,
    elementRef: ElementRef,
    contextMenu: ContextMenuComponent
    ) {
    this.inputContentRef = elementRef;
    this.contextMenu = contextMenu;
  }

  public ngOnInit(): void {
    this.getTicket();
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
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
    todoList.length ? localStorage.setItem('todoList', JSON.stringify(todoList)) : localStorage.removeItem('todoList');
    this.filtTicket(todoList);
    this.inputContentRef.nativeElement.innerText = '';
    this.toggleTerminal(true);
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
        const todoList = localStorage.getItem('todoList');
        if (todoList){
          this.filtTicket(JSON.parse(todoList));
        } else {
          this.filtTicket();
        }
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
        this.contextMenu.contextMenuIsOpen = false;
        break;
      case 't':
        if (document.activeElement !== this.inputContentRef.nativeElement &&
          document.activeElement?.tagName !== 'INPUT') {
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

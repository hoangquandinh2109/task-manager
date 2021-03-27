import { Component, OnInit } from '@angular/core';

class ContextMenuButton {
  public isSet: boolean = false;

  constructor(private contextMenu: ContextMenuComponent) {
  }

  public setFn(fn: () => void) {
    this.fn$ = fn;
    this.isSet = true;
  }
  public fn() {
    this.fn$()
    this.contextMenu.contextMenuIsOpen = false;
  }

  private fn$ () {}
}

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  public contextMenuIsOpen: boolean = false;
  public contextMenuPosition = {x: 0, y: 0};
  public markTodo = new ContextMenuButton(this);
  public markInProgress = new ContextMenuButton(this);
  public markAsPending = new ContextMenuButton(this);
  public markDone = new ContextMenuButton(this);
  public highlight = new ContextMenuButton(this);

  constructor() { }

  public ngOnInit(): void {
    document.addEventListener('click', (e: any) => {
      if (!e.composedPath().filter((x: any) => x.className?.includes('context-menu')).length) {
        this.contextMenuIsOpen = false;
      }
    });
    document.addEventListener('touchstart', (e: any) => {
      if (!e.composedPath().filter((x: any) => x.className?.includes('context-menu')).length) {
        this.contextMenuIsOpen = false;
      }
    });
  }

  public openContextMenu(e: any): void{
    e.preventDefault();
    const { clientX, clientY } = e.touches ? e.touches[0] : e;
    const isTooLow = innerHeight - clientY < 346;
    const isTooOnTheRight = innerWidth - clientX < 220;
    this.contextMenuPosition.x = isTooOnTheRight ? innerWidth - 220 : clientX;
    this.contextMenuPosition.y = isTooLow ? clientY - 346 > 0 ? clientY - 346 : 0 : clientY;
    this.contextMenuIsOpen = true;
    this.markTodo = new ContextMenuButton(this);
    this.markInProgress = new ContextMenuButton(this);
    this.markAsPending = new ContextMenuButton(this);
    this.markDone = new ContextMenuButton(this);
    this.highlight = new ContextMenuButton(this);
  }

}

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  public contextMenuIsOpen: boolean = false;
  public contextMenuPosition = {x: 0, y: 0};
  public markTodo = function () {};
  public markInProgress = function () {};
  public markAsPending = function () {};
  public markDone = function () {};
  public highlight = function () {};

  constructor() { }

  public ngOnInit(): void {
    document.addEventListener('click', (e: any) => {
      if (!e.path.filter((x: any) => x.className?.includes('context-menu')).length) {
        this.contextMenuIsOpen = false;
      }
    });
  }

  public openContextMenu(e: any): void{
    e.preventDefault();
    const isTooLow = innerHeight - e.clientY < 346;
    const isTooOnTheRight = innerWidth - e.clientX < 200;
    this.contextMenuPosition.x = isTooOnTheRight ? innerWidth - 220 : e.clientX;
    this.contextMenuPosition.y = isTooLow ? e.clientY - 346 > 0 ? e.clientY - 346 : 0 : e.clientY;
    this.contextMenuIsOpen = true;
  }

}

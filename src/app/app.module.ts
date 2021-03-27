import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './shared/theme/theme.module';
import { HttpClientModule } from '@angular/common/http';
import { TicketComponent } from './components/ticket/ticket.component';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';

const COMPONENTS = [
  AppComponent,
  TicketComponent,
  ContextMenuComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ThemeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

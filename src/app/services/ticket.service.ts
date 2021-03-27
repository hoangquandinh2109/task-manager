import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }
  private api = {
    mainURL: 'https://crud-jx.glitch.me/api/',
    ticketURL() {
        return `${this.mainURL}ticket`
    },
    imporTicketURL() {
        return `${this.mainURL}importTicket`
    },
  }

  public getTickets(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api.ticketURL());
  }
  public addTicket(ticket: any): Observable<any> {
    return this.httpClient.post<any>(this.api.ticketURL(), ticket);
  }
  public updateTicket(ticket: any): Observable<any> {
    return this.httpClient.put<any>(this.api.ticketURL(), { ticket });
  }

}

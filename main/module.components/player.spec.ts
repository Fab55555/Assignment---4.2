import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000'; // URL to your backend API

  constructor(private http: HttpClient) { }

  makeHttpRequest<T>(method: string, endpoint: string, data?: any): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;

    switch (method) {
      case 'GET':
        return this.http.get<T>(url);
      case 'POST':
        return this.http.post<T>(url, data);
      case 'PUT':
        return this.http.put<T>(url, data);
      case 'DELETE':
        return this.http.delete<T>(url);
    }
  }

  getPlayers(): Observable<Player[]> {
    return this.makeHttpRequest<Player[]>('GET', 'players');
  }

  getPlayer(id: number): Observable<Player> {
    return this.makeHttpRequest<Player>('GET', `players/${id}`);
  }

  addPlayer(player: Player): Observable<Player> {
    return this.makeHttpRequest<Player>('POST', 'players', player);
  }

  updatePlayer(player: Player): Observable<any> {
    return this.makeHttpRequest('PUT', `players/${player.id}`, player);
  }

  deletePlayer(player: Player | number): Observable<Player> {
    const id = typeof player === 'number' ? player : player.id;
    return this.makeHttpRequest<Player>('DELETE', `players/${id}`);
  }
}

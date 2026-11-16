import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:3000/api/v1';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private get headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.token()}` });
  }

  getBoards() {
    return this.http.get(`${API_URL}/boards`, { headers: this.headers });
  }

  getBoard(id: number) {
    return this.http.get(`${API_URL}/boards/${id}`, { headers: this.headers });
  }

  createBoard(data: any) {
    return this.http.post(`${API_URL}/boards`, data, { headers: this.headers });
  }

  createCard(listId: number, data: any) {
    return this.http.post(`${API_URL}/lists/${listId}/cards`, data, { headers: this.headers });
  }

  updateCard(id: number, data: any) {
    return this.http.patch(`${API_URL}/cards/${id}`, data, { headers: this.headers });
  }

  moveCard(id: number, listId: number, position?: number) {
    return this.http.patch(`${API_URL}/cards/${id}/move`, { list_id: listId, position }, { headers: this.headers });
  }
}

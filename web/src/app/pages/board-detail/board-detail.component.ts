import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen" style="background-color: var(--bg)">
      <header class="border-b px-6 py-4 flex items-center justify-between" style="border-color: var(--border); background-color: var(--card)">
        <div class="flex items-center gap-4">
          <a routerLink="/boards" class="text-sm" style="color: var(--muted)">← Voltar</a>
          <h1 class="text-xl font-bold" style="color: var(--text)">{{ board()?.title }}</h1>
        </div>
      </header>

      <main class="p-6 overflow-x-auto">
        <div class="flex gap-5 min-w-max">
          <div *ngFor="let list of board()?.lists" class="w-72 flex-shrink-0 rounded-2xl p-4" style="background-color: var(--card); border: 1px solid var(--border)">
            <h3 class="font-semibold mb-4" style="color: var(--text)">{{ list.title }}</h3>

            <div class="space-y-3 mb-4">
              <div *ngFor="let card of list.cards"
                   class="p-3 rounded-xl cursor-pointer hover:opacity-90"
                   style="background-color: var(--bg); border: 1px solid var(--border)">
                <p class="font-medium text-sm" style="color: var(--text)">{{ card.title }}</p>

                <div class="flex items-center gap-2 mt-2">
                  <span *ngIf="card.priority === 'urgent'" class="text-xs px-2 py-0.5 rounded-full text-white" style="background-color: #ef4444">Urgente</span>
                  <span *ngIf="card.priority === 'high'" class="text-xs px-2 py-0.5 rounded-full text-white" style="background-color: #f97316">Alta</span>
                  <span *ngIf="card.due_date" class="text-xs" style="color: var(--muted)">📅 {{ card.due_date | date:'dd/MM' }}</span>
                </div>

                <div *ngIf="card.checklist_items?.length" class="mt-2 text-xs" style="color: var(--muted)">
                  ✓ {{ completedCount(card) }}/{{ card.checklist_items.length }}
                </div>
              </div>
            </div>

            <button (click)="addCard(list)" class="w-full py-2 rounded-xl text-sm font-medium" style="color: var(--muted); border: 1px dashed var(--border)">
              + Adicionar card
            </button>
          </div>
        </div>
      </main>
    </div>
  `
})
export class BoardDetailComponent implements OnInit {
  board = signal<any>(null);

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getBoard(id).subscribe((data: any) => this.board.set(data));
  }

  completedCount(card: any) {
    return card.checklist_items?.filter((i: any) => i.completed).length || 0;
  }

  addCard(list: any) {
    const title = prompt('Título do card:');
    if (!title) return;

    this.api.createCard(list.id, { title }).subscribe(() => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.api.getBoard(id).subscribe((data: any) => this.board.set(data));
    });
  }
}

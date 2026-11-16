import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService, Theme } from '../../core/services/theme.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen" style="background-color: var(--bg)">
      <header class="border-b px-6 py-4 flex items-center justify-between" style="border-color: var(--border); background-color: var(--card)">
        <div class="flex items-center gap-3">
          <h1 class="text-xl font-bold" style="color: var(--primary)">TaskForge</h1>
          <span *ngIf="auth.currentUser()?.subscription_type === 'mutant'"
                class="text-xs px-2 py-1 rounded-full font-medium text-white" style="background-color: #e31c25">
            MUTANT
          </span>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex gap-1 p-1 rounded-lg" style="background-color: var(--bg)">
            <button (click)="setTheme('light')" class="px-3 py-1.5 rounded-md text-sm" style="color: var(--text)">Light</button>
            <button (click)="setTheme('dark')" class="px-3 py-1.5 rounded-md text-sm" style="color: var(--text)">Dark</button>
            <button (click)="setTheme('mutant')" [disabled]="auth.currentUser()?.subscription_type !== 'mutant'"
              class="px-3 py-1.5 rounded-md text-sm disabled:opacity-40" style="color: var(--text)">Mutant</button>
          </div>
          <button (click)="logout()" class="text-sm" style="color: var(--muted)">Sair</button>
        </div>
      </header>

      <main class="p-6 max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold" style="color: var(--text)">Meus Boards</h2>
          <button (click)="createBoard()" class="px-4 py-2 rounded-xl font-semibold text-white" style="background-color: var(--primary)">
            + Novo Board
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <a *ngFor="let board of boards()" [routerLink]="['/boards', board.id]"
             class="p-6 rounded-2xl transition hover:scale-[1.02]" style="background-color: var(--card); border: 1px solid var(--border)">
            <div class="w-full h-2 rounded-full mb-4" [style.backgroundColor]="board.color || 'var(--primary)'"></div>
            <h3 class="font-semibold text-lg" style="color: var(--text)">{{ board.title }}</h3>
          </a>

          <div *ngIf="boards().length === 0" class="col-span-full text-center py-16" style="color: var(--muted)">
            Nenhum board ainda. Crie o primeiro!
          </div>
        </div>
      </main>
    </div>
  `
})
export class BoardsComponent implements OnInit {
  boards = signal<any[]>([]);

  constructor(
    public auth: AuthService,
    public theme: ThemeService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadBoards();
  }

  loadBoards() {
    this.api.getBoards().subscribe((data: any) => this.boards.set(data));
  }

  createBoard() {
    const title = prompt('Nome do board:');
    if (!title) return;

    this.api.createBoard({ title }).subscribe(() => this.loadBoards());
  }

  setTheme(theme: Theme) {
    if (theme === 'mutant' && this.auth.currentUser()?.subscription_type !== 'mutant') return;
    this.theme.setTheme(theme);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

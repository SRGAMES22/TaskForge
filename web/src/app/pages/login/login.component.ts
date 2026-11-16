import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4" style="background-color: var(--bg)">
      <div class="w-full max-w-md p-8 rounded-2xl shadow-xl" style="background-color: var(--card); border: 1px solid var(--border)">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold" style="color: var(--primary)">TaskForge</h1>
          <p class="mt-2" style="color: var(--muted)">Organize seus projetos com poder</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-5">
          <div>
            <label class="block text-sm font-medium mb-1" style="color: var(--muted)">Email</label>
            <input type="email" [(ngModel)]="email" name="email" required
              class="w-full px-4 py-3 rounded-xl border focus:outline-none"
              style="background-color: var(--bg); border-color: var(--border); color: var(--text)"
              placeholder="demo@taskforge.app" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1" style="color: var(--muted)">Senha</label>
            <input type="password" [(ngModel)]="password" name="password" required
              class="w-full px-4 py-3 rounded-xl border focus:outline-none"
              style="background-color: var(--bg); border-color: var(--border); color: var(--text)"
              placeholder="123456" />
          </div>

          <button type="submit" [disabled]="loading"
            class="w-full py-3 rounded-xl font-semibold text-white transition disabled:opacity-50"
            style="background-color: var(--primary)">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>

          <p *ngIf="error" class="text-sm text-center text-red-500">{{ error }}</p>
        </form>

        <p class="mt-6 text-center text-sm" style="color: var(--muted)">
          Use: <strong>demo@taskforge.app</strong> / <strong>123456</strong>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = 'demo@taskforge.app';
  password = '123456';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/boards']),
      error: (err) => {
        this.error = err.error?.error || 'Erro ao fazer login';
        this.loading = false;
      }
    });
  }
}

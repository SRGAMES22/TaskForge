import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'mutant';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  currentTheme = signal<Theme>(this.getStoredTheme());

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      this.applyTheme(theme);
      localStorage.setItem('taskforge-theme', theme);
    });
  }

  private getStoredTheme(): Theme {
    return (localStorage.getItem('taskforge-theme') as Theme) || 'light';
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }

  private applyTheme(theme: Theme) {
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-mutant');
    document.documentElement.classList.add(`theme-${theme}`);
  }
}
